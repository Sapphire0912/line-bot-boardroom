import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/dbconnect";
import Boardroom from "@/model/Boardroom";
import LineUser from "@/model/LineUser";
import User from "@/model/User";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url, process.env.PUBLIC_URL);
    const searchType = searchParams.get("searchType");
    const content = searchParams.get("content");

    if (!searchType || !content)
      return NextResponse.json({ message: "缺少必要參數", status: 400 });

    const escapeRegex = (str: string) =>
      str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // 處理轉義字元
    const safeContent = escapeRegex(content);

    await connectMongoDB();

    if (searchType === "member") {
      // 搜尋成員 (content 開頭沒有 @)
      const isLocalUser = await User.findOne({ username: safeContent });
      const isLineUser = await LineUser.find({ displayName: safeContent });

      if (isLocalUser) {
        // 判斷是否有綁定 line 帳號
        if (isLocalUser.lineid) {
          const bindUser = await LineUser.findOne({
            lineid: isLocalUser.lineid,
          });
          return NextResponse.json({
            message: "查詢成功",
            targetData: [
              {
                username: isLocalUser.username,
                displayName: bindUser?.displayName,
              },
            ],
            status: 200,
          });
        } else {
          return NextResponse.json({
            message: "查詢成功",
            targetData: [{ username: isLocalUser.username, displayName: null }],
            status: 200,
          });
        }
      } else if (isLineUser.length > 0) {
        let targetData: Array<object> = [];
        for (const user of isLineUser) {
          targetData.push({
            username: user.localusername || null,
            displayName: user.displayName,
          });
        }
        return NextResponse.json({
          message: "查詢成功",
          targetData,
          status: 200,
        });
      } else {
        return NextResponse.json({
          message: "查無此使用者",
          targetData: [],
          status: 404,
        });
      }
    } else if (searchType === "message") {
      // 尋找留言區的使用者或內容, 使用者有 @
      const isFindMsg: boolean = safeContent[0] === "@";
      if (isFindMsg) {
        // 1. 查找使用者
        const name = safeContent.split("@")[1];
        const matchUser = await Boardroom.find({
          $or: [{ username: name }, { displayName: name }],
        });

        return NextResponse.json({
          message:
            matchUser.length !== 0 ? "查詢成功" : "查無此使用者的留言紀錄",
          targetData: matchUser,
          status: matchUser.length !== 0 ? 200 : 404,
        });
      } else {
        // 2. 查找留言內容
        const matchContent = await Boardroom.find({
          message: { $regex: safeContent, $options: "i" },
        });

        return NextResponse.json({
          message:
            matchContent.length !== 0 ? "查詢成功" : "查無此留言搜尋結果",
          targetData: matchContent,
          status: matchContent.length !== 0 ? 200 : 404,
        });
      }
    }
  } catch (error) {
    console.error("搜尋操作失敗, 錯誤訊息", error);
    return NextResponse.json({
      message: "搜尋操作失敗",
      status: 500,
    });
  }
}

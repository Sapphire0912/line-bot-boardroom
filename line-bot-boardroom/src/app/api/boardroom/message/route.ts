import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/dbconnect";
import Boardroom from "@/model/Boardroom";

// 處理張貼日期的函數
const convtoTWDate = (date: Date) => {
  // 將日期轉換成 TW 時區，回傳 string
  return new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(date);
};

export async function GET(req: Request) {
  try {
    await connectMongoDB();
    const data = await Boardroom.find().sort({ postDate: 1 }); // 資料按日期遞增排列

    return NextResponse.json({
      message: "抓取留言板資料成功",
      data,
      status: 200,
    });
  } catch (error) {
    console.log("抓取留言板資料失敗, ", error);
    return NextResponse.json({
      message: "抓取留言板資料失敗",
      data: [],
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { username, displayName, lineid, userMsg } = await req.json();

    await connectMongoDB();

    await Boardroom.create({
      username,
      displayName,
      message: userMsg,
      lineid,
      postDate: convtoTWDate(new Date()),
    });

    return NextResponse.json({ message: "留言已成功送出", status: 201 });
  } catch (error) {
    console.log("留言儲存失敗, ", error);
    return NextResponse.json({ message: "留言儲存失敗", status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { username, displayName, lineid, userMsg, updateMsg } =
      await req.json();

    await connectMongoDB();

    // 找到使用者資料並更新留言
    const updateUser = await Boardroom.findOneAndUpdate(
      { username, displayName, lineid, message: userMsg },
      { $set: { message: updateMsg, updateDate: convtoTWDate(new Date()) } },
      { new: true, runValidators: true } // 返回更新後的文檔，啟用驗證
    );

    if (!updateUser)
      return NextResponse.json({
        message: "更新留言板資料失敗, 查無此使用者的留言",
        status: 404,
      });

    return NextResponse.json({
      message: "更新留言板資料成功",
      data: updateUser,
      status: 200,
    });
  } catch (error) {
    console.log("更新留言板資料失敗, ", error);
    return NextResponse.json({
      message: "更新留言板資料失敗",
      status: 500,
    });
  }
}

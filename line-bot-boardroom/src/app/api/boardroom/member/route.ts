import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/dbconnect";
import Boardroom from "@/model/Boardroom";
import LineUser from "@/model/LineUser";
import User from "@/model/User";

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const localUsers = await User.find();
    const lineUsers = await LineUser.find();

    // 分類使用者
    const onlyLocal = localUsers
      .filter((user) => !user.lineid)
      .map((user) => ({
        username: user.username,
        displayName: null,
        lineid: null,
      }));

    const onlyLine = lineUsers
      .filter((lineUser) => !lineUser.localusername)
      .map((lineUser) => ({
        username: null,
        displayName: lineUser.displayName,
        lineid: lineUser.lineid,
      }));

    const bindUsers = lineUsers
      .filter((lineUser) =>
        localUsers.some((user) => lineUser.lineid === user.lineid)
      )
      .map((lineUser) => ({
        username: lineUser.localusername,
        displayName: lineUser.displayName,
        lineid: lineUser.lineid,
      }));

    const totalMembers = [...onlyLocal, ...onlyLine, ...bindUsers];
    return NextResponse.json({
      message: "抓取成員資料成功",
      memberData: totalMembers,
      status: 200,
    });
  } catch (error) {
    console.error("抓取成員資料失敗, ", error);
    return NextResponse.json({
      message: "抓取成員資料失敗",
      memberData: [],
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userInfo } = await req.json();
    const { username, displayName, lineid } = userInfo;

    // 刪除成員同時，也要刪除此使用者曾經發過的留言
    if (username) await User.deleteOne({ username, lineid });
    if (displayName) await LineUser.deleteOne({ displayName, lineid });
    await Boardroom.deleteMany({ username, displayName, lineid });

    return NextResponse.json({
      message: "刪除成員資料成功",
      status: 200,
    });
  } catch (error) {
    console.error("刪除成員資料失敗, ", error);
    return NextResponse.json({
      message: "刪除成員資料失敗",
      status: 500,
    });
  }
}

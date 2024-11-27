import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/dbconnect";
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
      .map((user) => ({ username: user.username, displayName: null }));

    const onlyLine = lineUsers
      .filter((lineUser) => !lineUser.localusername)
      .map((lineUser) => ({
        username: null,
        displayName: lineUser.displayName,
      }));

    const bindUsers = lineUsers
      .filter((lineUser) =>
        localUsers.some((user) => lineUser.lineid === user.lineid)
      )
      .map((lineUser) => ({
        username: lineUser.localusername,
        displayName: lineUser.displayName,
      }));

    const totalMembers = [...onlyLocal, ...onlyLine, ...bindUsers];
    return NextResponse.json({
      message: "抓取成員資料成功",
      memberData: totalMembers,
      status: 200,
    });
  } catch (error) {
    console.error("抓取成員資料失敗, ", error);
    return NextResponse.json({ message: "抓取成員資料失敗", status: 500 });
  }
}

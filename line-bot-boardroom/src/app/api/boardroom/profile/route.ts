import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/dbconnect";
import Boardroom from "@/model/Boardroom";

export async function POST(req: Request) {
  try {
    const { username, displayName, lineid } = await req.json();

    await connectMongoDB();

    const recordData = await Boardroom.find({ username, displayName, lineid });
    return NextResponse.json({
      message: "抓取使用者留言紀錄成功",
      recordData,
      status: 200,
    });
  } catch (error) {
    console.log("抓取使用者留言紀錄失敗, ", error);
    return NextResponse.json({
      message: "取得使用者留言紀錄失敗",
      status: 500,
    });
  }
}

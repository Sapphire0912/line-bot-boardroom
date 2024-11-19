import { NextResponse } from "next/server";
import User from "@/model/User";
import { connectMongoDB } from "@/lib/dbconnect";

/* 處理使用者註冊功能 */

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const { username, account, password } = await req.json();

    if (!username || !account || !password) {
      return NextResponse.json({ error: "必填區域不可為空" }, { status: 400 });
    }

    // 檢查使用者是否存在
    const isExistUser = await User.findOne({ username });
    if (isExistUser) {
      return NextResponse.json(
        { error: "該使用者名稱已被使用" },
        { status: 400 }
      );
    }

    await User.create({ username, account, password });
    return NextResponse.json({ message: "使用者註冊成功" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "伺服器出現錯誤" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import User from "@/model/User";
import { connectMongoDB } from "@/lib/dbconnect";

/* 處理使用者修改密碼功能 */

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const { username, account, newPassword } = await req.json();
    if (!username || !account || !newPassword)
      return NextResponse.json({ error: "必填區域不可為空", status: 400 });

    // 檢查使用者是否存在
    const isExistUser = await User.findOne({ username });
    if (!isExistUser)
      return NextResponse.json({ error: "該使用者不存在", status: 400 });

    // 更新密碼
    isExistUser.password = newPassword;
    await isExistUser.save();

    return NextResponse.json({ message: "新密碼更新成功", status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "伺服器出現錯誤", status: 500 });
  }
}

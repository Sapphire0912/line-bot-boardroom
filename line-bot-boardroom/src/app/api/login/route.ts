import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/dbconnect";
import User from "@/model/User";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { account, password } = await req.json();

    await connectMongoDB();

    // 檢查使用者是否存在
    const isExistUser = await User.findOne({ account }).exec();
    if (!isExistUser || !(await isExistUser.comparePassword(password)))
      return NextResponse.json({ message: "帳號或密碼錯誤", status: 401 });

    const jwt_token = generateToken({
      id: isExistUser._id,
      account: isExistUser.account,
    });

    return NextResponse.json({
      message: "驗證成功",
      token: jwt_token,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "登入失敗，伺服器錯誤", status: 500 });
  }
}

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

    // 回傳 JWT token
    const jwt_token = generateToken({
      id: isExistUser._id,
      account: isExistUser.account,
    });

    const response = NextResponse.json({
      message: "驗證成功",
      token: jwt_token,
      status: 200,
    });
    response.cookies.set("token", jwt_token, {
      httpOnly: true,
      secure: false, // 允許 localhost 測試，公開要設置成 true
      sameSite: "lax", // 開發環境要設置成 lax, 而非 none
      path: "/",
      maxAge: 60 * 60 * 24, // 有效期 1 天
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: "登入失敗，伺服器錯誤", status: 500 });
  }
}

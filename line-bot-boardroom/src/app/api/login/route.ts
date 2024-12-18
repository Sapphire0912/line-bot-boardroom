import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/dbconnect";
import { generateToken } from "@/lib/jwt";
import User from "@/model/User";
import LineUser from "@/model/LineUser";

export async function POST(req: Request) {
  try {
    const { account, password } = await req.json();

    await connectMongoDB();

    // 檢查使用者是否存在
    const isExistUser = await User.findOne({ account }).exec();
    if (!isExistUser || !(await isExistUser.comparePassword(password)))
      return NextResponse.json({ message: "帳號或密碼錯誤", status: 401 });

    // 判斷使用者是否綁定
    const isBind = isExistUser.lineid !== null;
    let displayName = null;
    let lineid = null;

    if (isBind) {
      const isLineUser = await LineUser.findOne({
        localaccount: account,
      }).exec();
      if (isLineUser) {
        displayName = isLineUser.displayName;
        lineid = isLineUser.lineid;
      }
    }

    // 回傳 JWT token
    const jwt_token = generateToken({
      id: isExistUser._id,
      username: isExistUser.username,
      displayName,
      lineid,
      account: isExistUser.account,
      role: isExistUser.role,
      loginMethod: "local",
      isBind: isExistUser.lineid ? true : false, // 判斷是否連結 line 帳號
      createAt: isExistUser.createAt,
    });

    const response = NextResponse.json({
      message: "登入成功",
      token: jwt_token,
      username: isExistUser.username,
      displayName,
      account: isExistUser.account,
      role: isExistUser.role,
      loginMethod: "local",
      isBind: isExistUser.lineid ? true : false, // 判斷是否連結 line 帳號
      createAt: isExistUser.createAt,
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

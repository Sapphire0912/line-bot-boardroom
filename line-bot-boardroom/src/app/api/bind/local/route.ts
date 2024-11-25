import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/dbconnect";
import User from "@/model/User";
import LineUser from "@/model/LineUser";
import { generateToken } from "@/lib/jwt";

/* Line 登入並綁定 localhost 的帳號 */
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    // 查詢本地帳號是否有該使用者 (此處的 username 是 line 的 displayName)
    const { username, account, password } = await req.json();
    const isLocalUser = await User.findOne({ account }).exec();

    if (!isLocalUser || !(await isLocalUser.comparePassword(password)))
      return NextResponse.json({ message: "帳號或密碼錯誤", status: 401 });

    // 確認沒有綁定過其他 Line 帳號
    if (isLocalUser.lineid !== null)
      return NextResponse.json({
        message: "此帳號已綁定其他 Line 用戶",
        status: 401,
      });

    // 查詢 Line 帳號是否有該使用者 (基本情況不可能發生)
    const isLineUser = await LineUser.findOne({ displayName: username });
    if (!isLineUser)
      return NextResponse.json({ message: "查無 Line 使用者", status: 401 });

    // 確認 Line 使用者沒有綁定過其他帳號
    if (isLineUser.localusername !== null || isLineUser.localaccount !== null)
      return NextResponse.json({
        message: "此 Line 用戶已綁定其他本地帳號",
        status: 401,
      });

    // 連結帳號
    isLocalUser.lineid = isLineUser.lineid;
    isLineUser.localusername = isLocalUser.username;
    isLineUser.localaccount = isLocalUser.account;

    await isLocalUser.save();
    await isLineUser.save();

    // 重新生成 JWT
    // 按照 line 登入來生成 JWT (需刪除原本的 cookies)
    const response = NextResponse.json({ message: "綁定成功", status: 200 });
    response.cookies.delete("token");

    const token = generateToken({
      lineid: isLineUser.lineid,
      displayName: isLineUser.displayName,
      pictureUrl: isLineUser.pictureUrl,
      role: isLineUser.role,
      loginMethod: "Line",
      isBind: isLineUser.localusername ? true : false, // 判斷是否連結本地帳號
      createAt: isLineUser.createAt,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false, // 允許 localhost 測試，公開要設置成 true
      sameSite: "lax", // 開發環境要設置成 lax, 而非 none
      path: "/",
      maxAge: 60 * 60 * 24, // 有效期 1 天
    });

    return response;
  } catch (error) {
    console.error("綁定 localhost 帳號失敗 ", error);
    return NextResponse.json({
      message: "綁定本地帳號失敗",
      status: 500,
    });
  }
}

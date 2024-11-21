import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "登出成功" });

  // cookies 設定為過期
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: false, // 部署要設定成 true
    sameSite: "lax",
    expires: new Date(0), // 清除 cookie
    path: "/",
  });

  return response;
}

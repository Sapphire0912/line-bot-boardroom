import { NextResponse, NextRequest } from "next/server";

/* 處理 使用者是否有 token 前往 boardroom 的網頁 */
const baseURL = process.env.PUBLIC_URL || "http://localhost:6543"; // 未來要更改成部署的 URL

export async function middleware(req: NextRequest) {
  const token =
    req.cookies.get("token")?.value || req.headers.get("authorization");
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  const verifyResponse = await fetch(`${baseURL}/api/login/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  if (!verifyResponse.ok)
    return NextResponse.redirect(new URL("/login", req.url));

  const info = await verifyResponse.json();
  const rolePath = req.nextUrl.pathname.split("/")[2];

  if (info.role === rolePath) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/error", req.url));
  }
}

export const config = {
  matcher: ["/boardroom/:path*"],
};

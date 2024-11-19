import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1]; // Bearer token

  try {
    const user = verifyToken(token);
    req.headers.set("user", JSON.stringify(user)); // 可選：將用戶信息附加到請求
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

// 保護特定路徑，例如 /api/protected
export const config = {
  matcher: ["/api/protected/:path*"],
};

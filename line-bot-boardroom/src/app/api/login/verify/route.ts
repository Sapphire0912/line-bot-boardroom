import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";

/* 驗證 JWT 的程式, 透過 middleware fetch 此 api */
export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) throw new Error("Token 未提供");

    const payload = verifyToken(token) as JwtPayload;
    return NextResponse.json({
      message: "驗證成功",
      status: 200,
      username: payload.username,
      role: payload.role,
    });
  } catch (error) {
    return NextResponse.json({ message: "JWT 驗證失敗", status: 401 });
  }
}

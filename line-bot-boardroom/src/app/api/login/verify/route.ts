import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) throw new Error("Token 未提供");

    const decoded = verifyToken(token);
    return NextResponse.json({ message: "驗證成功", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "JWT 驗證失敗", status: 401 });
  }
}

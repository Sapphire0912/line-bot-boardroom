import { NextResponse } from "next/server";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const body = await req.json();

  const { account, password } = body;

  // 模擬用戶認證（實際應該從資料庫檢查）
  if (account === "testuser" && password === "testpassword") {
    const token = generateToken({ account });
    return NextResponse.json({ token });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

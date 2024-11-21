import { NextResponse } from "next/server";
import { generateState } from "@/lib/state_gen";

const LINE_AUTH_URL = "https://access.line.me/oauth2/v2.1/authorize";

export async function GET() {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.LINE_LOGIN_CHANNEL_ID!,
    redirect_uri: process.env.LINE_LOGIN_REDIRECT_URI!,
    state: generateState(), // 防止 CSRF 攻擊
    scope: "openid profile email",
  });

  return NextResponse.redirect(`${LINE_AUTH_URL}?${params}`);
}

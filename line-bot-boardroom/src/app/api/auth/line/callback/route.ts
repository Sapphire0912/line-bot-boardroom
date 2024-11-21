import axios from "axios";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/dbconnect";
import LineUser from "@/model/LineUser";

const LINE_TOKEN_URL = "https://api.line.me/oauth2/v2.1/token";
const LINE_PROFILE_URL = "https://api.line.me/v2/profile";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state)
    return NextResponse.json({
      message: "缺少 code 或 state，無法完成 LINE 登入",
      status: 400,
    });

  try {
    const tokenResponse = await axios.post(
      LINE_TOKEN_URL,
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code as string,
        redirect_uri: process.env.LINE_LOGIN_REDIRECT_URI!,
        client_id: process.env.LINE_LOGIN_CHANNEL_ID!,
        client_secret: process.env.LINE_LOGIN_CHANNEL_SECRET!,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // 使用 Access Token 取得用戶資料
    const profileResponse = await axios.get(LINE_PROFILE_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { userId, displayName, pictureUrl } = profileResponse.data;

    // 將資料儲存至 DB 資料庫
    await connectMongoDB();

    const isExistUser = await LineUser.findOne({ lineid: userId });
    const message: string = isExistUser ? "使用者已存在" : "登入成功";

    if (!isExistUser) {
      // 儲存新使用者
      await LineUser.create({
        lineid: userId,
        displayName,
        pictureUrl,
      });
    }

    // 回傳資料
    return NextResponse.json({
      message,
      lineid: userId,
      displayName,
      pictureUrl,
    });
  } catch (error: any) {
    console.error("LINE 登入失敗:", error.response?.data || error.message);
    return NextResponse.json({ message: "LINE 登入失敗", status: 500 });
  }
}

import { Client, WebhookEvent, MessageAPIResponseBase } from "@line/bot-sdk";
import { NextRequest, NextResponse } from "next/server";

// 環境變數檢查
if (!process.env.CHANNEL_ACCESS_TOKEN || !process.env.CHANNEL_SECRET) {
  throw new Error(
    "Missing LINE channel access token or secret in environment variables"
  );
}

// 初始化 LINE Bot 配置
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// 初始化 LINE 客戶端
const client = new Client(config);

export async function POST(req: NextRequest) {
  console.log("post endpoint reached.");
  try {
    const body: { events: WebhookEvent[] } = await req.json();
    console.log("Webhook Event Received:", JSON.stringify(body, null, 2));

    // 處理所有 LINE 事件
    await Promise.all(body.events.map((event) => handleEvent(event)));

    return NextResponse.json({ message: "Webhook handled successfully" });
  } catch (error) {
    console.error("Error in webhook handler:", {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}

// 處理 LINE Webhook 的事件
const handleEvent = async (
  event: WebhookEvent
): Promise<MessageAPIResponseBase | undefined> => {
  console.log("event handle");

  try {
    if (event.type === "message" && event.message.type === "text") {
      const sanitizeText = (text: string) => text.replace(/[<>]/g, "");
      const replyText = `你說了: ${sanitizeText(event.message.text)}`;
      const replyToken = event.replyToken;
      console.log("Reply Token:", replyToken);

      return client.replyMessage(replyToken, {
        type: "text",
        text: replyText,
      });
    } else {
      console.log("Unsupported event type:", event.type);
    }
  } catch (error) {
    console.error("Error in handleEvent:", error);
  }
};

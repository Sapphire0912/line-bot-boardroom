import mongoose from "mongoose";

/* 未來部署時要更改成 logging 紀錄錯誤訊息 */
// 連接 mongodb 資料庫
export async function connectMongoDB() {
  if (!process.env.MONGO_URI) {
    throw new Error("Mongo_URI 尚未被創建");
  }
  const MONGO_URI: string = process.env.MONGO_URI;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("成功連接到 mongodb");
  } catch (error) {
    console.error("連接 Mongodb 失敗, 錯誤訊息:", error);
    process.exit(1);
  }
}

import mongoose, { Schema, Document, Model } from "mongoose";

const convtoTWDate = (date: Date) => {
  // 將日期轉換成 TW 時區，回傳 string
  return new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(date);
};

export interface LineUserInterface extends Document {
  lineid: string;
  displayName: string;
  pictureUrl: string;
  localusername: string;
  localaccount: string;
  createAt: string;
}

const LineUserSchema: Schema<LineUserInterface> = new Schema<LineUserInterface>(
  {
    lineid: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    pictureUrl: { type: String, default: null },
    localusername: { type: String, default: null },
    localaccount: { type: String, default: null },
    createAt: { type: String, default: () => convtoTWDate(new Date()) },
  }
);

// 匯出 LineUser model
const LineUser: Model<LineUserInterface> =
  mongoose.models.LineUser ||
  mongoose.model<LineUserInterface>("LineUser", LineUserSchema);

export default LineUser;

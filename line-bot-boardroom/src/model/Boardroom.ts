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

export interface BoardInterface extends Document {
  username: string;
  displayName: string;
  message: string;
  postDate: string;
  updateDate: string;
}

const BoardroomSchema: Schema<BoardInterface> = new Schema<BoardInterface>({
  username: { type: String, required: true },
  displayName: { type: String, required: true },
  message: { type: String, required: true },
  postDate: { type: String, default: () => convtoTWDate(new Date()) },
  updateDate: { type: String, default: () => convtoTWDate(new Date()) },
});

// 匯出 Boardroom model
const Boardroom: Model<BoardInterface> =
  mongoose.models.Boardroom ||
  mongoose.model<BoardInterface>("Boardroom", BoardroomSchema);

export default Boardroom;

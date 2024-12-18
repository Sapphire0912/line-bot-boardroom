import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

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

// 創建 user schema 與 type defined
export interface UserInterface extends Document {
  username: string;
  account: string;
  password: string;
  role: string;
  lineid: string;
  createAt: string;
  updateAt: string;
}

export interface UserDocument extends Document, UserInterface {
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema<UserDocument> = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  account: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 20,
    unique: true,
  },
  password: { type: String, required: true, minLength: 8 },
  lineid: { type: String, default: null },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createAt: { type: String, default: () => convtoTWDate(new Date()) },
  updateAt: { type: String, default: () => convtoTWDate(new Date()) },
});

// 密碼加密 middleware
UserSchema.pre("save", async function (next) {
  const user = this as UserDocument;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// 密碼比對
UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// 匯出 User model
const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);
export default User;

import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET 不在環境變數中");
}

const secret: string = process.env.JWT_SECRET;

// 生成 jwt
export const generateToken = (payload: object) => {
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

// 驗證 jwt
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log("jwt error: ", error);
    throw new Error("錯誤的 JWT token 或者 token 已過期");
  }
};

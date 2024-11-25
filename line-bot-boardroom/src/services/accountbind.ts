export const accountBind = async (data: {
  bindMethod: string;
  username: string | null;
  account: string | null;
  password: string | null;
}) => {
  const { bindMethod, username, account, password } = data;

  /* 具體錯誤處理 */
  if (!bindMethod || !account || !password || !username)
    return { message: "必填欄位不可為空", status: 400 };

  if (bindMethod !== "line" && bindMethod !== "local")
    return { message: "綁定方式有誤", status: 400 };

  if (!/^[a-zA-Z0-9_.-@]+$/.test(account))
    return { message: "使用者帳號不可含特殊字元或空白", status: 400 };

  if (account.length < 8)
    return { message: "使用者帳號不長度可小於 8", status: 400 };

  if (password.length < 8)
    return { message: "使用者密碼不長度可小於 8", status: 400 };
  /* End. */

  // 先設計綁定本地帳號
  try {
    const response = await fetch("/api/bind/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, account, password }),
    });
    const info = await response.json(); // 看情況要傳回甚麼訊息
    switch (info.status) {
      case 401:
        return { message: "綁定失敗，請檢查帳號密碼是否錯誤", status: 401 };

      case 500:
        return { message: "綁定帳號失敗", status: 500 };

      case 200:
        return { message: "綁定成功", status: 200 };

      default:
        return { message: "綁定帳號失敗，發生未知錯誤", status: 500 };
    }
  } catch (error) {
    return { message: "綁定帳號失敗", status: 500 };
  }
};

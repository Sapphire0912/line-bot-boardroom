export const loginSystem = async (data: {
  account: string;
  password: string;
}) => {
  const { account, password } = data;

  /* 具體錯誤處理 */
  if (!account || !password)
    return { message: "必填欄位不可為空", status: 400 };

  if (!/^[a-zA-Z0-9_.-@]+$/.test(account))
    return { message: "使用者帳號不可含特殊字元或空白", status: 400 };

  if (account.length < 8)
    return { message: "使用者帳號不長度可小於 8", status: 400 };

  if (password.length < 8)
    return { message: "使用者密碼不長度可小於 8", status: 400 };
  /* End. */

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ account, password }),
    });
    const info = await response.json(); // 此處沒有接收 api/login 與回傳 jwt_token
    return { message: info.message, status: info.status };
  } catch (error) {
    return { message: "Fetch Login API 失敗", status: 500 };
  }
};

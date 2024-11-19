export const registerUser = async (data: {
  username: string;
  account: string;
  password: string;
}) => {
  const { username, account, password } = data;
  /* 具體錯誤處理 */
  if (!username || !account || !password)
    return { message: "必填欄位不可為空", status: 400 };

  if (username.trim().length === 0)
    return { message: "使用者名稱不可為空", status: 400 };

  if (!/^[a-zA-Z0-9_.-@]+$/.test(account))
    return { message: "使用者帳號不可含特殊字元或空白", status: 400 };

  if (account.length < 8)
    return { message: "使用者帳號長度不可小於 8", status: 400 };

  if (password.length < 8)
    return { message: "使用者密碼長度不可小於 8", status: 400 };
  /* End. */

  try {
    const response = await fetch("/api/login/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const info = await response.json();
    if (!response.ok) return { message: info.error, status: info.status };
    return { message: info.message, status: info.status };
  } catch (error) {
    return { message: "Fetch register API 失敗", status: 500 };
  }
};

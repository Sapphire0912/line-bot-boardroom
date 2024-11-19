export const modifyPassword = async (data: {
  username: string;
  account: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const { username, account, newPassword, confirmPassword } = data;

  /* 具體錯誤處理 */
  if (!username || !account || !newPassword || !confirmPassword)
    return { message: "必填欄位不可為空", status: 400 };

  if (username.trim().length === 0)
    return { message: "使用者名稱不可為空", status: 400 };

  if (!/^[a-zA-Z0-9_.-@]+$/.test(account))
    return { message: "使用者帳號不可含特殊字元或空白", status: 400 };

  if (newPassword.length < 8)
    return { message: "新密碼長度不可小於 8", status: 400 };

  if (newPassword !== confirmPassword)
    return { message: "新密碼兩次輸入不相同", status: 400 };
  /* End. */

  try {
    const response = await fetch("/api/login/forgotpw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, account, newPassword }),
    });

    const info = await response.json();
    if (!response.ok) return { message: info.error, status: info.status };
    return { message: info.message, status: info.status };
  } catch (error) {
    return { message: "Fetch forgotpw API 失敗", status: 500 };
  }
};

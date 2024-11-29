export const userMsgRecord = async ({
  username,
  displayName,
  lineid,
}: {
  username: string | null;
  displayName: string | null;
  lineid: string | null;
}) => {
  if (displayName && !lineid)
    return { message: "使用 Line 登入的使用者必須有 lineid 欄位", status: 400 };

  try {
    const response = await fetch("/api/boardroom/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, displayName, lineid }),
    });
    const info = await response.json();
    return {
      message: info.message,
      recordData: info.recordData,
      status: info.status,
    };
  } catch (error) {
    console.log("取得紀錄 API 出現錯誤, ", error);
    return { message: "取得紀錄失敗", status: 500 };
  }
};

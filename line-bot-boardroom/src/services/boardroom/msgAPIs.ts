export const messageAPIs = async (data: {
  username: string | null;
  displayName: string | null;
  userMsg: string | null;
  method: string;
}) => {
  const { username, displayName, userMsg, method } = data;

  if (!userMsg && method !== "GET")
    return { message: "留言欄位不可為空", status: 400 };

  switch (method) {
    case "GET":
      /* 提供給留言板顯示所有留言使用, search 是使用者查詢的 req */
      try {
        const response = await fetch("/api/boardroom/message", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const info = await response.json();
        return { message: info.message, data: info.data, status: info.status };
      } catch (error) {
        return { message: "留言板無法取得資訊", status: 404 };
      }
      break;

    case "POST":
      try {
        const response = await fetch("/api/boardroom/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, displayName, userMsg }),
        });
        const info = await response.json();
        return { message: info.message, status: info.status };
      } catch (error) {
        console.error("留言發送失敗, ", error);
        return { message: "留言發送失敗", status: 500 };
      }

    case "PATCH":
      break;

    case "DELETE":
      break;

    default:
      return { message: "請求方法錯誤", status: 404 };
  }
};

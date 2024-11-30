export const messageAPIs = async (data: {
  username: string | null;
  displayName: string | null;
  lineid: string | null;
  userMsg: string | null;
  updateMsg?: string | null;
  method: string;
}) => {
  const { username, displayName, lineid, userMsg, updateMsg, method } = data;

  if (!userMsg && method !== "GET")
    return { message: "留言欄位不可為空", status: 400 };

  if ((!updateMsg || updateMsg.trim() === "") && method === "PATCH")
    return { message: "更新留言欄位不可為空", status: 400 };

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

    case "POST":
      try {
        const response = await fetch("/api/boardroom/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, displayName, lineid, userMsg }),
        });
        const info = await response.json();
        return { message: info.message, status: info.status };
      } catch (error) {
        console.error("留言發送失敗, ", error);
        return { message: "留言發送失敗", status: 500 };
      }

    case "PATCH":
      try {
        const response = await fetch("/api/boardroom/message", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            displayName,
            lineid,
            userMsg,
            updateMsg,
          }),
        });
        const info = await response.json();
        return { message: info.message, status: info.status };
      } catch (error) {
        console.error("更新留言失敗, ", error);
        return { message: "更新留言失敗", status: 500 };
      }

    case "DELETE":
      try {
        const response = await fetch("/api/boardroom/message", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            displayName,
            lineid,
            userMsg,
          }),
        });
        const info = await response.json();
        return { message: info.message, status: info.status };
      } catch (error) {
        console.error("刪除留言失敗, ", error);
        return { message: "刪除留言失敗", status: 500 };
      }

    default:
      return { message: "請求方法錯誤", status: 404 };
  }
};

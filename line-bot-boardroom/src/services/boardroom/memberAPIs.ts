export const memberAPIs = async (
  role: string,
  method: string,
  userInfo?: {
    username: string | null;
    displayName: string | null;
    lineid: string | null;
  }
) => {
  if (role !== "admin")
    return { message: "僅限管理員可查詢成員資料", memberData: [], status: 401 };

  if (method !== "POST" && method !== "DELETE")
    return { message: "請求方法錯誤", status: 401 };

  switch (method) {
    case "POST":
      try {
        const response = await fetch("/api/boardroom/member", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const info = await response.json();

        return {
          message: info.message,
          memberData: info.memberData,
          status: info.status,
        };
      } catch (error) {
        console.error("member API 呼叫失敗, ", error);
        return { message: "獲取成員訊息失敗", status: 500 };
      }

    case "DELETE":
      try {
        const response = await fetch("/api/boardroom/member", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userInfo }),
        });
        const info = await response.json();
        return { message: info.message, status: info.status };
      } catch (error) {
        console.error("member API 呼叫失敗, ", error);
        return { message: "刪除成員資料失敗", status: 500 };
      }

    default:
      return { message: "請求方法錯誤", status: 401 };
  }
};

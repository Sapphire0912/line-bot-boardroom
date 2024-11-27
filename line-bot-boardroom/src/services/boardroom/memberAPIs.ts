export const memberAPIs = async (role: string) => {
  if (role !== "admin")
    return { message: "僅限管理員可查詢成員資料", status: 401 };

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
    console.error("獲取成員訊息失敗, ", error);
    return { message: "獲取成員訊息失敗", status: 500 };
  }
};

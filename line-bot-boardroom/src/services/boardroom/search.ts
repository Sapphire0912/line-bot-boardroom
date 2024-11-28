export const searchAPI = async (searchType: string, content: string) => {
  if (searchType !== "message" && searchType !== "member")
    return { message: "搜尋類型錯誤", status: 400 };

  if (content === "") return { message: "搜尋內容不可為空", status: 400 };

  try {
    const query = new URLSearchParams({ searchType, content }).toString();
    const response = await fetch(`/api/boardroom/search?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const info = await response.json();

    return {
      message: info.message,
      targetData: info.targetData,
      status: info.status,
    };
  } catch (error) {
    console.log("search API 出現錯誤, error", error);
    return { message: "搜尋失敗", status: 500 };
  }
};

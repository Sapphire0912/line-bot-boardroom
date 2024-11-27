"use client";

import React, { useState, useEffect } from "react";
import Search from "@/components/Search";
import Send from "@/components/Send";
import BoardContent from "@/components/BoardContent";
import { messageAPIs } from "@/services/boardroom/msgAPIs";

interface DataType {
  username: string | null;
  displayName: string | null;
  message: string;
  postDate: string;
  updateDate: string | null;
}

const userPage = () => {
  const [flag, setFlag] = useState<boolean>(false); // 若送出與查詢操作需要重新渲染留言板

  /* 處理前端取得資料邏輯 */
  const [data, setData] = useState<DataType[] | null>(null);
  const getBoardData = async () => {
    const response = await messageAPIs({
      method: "GET",
      username: null,
      displayName: null,
      userMsg: null,
    });
    if (response?.status === 200) {
      setData(response?.data);
    } else {
      setData(response?.message);
    }
  };
  /* End. */

  useEffect(() => {
    getBoardData();
    setFlag(false);
  }, [flag]);

  if (!data || data.length === 0) {
    return (
      <section className="w-[80%] min-h-full flex flex-col">
        <div className="min-h-full">
          <Search isSubmit={setFlag} />
          <p className="text-lg">
            {data === null ? "資料正在加載中..." : "目前尚無留言資料"}
          </p>
        </div>
        <Send isSubmit={setFlag} />
      </section>
    );
  }

  return (
    <section className="w-[80%] h-screen flex flex-col">
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="sticky top-0 z-10">
          <Search isSubmit={setFlag} />
        </div>

        <div className="h-full overflow-y-auto">
          {data.map((content, index) => (
            <BoardContent
              key={`${index}`}
              username={content.username}
              displayName={content.displayName}
              userMsg={content.message}
              postDate={content.postDate}
              updateDate={content.updateDate}
            />
          ))}
        </div>

        <div className="sticky bottom-0 z-10">
          <Send isSubmit={setFlag} />
        </div>
      </div>
    </section>
  );
};

export default userPage;

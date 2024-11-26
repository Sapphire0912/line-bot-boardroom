"use client";

import React, { useState, useEffect } from "react";
import Search from "@/components/Search";
import Send from "@/components/Send";
import BoardContent from "@/components/BoardContent";
import { messageAPIs } from "@/services/boardroom/msgAPIs";

const userPage = () => {
  const [flag, setFlag] = useState<boolean>(false); // 若送出與查詢操作需要重新渲染留言板

  /* 處理前端取得資料邏輯 */
  const [data, setData] = useState(null);
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

  return (
    <section className="w-[80%] min-h-full">
      <div className="border-2 border-red-500 min-h-full">
        <Search isSubmit={setFlag} />
        {data &&
          data.map((content) => (
            <BoardContent
              username={content.username}
              displayName={content.displayName}
              userMsg={content.message}
              postDate={content.postDate}
              updateDate={null}
            ></BoardContent>
          ))}
      </div>
      <Send isSubmit={setFlag} />
    </section>
  );
};

export default userPage;

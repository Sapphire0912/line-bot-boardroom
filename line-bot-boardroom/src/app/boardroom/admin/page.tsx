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

const adminPage = () => {
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
      <section className="w-full flex border-2 border-black m-6">
        <div className="member-div flex-1 border-2 border-red-400">
          Member section
        </div>
        <div className="boardroom-div flex-1 border-2 border-purple-900">
          <div className="min-h-full">
            <Search isSubmit={setFlag} />
          </div>
          <Send isSubmit={setFlag} />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex m-2">
      <div className="member-div flex-1 border border-black">
        Member section
      </div>
      <div className="boardroom-div flex-1">
        <div className="min-h-full">
          <Search isSubmit={setFlag} />
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
        <Send isSubmit={setFlag} />
      </div>
    </section>
  );
};

export default adminPage;

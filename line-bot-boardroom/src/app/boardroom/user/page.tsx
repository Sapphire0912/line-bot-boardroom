"use client";

import React, { useState, useEffect } from "react";
import Search from "@/components/Search";
import Send from "@/components/Send";
import BoardContent from "@/components/BoardContent";
import { messageAPIs } from "@/services/boardroom/msgAPIs";
import { searchAPI } from "@/services/boardroom/search";

interface DataType {
  username: string | null;
  displayName: string | null;
  message: string;
  postDate: string;
  updateDate: string | null;
}

interface SearchInfoType {
  searchText: string;
  searchType: string;
}

const userPage = () => {
  const [flag, setFlag] = useState<boolean>(false); // 若送出操作需要重新渲染留言板
  const [searchInfo, setSearchInfo] = useState<SearchInfoType>({
    searchText: "",
    searchType: "",
  }); // 若查詢操作需要呼叫 API

  /* 處理前端取得資料邏輯 */
  const [data, setData] = useState<DataType[] | null>(null);
  const [hint, setHint] = useState<string>("");

  const getBoardData = async () => {
    const response = await messageAPIs({
      method: "GET",
      username: null,
      displayName: null,
      userMsg: null,
    });
    if (response.status === 200) {
      setData(response.data);
    } else {
      setData([]);
      setHint(response.message);
    }
  };

  const getSearchData = async () => {
    const response = await searchAPI(
      searchInfo.searchType,
      searchInfo.searchText
    );
    if (response.status === 200) {
      setData(response.targetData);
    } else {
      setData([]);
      setHint(response.message);
    }
  };
  /* End. */

  useEffect(() => {
    if (searchInfo.searchText && searchInfo.searchType) {
      getSearchData();
    }
  }, [searchInfo]);

  useEffect(() => {
    getBoardData();
    setFlag(false);
  }, [flag]);

  if (!data) {
    return (
      <section className="w-[80%] min-h-full flex flex-col">
        <div className="min-h-full">
          <Search isOperation={setSearchInfo} searchType="message" />
          <p className="text-lg">資料正在加載中...</p>
        </div>
        <Send isSubmit={setFlag} />
      </section>
    );
  }

  return (
    <section className="w-[80%] h-screen flex flex-col">
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="sticky top-0 z-10">
          <Search isOperation={setSearchInfo} searchType="message" />
        </div>

        <div className="h-full overflow-y-auto">
          {data.length !== 0 ? (
            data.map((content, index) => (
              <BoardContent
                key={`${index}`}
                username={content.username}
                displayName={content.displayName}
                userMsg={content.message}
                postDate={content.postDate}
                updateDate={content.updateDate}
              />
            ))
          ) : (
            <p className="text-lg p-1">{hint}</p>
          )}
        </div>

        <div className="sticky bottom-0 z-10">
          <Send isSubmit={setFlag} />
        </div>
      </div>
    </section>
  );
};

export default userPage;

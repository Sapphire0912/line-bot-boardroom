"use client";

import React, { useState } from "react";
import Image from "next/image";

interface SubmitProps {
  isOperation: (searchInfo: { searchText: string; searchType: string }) => void;
  searchType: string;
}

const Search: React.FC<SubmitProps> = ({ isOperation, searchType }) => {
  /* 處理前端狀態邏輯與事件處理 */
  const [searchText, setSearchText] = useState<string>("");

  const searchSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    isOperation({ searchText, searchType }); // 傳送給 user/admin page 去呼叫 API
    setSearchText("");
  };

  const searchFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  /* End. */

  return (
    <form
      className="flex items-center m-1 p-1 bg-white border border-blue-300"
      onSubmit={searchSumbit}
    >
      <span className="bg-white p-1 mr-1">
        <Image src="/search.png" alt="search" width={24} height={24} priority />
      </span>

      <input
        type="text"
        placeholder={
          searchType === "member"
            ? "輸入使用者名稱(不需@)"
            : "搜尋(@使用者或是文字內容)"
        }
        className="flex-grow outline-none bg-transparent"
        value={searchText}
        onChange={searchFormChange}
      />

      <button
        type="submit"
        className="font-bold pl-3 pr-3 pt-1 pb-1 mr-1 border-2 border-blue-200 bg-blue-500 rounded-3xl text-white"
      >
        搜尋
      </button>
    </form>
  );
};

export default Search;

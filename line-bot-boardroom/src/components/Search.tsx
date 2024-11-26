"use client";
import React from "react";
import Image from "next/image";

const Search = () => {
  const searchSumbit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex items-center p-1 bg-white border border-blue-300"
      onSubmit={searchSumbit}
    >
      <span className="bg-white p-1 mr-1">
        <Image src="/search.png" alt="search" width={24} height={24} priority />
      </span>

      <input
        type="text"
        placeholder="搜尋(例如: @使用者或是文字內容)"
        className="flex-grow outline-none bg-transparent"
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

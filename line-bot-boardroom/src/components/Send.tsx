"use client";
import React from "react";
import Image from "next/image";

const Send = () => {
  const sendSumbit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex items-center p-1 bg-white border border-blue-300"
      onSubmit={sendSumbit}
    >
      <span className="bg-white p-1 mr-1">
        <Image src="/send.png" alt="search" width={24} height={24} priority />
      </span>

      <input
        type="text"
        placeholder="請輸入留言的訊息"
        className="flex-grow outline-none bg-transparent"
      />

      <button
        type="submit"
        className="font-bold pl-3 pr-3 pt-1 pb-1 mr-1 border-2 border-blue-200 bg-blue-500 rounded-3xl text-white"
      >
        送出
      </button>
    </form>
  );
};

export default Send;

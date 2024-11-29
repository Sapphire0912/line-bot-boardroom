"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { messageAPIs } from "@/services/boardroom/msgAPIs";

interface SubmitProps {
  isSubmit: (flag: boolean) => void;
}

const Send: React.FC<SubmitProps> = ({ isSubmit }) => {
  const { username, displayName, lineid } = useUser();

  /* 處理前端狀態邏輯與事件處理 */
  const [message, setMessage] = useState<string>("");
  const [hint, setHint] = useState<string>("");
  const [status, setStatus] = useState<number>(404);
  const [hintAnime, setHintAnime] = useState<boolean>(false);

  const sendSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await messageAPIs({
      username,
      displayName,
      lineid,
      userMsg: message,
      method: "POST",
    });

    setHint(response?.message);
    setStatus(response?.status);
    setMessage(""); // 清空 form
    setHintAnime(true);
    isSubmit(true);

    // 只顯示成功訊息 2 秒鐘
    setTimeout(() => {
      setHintAnime(false);
      setTimeout(() => setHint(""), 500);
    }, 2000);
  };

  const sendInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  /* End. */

  return (
    <div className="relative">
      {hint !== "" && (
        <p
          className={`bg-gray-100 text-xl font-bold rounded-2xl transition-opacity duration-500 pt-2 pb-2 pl-4 pr-4 ${
            status === 201 ? "text-green-400" : "text-red-400"
          } ${
            hintAnime ? "opacity-100" : "opacity-0"
          } absolute -top-16 left-1/2 transform -translate-x-1/2`}
        >
          {hint}
        </p>
      )}
      <form
        className="flex items-center m-1 p-1 bg-white border border-blue-300"
        onSubmit={sendSumbit}
      >
        <span className="bg-white p-1 mr-1">
          <Image src="/send.png" alt="search" width={24} height={24} priority />
        </span>

        <input
          type="text"
          placeholder="請輸入留言的訊息"
          className="flex-grow outline-none bg-transparent"
          value={message}
          onChange={sendInputChange}
        />

        <button
          type="submit"
          className="font-bold pl-3 pr-3 pt-1 pb-1 mr-1 border-2 border-blue-200 bg-blue-500 rounded-3xl text-white"
        >
          送出
        </button>
      </form>
    </div>
  );
};

export default Send;

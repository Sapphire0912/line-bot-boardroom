"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const BoardTitle = () => {
  /* 處理登出按鈕邏輯，不經過 services 處理 */
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/login/logout", {
        method: "GET",
      });
      if (response.ok) {
        router.push("/login");
      } else {
        console.error("登出失敗");
      }
    } catch (error) {
      console.error("登出 API 請求失敗", error);
    }
  };
  /* End. */

  // 取得 user context API 資訊
  const { username, displayName, isBind, method } = useUser();

  return (
    <div className="p-2 sm:p-4 border-b-2 border-slate-400 bg-slate-200 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="/boardroom-title.png"
          alt="boardroom"
          height={48}
          width={48}
          className="inline-block xs:hidden"
          priority
        />
        <h1 className="pl-1 pr-1 text-2xl sm:text-3xl font-bold text-green-500 text-center">
          LINE 留言板
        </h1>
      </div>

      <div className="flex items-center pl-2 sm:pr-2">
        <span className="flex flex-col mr-2 sm:mr-4 text-lg sm:flex-row sm:text-xl font-bold">
          <p>歡迎,&nbsp;</p>
          <Link
            href="/boardroom/profile"
            className="underline hover:text-blue-800"
          >
            {method === "Line" ? displayName : username}
          </Link>
        </span>

        <button
          type="button"
          className="font-bold text-lg pl-2 pr-2 sm:text-xl sm:pl-4 sm:pr-4 pt-1 pb-1 border-2 border-blue-300 bg-blue-600 rounded-3xl text-white hover:text-black hover:bg-slate-100"
          onClick={handleLogout}
        >
          登出
        </button>
      </div>
    </div>
  );
};

export default BoardTitle;

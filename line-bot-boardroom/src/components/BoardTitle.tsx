"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BoardTitle = ({ username }: { username: string }) => {
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

  return (
    <div className="p-4 border-b-2 border-slate-400 bg-slate-200 flex items-center">
      <Image
        src="/boardroom-title.png"
        alt="boardroom"
        height={48}
        width={48}
      />
      <h1 className="pl-1 pr-1 text-3xl font-bold text-green-500 text-center">
        LINE 留言板
      </h1>

      <div>
        <Link href="/boardroom/profile">歡迎, {username}</Link>
        <button type="button" onClick={handleLogout}>
          登出
        </button>
      </div>
    </div>
  );
};

export default BoardTitle;

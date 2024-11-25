"use client";

import React from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const profile = () => {
  const { username, role, method, isBind, createDate } = useUser();
  const router = useRouter();

  return (
    <div className="w-[80%] p-2 bg-slate-100 shadow-[4px_0px_6px_rgba(0,0,0,0.25),-4px_0px_6px_rgba(0,0,0,0.25)]">
      <h1 className="font-bold text-3xl flex justify-center items-center pt-2 pb-2">
        基本資料
      </h1>
      <div className="pl-4 pr-4">
        <p className="font-bold text-xl pt-1 pb-1">使用者名稱:{username}</p>
        <p className="text-lg pt-1 pb-1">創建時間: {createDate}</p>
        <p className="text-lg pt-1 pb-1">
          權限: {`${role === "admin" ? "管理員" : "使用者"}`}
        </p>
        <p className="text-lg pt-1 pb-1">登入方式: {method}</p>
        <p className="text-lg pt-1 pb-1">
          是否綁定{method === "Line" ? "本地" : "Line"}帳號:&nbsp;
          {isBind ? "已綁定" : "未綁定"}
        </p>
        {isBind || (
          <button
            type="button"
            onClick={() =>
              router.push(
                `/boardroom/profile/bind/${
                  method === "Line" ? "local" : "line"
                }`
              )
            }
            className="font-bold text-white bg-blue-500 border border-transparent p-2 mt-1 mb-1 rounded-2xl text-lg hover:border hover:border-blue-500 hover:text-black hover:bg-white"
          >
            綁定{method === "Line" ? "本地" : "Line"}帳號
          </button>
        )}
      </div>

      <h1 className="font-bold text-3xl flex justify-center items-center pt-2 pb-2">
        留言紀錄
      </h1>
      {/* 需要 content grid format */}
    </div>
  );
};

export default profile;

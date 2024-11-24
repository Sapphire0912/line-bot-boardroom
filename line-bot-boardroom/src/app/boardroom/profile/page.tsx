"use client";

import React from "react";
import { useUser } from "@/context/UserContext";

const profile = () => {
  const {
    username,
    role,
    method,
    isBind,
    createDate,
    setUsername,
    setRole,
    setLoginMethod,
    setCreateDate,
    setIsBind,
  } = useUser();

  return (
    <div className="border-2 border-black w-[80%] p-2 bg-slate-100">
      <h1 className="font-bold text-3xl flex justify-center items-center pt-2 pb-2">
        基本資料
      </h1>
      <h3 className="font-bold text-xl flex items-center pt-2 pb-2">
        使用者名稱：{username}
      </h3>
      <p>創建時間: {createDate}</p>
      <p>角色: {`${role === "admin" ? "管理員" : "使用者"}`}</p>
      <p>登入方式:{method}</p>
      <p>是否綁定 Line 帳號: {isBind ? "已綁定" : "未綁定"}</p>
      <p>綁定 Line 帳號連結 LineBot </p>
      <h2 className="font-bold text-3xl flex justify-center items-center pt-2 pb-2">
        留言紀錄
      </h2>
      {/* 需要 content grid format */}
    </div>
  );
};

export default profile;

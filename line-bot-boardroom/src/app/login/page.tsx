"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { loginSystem } from "@/services/login/login";
import { useRouter } from "next/navigation";

const Login = () => {
  const inputStyle: string = "w-full outline-none bg-transparent";
  const labelStyle: string = "font-bold text-lg";

  /* 處理前端元件狀態及 services api 請求 */
  const [formData, setFormData] = useState({
    account: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>("");

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await loginSystem(formData);
      setMessage(result.message);

      if (result.status === 200) {
        router.push(`/boardroom/${result.role}`);
      }
    } catch (error) {
      setMessage("前端頁面呼叫 API 失敗");
    }
  };
  /* End. */

  /* 處理 Line Login 邏輯 */
  const handleLinelogin = async () => {
    window.location.href = "/api/auth/line";
  };

  return (
    <div className="2xl:w-1/3 xl:w-1/2 lg:w-[60%] md:w-[70%] w-[90%] h-1/2 border border-gray-500 rounded-xl p-6 bg-slate-200 shadow-2xl">
      <h3 className="font-bold text-2xl text-center p-2">登入留言板</h3>
      <form onSubmit={formSubmit} method="POST">
        <div className="flex-col p-2">
          <label htmlFor="account" className={labelStyle}>
            使用者帳號
          </label>
          <div className="pt-2 flex items-center border-b border-black">
            <span className="mr-2 mb-1">
              <Image
                src="/useraccount.png"
                width={32}
                height={32}
                alt="useraccount"
                priority
              />
            </span>

            <input
              className={inputStyle}
              type="text"
              name="account"
              id="account"
              placeholder="請輸入至少 8 個字元"
              value={formData.account}
              onChange={formChange}
            ></input>
          </div>
        </div>

        <div className="p-2">
          <label htmlFor="password" className={labelStyle}>
            使用者密碼
          </label>
          <div className="pt-2 flex items-center border-b border-black">
            <span className="mr-2 mb-1">
              <Image
                src="/password.png"
                width={32}
                height={32}
                alt="password"
                priority
              />
            </span>

            <input
              className={inputStyle}
              type="password"
              name="password"
              id="password"
              placeholder="請輸入至少 8 個字元"
              value={formData.password}
              onChange={formChange}
            ></input>
          </div>
        </div>

        <div className="pt-1 pb-2 text-right">
          <Link
            href="/login/register"
            className="font-bold hover:border-b hover:border-slate-700 mr-3"
          >
            註冊帳號
          </Link>
          <Link
            href="/login/forgotpw"
            className="font-bold hover:border-b hover:border-slate-700"
          >
            忘記密碼?
          </Link>
        </div>

        {message && (
          <p className="font-bold text-base p-2 text-blue-600">{message}</p>
        )}

        <div className="p-2">
          <button
            type="submit"
            className="border-2 w-full border-blue-200 bg-blue-500 text-xl rounded-2xl font-bold text-white"
          >
            登入
          </button>
        </div>

        <div className="p-2 flex justify-center">
          <button
            type="button"
            className="flex items-center justify-center border-2 w-1/2 border-green-200 bg-green-500 text-xl rounded-2xl font-bold text-white"
            onClick={handleLinelogin}
          >
            <span className="ml-1 mr-1 text-inherit">
              <Image
                src="/line.png"
                width={32}
                height={32}
                alt="line"
                priority
              />
            </span>
            <span>使用 LINE 登入</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

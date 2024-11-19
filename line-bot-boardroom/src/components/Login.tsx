import React from "react";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const inputStyle: string = "w-full outline-none bg-transparent";
  const labelStyle: string = "font-bold text-lg";

  return (
    <div className="w-1/4 h-1/2 border border-gray-500 rounded-xl p-6 bg-slate-200">
      <h3 className="font-bold text-2xl text-center p-2">登入留言板</h3>
      <form>
        <div className="flex-col p-2">
          <label htmlFor="account" className={labelStyle}>
            使用者帳號
          </label>
          <div className="pt-2 flex items-center border-b border-black">
            <span className="mr-2 mb-1">
              <Image
                src="/username.png"
                width={32}
                height={32}
                alt="username"
                priority
              />
            </span>

            <input
              className={inputStyle}
              type="text"
              name="account"
              id="account"
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
            ></input>
          </div>
        </div>

        <div className="pt-1 pb-2 text-right">
          <Link href="#">忘記密碼?</Link>
        </div>

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
            type="submit"
            className="flex items-center justify-center border-2 w-1/2 border-green-200 bg-green-500 text-xl rounded-2xl font-bold text-white"
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

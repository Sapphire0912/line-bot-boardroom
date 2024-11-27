import React from "react";
import Link from "next/link";
import Title from "@/components/title";

const errorPage = () => {
  return (
    <div>
      <Title />
      發生未知錯誤，
      <Link href="/login" className="underline">
        請返回登入首頁
      </Link>
    </div>
  );
};

export default errorPage;

import React from "react";
import Link from "next/link";
import Title from "@/components/title";

const errorPage = () => {
  return (
    <div>
      <Title />
      已在其他地方登入留言板，
      <Link href="/login" className="underline">
        請返回登入首頁
      </Link>
    </div>
  );
};

export default errorPage;

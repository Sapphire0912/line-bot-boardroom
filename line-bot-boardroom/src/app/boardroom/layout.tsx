import React from "react";
import { headers } from "next/headers";
import Link from "next/link";
import Title from "@/components/Title";
import BoardTitle from "@/components/BoardTitle";

export default async function BoardroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 從 headers 中取得 username 資料
  const headersList = await headers();
  const username = headersList.get("username");

  if (!username) {
    return (
      <section>
        <Title />
        <section className="min-h-screen flex flex-col">
          <h1 className="text-4xl">拒絕存取。</h1>
          <p className="text-2xl">使用者未登入，請返回登入頁面。</p>
          <Link href="/login">返回登入頁面</Link>
        </section>
      </section>
    );
  }
  return (
    <section>
      <BoardTitle username={username} />
      <section className="min-h-screen flex flex-col">
        <div className="flex flex-grow justify-center items-center">
          {children}
        </div>
      </section>
    </section>
  );
}

import React from "react";
import { headers } from "next/headers";
import Link from "next/link";
import Title from "@/components/Title";

import { UserProvider } from "@/context/UserContext";
import BoardTitle from "@/components/BoardTitle";

export default async function BoardroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* 從 header 中取得 username/displayName 資訊, 並且使用 context provider 共享訊息 */
  const headersList = await headers();

  const encode_username: string | null =
    headersList.get("username") !== "null" ? headersList.get("username") : null;
  const encode_displayName: string | null =
    headersList.get("displayName") !== "null"
      ? headersList.get("displayName")
      : null;
  const role = headersList.get("role");
  const isBind: boolean = headersList.get("isBind") === "true" ? true : false;
  const createAt = headersList.get("createAt");
  const loginMethod = headersList.get("loginMethod");

  if (!encode_username && !encode_displayName) {
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

  // 預設顯示 Line 名稱
  const username: string = encode_displayName
    ? decodeURIComponent(encode_displayName as string)
    : decodeURIComponent(encode_username as string);

  return (
    <UserProvider
      defaultUsername={username}
      defaultRole={role}
      loginMethod={loginMethod}
      bind={isBind}
      lastCreateAt={createAt}
    >
      <BoardTitle />
      <section className="min-h-screen flex flex-col">
        <div className="flex flex-grow justify-center">{children}</div>
      </section>
    </UserProvider>
  );
}

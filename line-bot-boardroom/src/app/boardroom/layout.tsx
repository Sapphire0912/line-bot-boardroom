import React from "react";
import { headers } from "next/headers";
import Link from "next/link";
import Title from "@/components/title";

import { UserProvider } from "@/context/UserContext";
import BoardTitle from "@/components/BoardTitle";

export default async function BoardroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* 從 header 中取得 username/displayName 資訊, 並且使用 context provider 共享訊息 */
  const headersList = await headers();

  const username: string | null =
    headersList.get("username") !== "null"
      ? decodeURIComponent(headersList.get("username") as string)
      : null;

  const displayName: string | null =
    headersList.get("displayName") !== "null"
      ? decodeURIComponent(headersList.get("displayName") as string)
      : null;

  const role = headersList.get("role");
  const isBind: boolean = headersList.get("isBind") === "true" ? true : false;
  const createAt = headersList.get("createAt");
  const loginMethod = headersList.get("loginMethod");
  const lineid =
    headersList.get("lineid") !== "null" ? headersList.get("lineid") : null;

  if (!username && !displayName) {
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
    <UserProvider
      defaultUsername={username}
      defaultDisplayName={displayName}
      defaultRole={role}
      loginMethod={loginMethod}
      bind={isBind}
      lastCreateAt={createAt}
      isLineId={lineid}
    >
      <BoardTitle />
      <section className="min-h-screen flex flex-col">
        <div className="flex flex-grow justify-center">{children}</div>
      </section>
    </UserProvider>
  );
}

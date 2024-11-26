"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";

interface UserContextType {
  username: string | null;
  displayName: string | null;
  role: string | null;
  method: string | null;
  isBind: boolean;
  createDate: string | null;
  setUsername: (username: string | null) => void;
  setRole: (role: string | null) => void;
  setLoginMethod: (method: string | null) => void;
  setCreateDate: (createDate: string | null) => void;
  setIsBind: (isBind: boolean) => void;
  setDisplayName: (displayName: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined); // 默認值

// 設定 Provider
export const UserProvider = ({
  children,
  loginMethod,
  bind,
  lastCreateAt,
  defaultUsername,
  defaultDisplayName,
  defaultRole,
}: {
  children: ReactNode;
  loginMethod: string | null;
  bind: boolean;
  lastCreateAt: string | null;
  defaultUsername: string | null;
  defaultDisplayName: string | null;
  defaultRole: string | null;
}) => {
  const [username, setUsername] = useState<string | null>(defaultUsername);
  const [displayName, setDisplayName] = useState<string | null>(
    defaultDisplayName
  );

  const [role, setRole] = useState<string | null>(defaultRole);
  const [method, setLoginMethod] = useState<string | null>(loginMethod);
  const [isBind, setIsBind] = useState<boolean>(bind);
  const [createDate, setCreateDate] = useState<string | null>(lastCreateAt);

  return (
    <UserContext.Provider
      value={{
        username,
        displayName,
        role,
        method,
        isBind,
        createDate,
        setUsername,
        setRole,
        setLoginMethod,
        setCreateDate,
        setIsBind,
        setDisplayName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 自定義 hook, 存取 UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser 必須在 UserProvider 中使用");
  }
  return context;
};

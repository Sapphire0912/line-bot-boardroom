"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";

interface UserContextType {
  username: string | null;
  role: string | null;
  setUsername: (username: string | null) => void;
  setRole: (role: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined); // 默認值

// 設定 Provider
export const UserProvider = ({
  children,
  defaultUsername,
  defaultRole,
}: {
  children: ReactNode;
  defaultUsername: string | null;
  defaultRole: string | null;
}) => {
  const [username, setUsername] = useState<string | null>(defaultUsername);
  const [role, setRole] = useState<string | null>(defaultRole);

  return (
    <UserContext.Provider value={{ username, role, setUsername, setRole }}>
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

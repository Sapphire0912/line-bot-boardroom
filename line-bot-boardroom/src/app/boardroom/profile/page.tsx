import React from "react";

const profile = ({ username, role }: { username: string; role: string }) => {
  return (
    <div>
      <h1>個人頁面</h1>
      <h1>{username}</h1>
      <p>創建時間: time</p>
      <p>角色: {`${role === "admin" ? "管理員" : "使用者"}`}</p>
      <p>綁定 Line 帳號連結 LineBot </p>
      <h2>留言紀錄</h2>
      {/* 需要 content grid format */}
    </div>
  );
};

export default profile;

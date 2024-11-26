import React from "react";

/* 顯示留言板每個留言的內容 */
const BoardContent = ({
  username,
  displayName,
  userMsg,
  postDate,
  updateDate,
}: {
  username: string | null;
  displayName: string | null;
  userMsg: string;
  postDate: string;
  updateDate: string | null;
}) => {
  const handlePostName = () => {
    const nameStyle: string = "font-bold text-lg italic";
    if (username && displayName)
      return (
        <h3 className={`${nameStyle} p-1`}>{`${username}(${displayName})`}</h3>
      );
    if (username) return <h3 className={`${nameStyle} p-1`}>{username}</h3>;
    if (displayName)
      return <h3 className={`${nameStyle} p-1`}>{displayName}</h3>;
  };
  return (
    <div>
      {handlePostName()}
      <p className="text-gray-600 p-0.5 text-xs">留言日期:{postDate}</p>
      {updateDate && (
        <p className="text-gray-600 p-0.5 text-xs">更新日期:{updateDate}</p>
      )}
      <p className="p-1 text-base">{userMsg}</p>
    </div>
  );
};

export default BoardContent;

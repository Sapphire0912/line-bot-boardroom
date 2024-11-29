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
    const nameStyle: string = "font-bold text-xl";
    if (username && displayName)
      return (
        <h3 className={`${nameStyle} p-1`}>{`${username}(${displayName})`}</h3>
      );
    if (username) return <h3 className={`${nameStyle} p-1`}>{username}</h3>;
    if (displayName)
      return <h3 className={`${nameStyle} p-1`}>{displayName}</h3>;
  };
  // 可再考慮 displayName 重複時，是否需要新增 lineid 欄位
  return (
    <div className="border-b border-b-black m-1 duration-300 hover:bg-slate-50">
      {handlePostName()}
      <p className="text-gray-600 p-0.5 text-xs">留言時間:{postDate}</p>
      {updateDate && updateDate !== postDate && (
        <p className="text-gray-600 p-0.5 text-xs">更新日期:{updateDate}</p>
      )}
      <p className="p-1 text-base">{userMsg}</p>
    </div>
  );
};

export default BoardContent;

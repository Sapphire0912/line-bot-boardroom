import React from "react";
import Image from "next/image";

const Members = ({
  username,
  displayName,
  lineid,
}: {
  username: string | null;
  displayName: string | null;
  lineid: string | null;
}) => {
  /* 處理刪除成員的區塊 */
  const deleteMemeber = () => {};
  /* End. */

  const handleMemberName = () => {
    const nameStyle: string = "font-bold text-lg";
    if (username && displayName)
      return (
        <h3 className={`${nameStyle} p-1`}>{`${username}(${displayName})`}</h3>
      );
    if (username) return <h3 className={`${nameStyle} p-1`}>{username}</h3>;
    if (displayName)
      return <h3 className={`${nameStyle} p-1`}>{displayName}</h3>;
  };
  // 需要新增 lineid 欄位
  return (
    <div className="flex border border-gray-400 justify-between items-center m-2 pt-1 pb-1 pl-4 pr-4 bg-white rounded-lg duration-300 hover:bg-cyan-100">
      {handleMemberName()}
      {lineid && (
        <p className="text-sm text-gray-500">
          {lineid?.length > 5 ? lineid?.slice(0, 5) + "..." : lineid}
        </p>
      )}
      <button
        type="button"
        className="duration-300 hover:scale-110"
        onClick={deleteMemeber}
      >
        <Image src="/cross.png" alt="cross" width={36} height={36} priority />
        <span>{""}</span>
      </button>
    </div>
  );
};

export default Members;

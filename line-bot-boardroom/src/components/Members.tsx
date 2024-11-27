import React from "react";
import Image from "next/image";

const Members = ({
  username,
  displayName,
}: {
  username: string | null;
  displayName: string | null;
}) => {
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
  return (
    <div className="flex border border-gray-400 justify-between items-center m-2 pt-1 pb-1 pl-4 pr-4 bg-white rounded-lg duration-300 hover:bg-cyan-100">
      {handleMemberName()}
      <button type="button" className="duration-300 hover:scale-110">
        <Image src="/cross.png" alt="cross" width={36} height={36} priority />
        <span>{""}</span>
      </button>
    </div>
  );
};

export default Members;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { memberAPIs } from "@/services/boardroom/memberAPIs";

interface ChildProps {
  isSubmit: React.Dispatch<React.SetStateAction<boolean>>; // 定義 props 類型
  username: string | null;
  displayName: string | null;
  lineid: string | null;
}

const ConfirmationDialog = ({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <p className="text-lg text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            取消
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  );
};

const Members: React.FC<ChildProps> = ({
  username,
  displayName,
  lineid,
  isSubmit,
}) => {
  /* 處理刪除成員的區塊 */
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [hint, setHint] = useState<string>("");

  const deleteMemeber = async () => {
    setIsOpenDialog(false);
    // 呼叫 member 的 API, 傳入三個訊息
    const response = await memberAPIs("admin", "DELETE", {
      username,
      displayName,
      lineid,
    });
    setHint(response.message);
    isSubmit(true); // 給父組件去更新 boardroom 狀態
  };
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
        onClick={() => setIsOpenDialog(true)}
      >
        <Image src="/cross.png" alt="cross" width={36} height={36} priority />
        <span>{""}</span>
      </button>

      {isOpenDialog && (
        <ConfirmationDialog
          message={`確認是否刪除此成員`}
          onConfirm={deleteMemeber}
          onCancel={() => setIsOpenDialog(false)}
        />
      )}
    </div>
  );
};

export default Members;

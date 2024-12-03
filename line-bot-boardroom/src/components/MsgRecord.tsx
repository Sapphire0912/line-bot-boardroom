import React, { useState, useEffect } from "react";
import Image from "next/image";
import { userMsgRecord } from "@/services/boardroom/userRecord";
import { messageAPIs } from "@/services/boardroom/msgAPIs";

interface DataType {
  username: string | null;
  displayName: string | null;
  lineid: string | null;
  message: string;
  postDate: string;
  updateDate: string | null;
}

interface TextFormType {
  index: number | null;
  originalText: string | null;
  changedText: string | null;
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

// 任何與留言紀錄相關的操作皆在此處

const MsgRecord = ({
  username,
  displayName,
  lineid,
}: {
  username: string | null;
  displayName: string | null;
  lineid: string | null;
}) => {
  /* 處理前端取得使用者留言資訊 */
  const [data, setData] = useState<DataType[] | null>(null);
  const [hint, setHint] = useState<string>("");
  const [status, setStatus] = useState<number>(404);
  const [hintAnime, setHintAnime] = useState<boolean>(false);

  const [expanded, setExpanded] = useState<number | null>(null); // 紀錄展開的留言索引
  const [editing, setEditing] = useState<number | null>(null);
  const [msgText, setMsgText] = useState<TextFormType>({
    index: null,
    originalText: null,
    changedText: null,
  });
  const [isOperation, setIsOperation] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<string>("");

  const handleMsgEdit = (index: number, originalText: string) => {
    // 處理使用者編輯留言的狀態 (重複點選擇關閉)
    if (editing !== index) {
      setEditing(index);
      setMsgText({
        index,
        originalText,
        changedText: originalText,
      });
    } else {
      setEditing(null);
      setMsgText({
        index: null,
        originalText: null,
        changedText: null,
      });
    }
  };

  const handleMsgChanged = async () => {
    // 處理使用者提交更新後的留言
    const response = await messageAPIs({
      username,
      displayName,
      lineid,
      userMsg: msgText.originalText,
      updateMsg: msgText.changedText,
      method: "PATCH",
    });
    setHint(response.message);
    setStatus(response?.status);
    setHintAnime(true);
    setIsOperation(true);
    setEditing(null);

    // 只顯示成功訊息 2 秒鐘
    setTimeout(() => {
      setHintAnime(false);
      setTimeout(() => setHint(""), 500);
    }, 2000);
  };

  const handleMsgDelete = async (userMsg: string) => {
    // 處理使用者刪除留言功能
    const response = await messageAPIs({
      username,
      displayName,
      lineid,
      userMsg,
      method: "DELETE",
    });
    setHint(response.message);
    setStatus(response?.status);
    setHintAnime(true);
    setIsOperation(true);
    setEditing(null);

    // 只顯示成功訊息 2 秒鐘
    setTimeout(() => {
      setHintAnime(false);
      setTimeout(() => setHint(""), 500);
    }, 2000);
  };

  const getUserRecord = async () => {
    // 取得留言資料
    const response = await userMsgRecord({
      username,
      displayName,
      lineid,
    });
    if (response.status === 200) {
      setData(response.recordData);
    } else {
      setData([]);
      setHint(response.message);
    }
  };
  /* End. */

  useEffect(() => {
    getUserRecord();
    setIsOperation(false);
  }, [editing, isOperation]);

  if (!data) {
    return (
      <div className="pl-4 pr-4">
        <p className="text-xl">使用者留言紀錄正在加載中...</p>
      </div>
    );
  }

  return (
    <div className="pl-4 pr-4 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.length !== 0 ? (
          data.map((content, index) => (
            <div
              key={`${index}-${content.username || content.displayName}`}
              className="duration-200 hover:scale-105"
              onClick={
                () => setExpanded(expanded === index ? null : index) // 切換展開的狀態
              }
            >
              <div className="border border-gray-300 rounded-lg shadow-md bg-white">
                <div className="flex justify-end p-1.5 items-center border-b-slate-600 border-2 bg-slate-100 opacity-75">
                  <div className="relative group mr-2">
                    <Image
                      src="/msg-edit.png"
                      alt="edit"
                      width={28}
                      height={28}
                      className="hover:cursor-pointer hover:scale-105"
                      onClick={() => {
                        handleMsgEdit(index, content.message);
                      }}
                    />
                    <span className="absolute top-full -left-1 mt-1 whitespace-nowrap text-black text-sm bg-slate-200 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      編輯
                    </span>
                  </div>

                  <div className="relative group mr-1">
                    <Image
                      src="/msg-delete.png"
                      alt="msg-delete"
                      width={28}
                      height={28}
                      className="hover:cursor-pointer hover:scale-105"
                      onClick={() => setDeleteDialog(content.message)}
                    />
                    <span className="absolute top-full -left-1 mt-1 whitespace-nowrap text-black text-sm bg-slate-200 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      刪除
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 p-1 text-sm">
                    留言時間: {content.postDate}
                  </p>

                  <textarea
                    className="w-full p-1 text-base resize-none outline-none"
                    readOnly={!(editing === index)}
                    rows={editing === index ? 5 : 3}
                    placeholder="留言內容"
                    title=""
                    value={
                      editing === index
                        ? msgText?.changedText || content.message
                        : content.message
                    }
                    onChange={(e) =>
                      setMsgText({
                        index,
                        originalText: content.message,
                        changedText: e.target.value,
                      })
                    }
                  />
                  {editing === index && (
                    <div className="flex justify-end mt-1 ">
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600"
                        onClick={() => handleMsgChanged()}
                      >
                        儲存
                      </button>
                    </div>
                  )}

                  {content.updateDate &&
                    content.updateDate !== content.postDate && (
                      <p className="text-gray-600 p-0.5 text-sm">
                        更新時間:{content.updateDate}
                      </p>
                    )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl">您尚無任何留言紀錄</p>
        )}
      </div>
      {deleteDialog !== "" && (
        <ConfirmationDialog
          message={`確認是否刪除此條留言，刪除後無法復原`}
          onConfirm={() => {
            handleMsgDelete(deleteDialog);
            setDeleteDialog("");
          }}
          onCancel={() => setDeleteDialog("")}
        />
      )}
      {hint !== "" && (
        <p
          className={`bg-white text-xl font-bold rounded-2xl transition-opacity duration-500 pt-2 pb-2 pl-4 pr-4 ${
            status === 200 ? "text-green-400" : "text-red-400"
          } ${
            hintAnime ? "opacity-100" : "opacity-0"
          } absolute  left-1/2 transform -translate-x-1/2`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default MsgRecord;

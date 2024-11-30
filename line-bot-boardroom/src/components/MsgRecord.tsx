import React, { useState, useEffect } from "react";
import Image from "next/image";
import { userMsgRecord } from "@/services/boardroom/userRecord";

interface DataType {
  username: string | null;
  displayName: string | null;
  lineid: string | null;
  message: string;
  postDate: string;
  updateDate: string | null;
}

interface TextFormType {
  index: number;
  originalText: string;
  changedText: string;
}

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

  const [expanded, setExpanded] = useState<number | null>(null); // 紀錄展開的卡片索引
  const [editing, setEditing] = useState<number | null>(null);
  const [msgText, setMsgText] = useState<TextFormType | null>(null);

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
      setMsgText(null);
    }
  };

  const msgTextChange = () => {
    // 處理 form 更新的狀態
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
  }, [editing]);

  if (!data) {
    return (
      <div className="pl-4 pr-4">
        <p className="text-xl">使用者留言紀錄正在加載中...</p>
      </div>
    );
  }

  console.log("textarea text:", msgText);
  return (
    <div className="pl-4 pr-4">
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
    </div>
  );
};

export default MsgRecord;

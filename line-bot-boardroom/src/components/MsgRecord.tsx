import React, { useState, useEffect } from "react";
import { userMsgRecord } from "@/services/boardroom/userRecord";

interface DataType {
  username: string | null;
  displayName: string | null;
  lineid: string | null;
  message: string;
  postDate: string;
  updateDate: string | null;
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

  const getUserRecord = async () => {
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
  }, []);

  if (!data) {
    return (
      <div className="pl-4 pr-4">
        <p className="text-xl">使用者留言紀錄正在加載中...</p>
      </div>
    );
  }

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
              <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                <p className="text-gray-600 p-1 text-sm">
                  留言時間: {content.postDate}
                </p>
                <p
                  className={`p-1 text-base ${
                    expanded === index ? "" : "line-clamp-3"
                  }`}
                >
                  {content.message}
                </p>
                {content.updateDate &&
                  content.updateDate !== content.postDate && (
                    <p className="text-gray-600 p-0.5 text-sm">
                      更新時間:{content.updateDate}
                    </p>
                  )}
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

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
    <div className="border-2 border-black pl-4 pr-4">
      <div className="border-red-600 border-2">
        {data.length !== 0 ? (
          data.map((content, index) => (
            <div className="">
              <div className="delete-patch-div"></div>
              <div className="post-info">
                <p className="text-gray-600 p-0.5">
                  留言時間:{content.postDate}
                </p>
                <p className="p-1 text-base">{content.message}</p>
                {content.updateDate &&
                  content.updateDate !== content.postDate && (
                    <p className="text-gray-600 p-0.5 text-xs">
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

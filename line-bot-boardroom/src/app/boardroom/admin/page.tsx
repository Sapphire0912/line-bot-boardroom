"use client";

import React, { useState, useEffect } from "react";
import Search from "@/components/Search";
import Send from "@/components/Send";
import BoardContent from "@/components/BoardContent";
import { messageAPIs } from "@/services/boardroom/msgAPIs";
import { memberAPIs } from "@/services/boardroom/memberAPIs";
import Members from "@/components/Members";
interface DataType {
  username: string | null;
  displayName: string | null;
  message: string;
  postDate: string;
  updateDate: string | null;
}

interface MemberType {
  username: string | null;
  displayName: string | null;
}

const adminPage = () => {
  const [flag, setFlag] = useState<boolean>(false); // 若送出與查詢操作需要重新渲染留言板

  /* 處理前端取得資料邏輯 */
  const [data, setData] = useState<DataType[] | null>(null);
  const getBoardData = async () => {
    const response = await messageAPIs({
      method: "GET",
      username: null,
      displayName: null,
      userMsg: null,
    });
    if (response?.status === 200) {
      setData(response?.data);
    } else {
      setData(response?.message);
    }
  };

  const [memberData, setMemberData] = useState<MemberType[] | null>(null);
  const getMemberData = async () => {
    const response = await memberAPIs("admin");
    if (response.status === 200) {
      setMemberData(response.memberData);
    } else {
      setMemberData(response.message);
    }
  };
  /* End. */

  useEffect(() => {
    getBoardData();
    getMemberData();
    setFlag(false);
  }, [flag]);

  if (!data || data.length === 0 || !memberData || memberData.length === 0) {
    return (
      <section className="w-full flex m-2">
        <div className="min-h-screen flex-1 border border-black">
          <div>
            <Search isSubmit={setFlag} />
          </div>

          <div className="flex-2">
            <p className="text-lg">
              {memberData === null
                ? "成員資料正在加載中..."
                : "目前尚無任何成員"}
            </p>
          </div>
        </div>
        <div className="flex-3">
          <div className="min-h-screen flex flex-col">
            <div>
              <Search isSubmit={setFlag} />
            </div>

            <div className="flex-1">
              <p className="text-lg">
                {data === null ? "資料正在加載中..." : "目前尚無留言資料"}
              </p>
            </div>

            <div>
              <Send isSubmit={setFlag} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    // 需要 RWD
    <section className="w-full flex m-2">
      <div className="min-h-screen w-[30%] border-2 border-slate-400 rounded-lg bg-slate-100">
        <div className="flex items-center mt-2 ml-2 w-full">
          <p className="text-xl font-bold">
            留言板成員總數：{memberData.length} 人
          </p>
          {/* <Search isSubmit={setFlag} /> */}
        </div>

        <div className="flex-1 overflow-y-auto">
          {memberData.map((member, index) => (
            <Members
              key={`${member.username}-${index}`}
              username={member.username}
              displayName={member.displayName}
            />
          ))}
        </div>
      </div>
      <div className="w-[70%]">
        <div className="min-h-screen flex flex-col">
          <div>
            <Search isSubmit={setFlag} />
          </div>

          <div className="flex-1 overflow-y-auto">
            {data.map((content, index) => (
              <BoardContent
                key={`${index}`}
                username={content.username}
                displayName={content.displayName}
                userMsg={content.message}
                postDate={content.postDate}
                updateDate={content.updateDate}
              />
            ))}
          </div>

          <div>
            <Send isSubmit={setFlag} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default adminPage;

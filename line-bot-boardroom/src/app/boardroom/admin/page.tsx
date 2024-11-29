"use client";

import React, { useState, useEffect } from "react";
import Search from "@/components/Search";
import Send from "@/components/Send";
import BoardContent from "@/components/BoardContent";
import { messageAPIs } from "@/services/boardroom/msgAPIs";
import { memberAPIs } from "@/services/boardroom/memberAPIs";
import { searchAPI } from "@/services/boardroom/search";
import Members from "@/components/Members";

interface DataType {
  username: string | null;
  displayName: string | null;
  lineid: string | null;
  message: string;
  postDate: string;
  updateDate: string | null;
}

interface MemberType {
  username: string | null;
  displayName: string | null;
  lineid: string | null;
}
interface SearchInfoType {
  searchText: string;
  searchType: string;
}

const adminPage = () => {
  const [flag, setFlag] = useState<boolean>(false); // 若送出操作需要重新渲染留言板
  const [searchInfo, setSearchInfo] = useState<SearchInfoType>({
    searchText: "",
    searchType: "",
  }); // 若查詢操作需要呼叫 API

  /* 處理前端取得資料邏輯 */
  const [data, setData] = useState<DataType[] | null>(null);
  const [hint, setHint] = useState<string>("");

  const getBoardData = async () => {
    const response = await messageAPIs({
      method: "GET",
      username: null,
      displayName: null,
      lineid: null,
      userMsg: null,
    });
    if (response.status === 200) {
      setData(response.data);
    } else {
      setData([]);
      setHint(response.message);
    }
  };

  const [memberData, setMemberData] = useState<MemberType[] | null>(null);
  const [memberHint, setMemberHint] = useState<string>("");
  const getMemberData = async () => {
    const response = await memberAPIs("admin");
    if (response.status === 200) {
      setMemberData(response.memberData);
    } else {
      setMemberData([]);
      setMemberHint(response.message);
    }
  };

  const getSearchData = async () => {
    const response = await searchAPI(
      searchInfo.searchType,
      searchInfo.searchText
    );
    if (searchInfo.searchType === "member") {
      if (response.status === 200) {
        setMemberData(response.targetData);
      } else {
        setMemberData([]);
        setMemberHint(response.message);
      }
    } else {
      if (response.status === 200) {
        setData(response.targetData);
      } else {
        setData([]);
        setHint(response.message);
      }
    }
  };
  /* End. */

  useEffect(() => {
    if (searchInfo.searchText && searchInfo.searchType) {
      getSearchData();
    }
  }, [searchInfo]);

  useEffect(() => {
    getBoardData();
    getMemberData();
    setFlag(false);
  }, [flag]);

  if (!data || !memberData) {
    return (
      <section className="w-full flex m-2">
        <div className="min-h-screen w-[30%] border border-black">
          <div>
            <Search isOperation={setSearchInfo} searchType="member" />
          </div>

          <div className="flex-2">
            <p className="text-lg">成員資料正在加載中...</p>
          </div>
        </div>
        <div className="w-[70%]">
          <div className="min-h-screen flex flex-col">
            <div>
              <Search isOperation={setSearchInfo} searchType="message" />
            </div>

            <div className="flex-1">
              <p className="text-lg">資料正在加載中...</p>
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
        <div className="flex flex-col w-full pl-1 pr-1 border-2 border-red-200">
          <p className="text-xl font-bold pl-1">
            留言板成員總數：{memberData.length} 人
          </p>
          <Search isOperation={setSearchInfo} searchType="member" />
        </div>

        <div className="flex-1 overflow-y-auto">
          {memberData.length !== 0 ? (
            memberData.map((member, index) => (
              <Members
                key={`${
                  member.username !== null
                    ? member.username
                    : member.displayName
                }-${index}`}
                username={member.username}
                displayName={member.displayName}
                lineid={member.lineid}
              />
            ))
          ) : (
            <p className="text-lg pt-1 pb-1 pl-4 pr-4">{memberHint}</p>
          )}
        </div>
      </div>
      <div className="w-[70%]">
        <div className="min-h-screen flex flex-col">
          <div className="sticky top-0 z-10">
            <Search isOperation={setSearchInfo} searchType="message" />
          </div>

          <div className="flex-1 overflow-y-auto">
            {data.length !== 0 ? (
              data.map((content, index) => (
                <BoardContent
                  key={`${index}`}
                  username={content.username}
                  displayName={content.displayName}
                  userMsg={content.message}
                  postDate={content.postDate}
                  updateDate={content.updateDate}
                />
              ))
            ) : (
              <p className="text-lg p-1">{hint}</p>
            )}
          </div>

          <div className="sticky bottom-0 z-10">
            <Send isSubmit={setFlag} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default adminPage;

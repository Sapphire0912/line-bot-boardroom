import React, { useState, useEffect } from "react";
import { searchAPI } from "@/services/boardroom/search";

// 任何與留言紀錄相關的操作皆在此處

const MsgRecord = ({
  username,
  displayName,
}: {
  username: string | null;
  displayName: string | null;
}) => {
  // searchAPI("message", "@{username || displayName}")
  return (
    <div className="border-2 border-black pl-4 pr-4">
      MsgRecord
      <div></div>
    </div>
  );
};

export default MsgRecord;

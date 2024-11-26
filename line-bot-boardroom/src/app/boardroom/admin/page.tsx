import React from "react";
import Search from "@/components/Search";
import Send from "@/components/Send";

const adminPage = () => {
  return (
    <section className="w-full flex border-2 border-black m-6">
      <div className="member-div flex-1 border-2 border-red-400">
        Member section
      </div>
      <div className="boardroom-div flex-1 border-2 border-purple-900">
        <Search />
        <div className="">adminPage: main message area</div>
        <Send />
      </div>
    </section>
  );
};

export default adminPage;

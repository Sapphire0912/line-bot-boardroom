import React from "react";
import Search from "@/components/Search";
import Send from "@/components/Send";

const userPage = () => {
  return (
    <section className="w-[80%]">
      <Search />
      <div>UserPage: main message area</div>
      <Send />
    </section>
  );
};

export default userPage;

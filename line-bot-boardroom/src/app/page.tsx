import React from "react";
import Title from "@/components/Title";
import Login from "@/components/Login";

const page = () => {
  return (
    <section className="min-h-screen flex flex-col">
      <Title />
      <div className="flex flex-grow justify-center items-center">
        <Login />
      </div>
    </section>
  );
};

export default page;

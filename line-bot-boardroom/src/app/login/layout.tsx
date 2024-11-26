import React from "react";
import Title from "@/components/title";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Title />
      <section className="min-h-screen flex flex-col">
        <div className="flex flex-grow justify-center items-center">
          {children}
        </div>
      </section>
    </section>
  );
}

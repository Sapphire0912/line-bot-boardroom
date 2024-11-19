import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex flex-grow justify-center items-center">
        {children}
      </div>
    </section>
  );
}

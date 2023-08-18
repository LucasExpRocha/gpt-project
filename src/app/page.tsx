"use client";

import { Aside } from "@/components/Aside";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";

const Page = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex mx-auto max-w-7xl">
        <Aside />
        <div className="flex flex-col w-full max-h-vh-max-120">
          <Header />
          <main className="px-4 py-2">
            <textarea className="w-full min-h-vh-minus-200 resize-none bg-transparent p-2" defaultValue={"Lorem"} />
          </main>
        </div>
      </div>
    </div>
  );
};
export default Page;

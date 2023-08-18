"use client";

import { Aside } from "@/components/Aside";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";

type MyTranscriptions = {
  [key: string]: string;
}

const transcricoes: MyTranscriptions = {
  "1s": "aaaa",
  "2s": "bbbb",
  "3s": "cccc",
  "4s": "dddd",
  "5s": "eeee",
  "6s": "ffff",
  "7s": "gggg",
  "8s": "hhhh",
  "9s": "iiii",
  "10s": "jjjj",
  "11s": "kkkk",
  "12s": "llll",
  "13s": "mmmm",
  "14s": "nnnn",
  "15s": "oooo",
  "16s": "pppp",
  "17s": "qqqq",
  "18s": "rrrr",
  "19s": "ssss",
  "20s": "tttt",
  "21s": "uuuu",
  "22s": "vvvv",
  "23s": "wwww",
  "24s": "xxxx",
  "25s": "yyyy",
  "26s": "zzzz",
};

const Page = () => {
  const [selected, setSelected] = useState("");
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex mx-auto max-w-7xl">
        <Aside
          transcriptions={transcricoes}
          setSelectTranscription={setSelected}
          selected={selected}
        />
        <div className="flex flex-col w-full max-h-vh-max-120">
          <Header />
          <main className="px-4 py-2">
            <textarea
              className="w-full min-h-vh-minus-200 resize-none bg-transparent p-2"
              defaultValue={transcricoes[selected] || ""}
            />
          </main>
        </div>
      </div>
    </div>
  );
};
export default Page;

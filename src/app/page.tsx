"use client";

import { Aside } from "@/components/Aside";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { conceptsDDD } from "@/utils/conceptsDDD";
import { useEffect, useState } from "react";

type MyTranscriptions = {
  [key: string]: string;
};

const Page = () => {
  const [selected, setSelected] = useState("");
  const [teste, setTeste] = useState("");
  const [transcriptionsList, setTranscriptionsList] =
    useState<MyTranscriptions>({});

  useEffect(() => {
    setTeste(transcriptionsList[selected]);
  }, [selected, transcriptionsList]);

  const handleChangeSelectedValue = (value: string) => {
    setTeste(value);
    transcriptionsList[selected] = value;
  };

  const handleGenerateProposal = () => {
    if (selected === "") return;
    const text = localStorage.getItem("promptDDD") + "\n" + teste;
    const filename = `${selected}.txt`;
    const blob = new Blob([text], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    link.click();

    URL.revokeObjectURL(link.href);
  };

  useEffect(() => {
    localStorage.setItem("promptDDD", conceptsDDD);
    setTranscriptionsList(
      JSON.parse(localStorage.getItem("transcriptions") || "{}")
    );
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex mx-auto max-w-7xl">
        <Aside
          transcriptions={transcriptionsList}
          setSelectTranscription={setSelected}
          selected={selected}
        />
        <div className="flex flex-col w-full max-h-vh-max-120">
          <Header generateProposal={handleGenerateProposal} />
          <main className="px-4 py-2">
            <textarea
              className="w-full min-h-vh-minus-200 resize-none bg-transparent p-2"
              value={teste}
              onChange={({ target }) => handleChangeSelectedValue(target.value)}
            />
          </main>
        </div>
      </div>
    </div>
  );
};
export default Page;

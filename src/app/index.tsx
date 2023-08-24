"use client";

import { Aside } from "@/components/Aside";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { conceptsDDD } from "@/utils/conceptsDDD";
import { useEffect, useState } from "react";

export type MyTranscriptions = {
  [key: string]: string;
};

const Page = () => {
  const [selected, setSelected] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  const [transcriptionsList, setTranscriptionsList] =
    useState<MyTranscriptions>({});
  const [saveButton, setSaveButton] = useState(false);

  const handleChangeSelectedValue = (value: string) => {
    setSelectedContent(value);
    transcriptionsList[selected] = value;
    setSaveButton(true);
  };

  const handleGenerateProposal = () => {
    if (selected === "") return;
    const text =
      localStorage.getItem("promptDDD") +
      "\n" +
      selectedContent +
      "\n" +
      "Monte a resposta em markdown.";
    const filename = `${selected}.txt`;
    const blob = new Blob([text], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    link.click();

    URL.revokeObjectURL(link.href);
  };

  const getTranscriptions = () => {
    setTranscriptionsList(
      JSON.parse(localStorage.getItem("transcriptions") || "{}")
    );
  };

  const handleSaveContentChanges = () => {
    localStorage.setItem("transcriptions", JSON.stringify(transcriptionsList));
  }

  useEffect(() => {
    setSelectedContent(transcriptionsList[selected]);
    setSaveButton(false);
    getTranscriptions();
  }, [selected]);

  useEffect(() => {
    localStorage.setItem("promptDDD", conceptsDDD);
    getTranscriptions();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex mx-auto max-w-7xl">
        <Aside
          transcriptions={transcriptionsList}
          setTranscriptions={setTranscriptionsList}
          setSelectTranscription={setSelected}
          selected={selected}
        />
        <div className="flex flex-col w-full max-h-vh-max-120">
          <Header generateProposal={handleGenerateProposal} />
          <main className="px-4 py-2">
            <textarea
              className="w-full min-h-vh-minus-200 resize-none bg-transparent p-2"
              value={selectedContent}
              onChange={({ target }) => handleChangeSelectedValue(target.value)}
            />
            {saveButton && (
              <button 
              onClick={handleSaveContentChanges}
              className="rounded bg-green-700 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Salvar Alterações
              </button>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
export default Page;

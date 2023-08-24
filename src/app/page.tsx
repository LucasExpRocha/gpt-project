"use client";

import { Aside } from "@/components/Aside";
import { AsideProposal } from "@/components/AsideProposal";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { Navbar } from "@/components/Navbar";
import { SavedMessage } from "@/components/SaveMessage";
import { ButtonGPT } from "@/components/buttonGPT";
import { CircleAnimated } from "@/components/circleAnimated";
import { api } from "@/services/api";
import { conceptsDDD } from "@/utils/conceptsDDD";
import {
  CaretDoubleRight,
  Checks,
  ClipboardText,
  MusicNotes,
  TextT,
  X,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export type MyTranscriptions = {
  [key: string]: { name: string; content: string };
};

const Page = () => {
  const [openCorrection, setOpenCorrection] = useState(false);
  const [openTranscription, setOpenTranscription] = useState(false);
  const [openProposal, setOpenProposal] = useState(false);
  const [optionFileSelected, setOptionFileSelected] = useState("url");

  const [selectTranscriptionProposal, setSelectTranscriptionProposal] =
    useState<string[]>([]);
  const [
    selectTranscriptionProposalContent,
    setSelectTranscriptionProposalContent,
  ] = useState<string>("");

  const [urlToVideo, setUrlToVideo] = useState("");
  const [awaiting, setAwaiting] = useState(false);

  const [selected, setSelected] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  const [transcriptionsList, setTranscriptionsList] =
    useState<MyTranscriptions>({});
  const [saveButton, setSaveButton] = useState(false);

  const handleChangeSelectedValue = (value: string) => {
    setSelectedContent(value);
    transcriptionsList[selected] = {
      ...transcriptionsList[selected],
      content: value,
    };
  };

  const handleOpenCorrection = () => setOpenCorrection(!openCorrection);
  const handleOpenTranscription = () =>
    setOpenTranscription(!openTranscription);
  const handleOpenProposal = () => setOpenProposal(!openProposal);
  const handleChangeOptionFileSelected = () =>
    setOptionFileSelected(optionFileSelected === "url" ? "file" : "url");

  const handleSelectTranscriptionProposal = (key: string) => {
    if (selectTranscriptionProposal.includes(key)) {
      setSelectTranscriptionProposal(
        selectTranscriptionProposal.filter((item) => item !== key)
      );
      selectTranscriptionProposal.map((key) => {});

      return;
    }
    setSelectTranscriptionProposal([...selectTranscriptionProposal, key]);
  };

  const getTranscriptions = () => {
    setTranscriptionsList(
      JSON.parse(localStorage.getItem("transcriptions") || "{}")
    );
  };

  const handleSaveContentChanges = () => {
    localStorage.setItem("transcriptions", JSON.stringify(transcriptionsList));
    setSaveButton(true);

    setTimeout(() => {
      setSaveButton(false);
    }, 1000);
  };

  const handleSendRoute = async () => {
    if (urlToVideo === "") return;

    setAwaiting(true);
    try {
      let transcribe;
      if (optionFileSelected === "file") {
        transcribe = await api.post("/speech/transcribe/upload", {
          fileName: "",
        });
      } else {
        transcribe = await api.post("/speech/transcribe/meetings", {
          fileName: urlToVideo,
        });
      }
      const othersTranscriptions = localStorage.getItem("transcriptions");
      const newTranscriptions = {
        ...JSON.parse(othersTranscriptions || "{}"),
        [urlToVideo]: {
          name: [urlToVideo],
          content: transcribe.data.transcription,
        },
      };
      localStorage.setItem("transcriptions", JSON.stringify(newTranscriptions));
    } catch (error) {
      console.log(error);
    } finally {
      setAwaiting(false);
    }
  };

  const handleChangeNameTranscription = (key: string, name: string) => {
    const newTranscriptions = JSON.parse(
      localStorage.getItem("transcriptions") || "{}"
    );
    newTranscriptions[key].name = name;
    localStorage.setItem("transcriptions", JSON.stringify(newTranscriptions));
    setTranscriptionsList(newTranscriptions);
  };

  useEffect(() => {
    setSelectTranscriptionProposalContent(
      selectTranscriptionProposal
        .map((item) => transcriptionsList[item].content)
        .join("\n")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectTranscriptionProposal]);

  useEffect(() => {
    if (!Boolean(selected)) return;
    if (!Boolean(selected)) return;
    const transcriptions: MyTranscriptions = JSON.parse(
      localStorage.getItem("transcriptions") || "{}"
    );
    setTranscriptionsList(transcriptions);
    setSelectedContent(transcriptions[selected]?.content);
  }, [selected]);

  useEffect(() => {
    localStorage.setItem("promptDDD", conceptsDDD);
    getTranscriptions();
  }, []);

  return (
    <main className="h-screen">
      <Navbar />
      <section className="flex justify-center items-center min-h-vh-minus-120 gap-20">
        <button
          onClick={handleOpenTranscription}
          className="w-48 h-60 rounded-lg flex flex-col justify-center items-center bg-cyan-600 shadow-md shadow-cyan-600/50 gap-6 hover:scale-105"
        >
          <span className="text-white font-semibold">Transcrever Áudio</span>
          <div className="flex items-center gap-2">
            <MusicNotes size={32} color="white" />
            <CaretDoubleRight size={16} color="white" />
            <TextT size={32} color="white" />
          </div>
        </button>
        <button
          onClick={handleOpenCorrection}
          className="w-48 h-60 rounded-lg flex flex-col justify-center items-center  bg-blue-500 shadow-md shadow-blue-500/50 gap-6 hover:scale-105"
        >
          <span className="text-white font-semibold">
            Analisar Transcrições
          </span>
          <div className="flex items-center gap-2">
            <TextT size={32} color="white" />
            <CaretDoubleRight size={16} color="white" />
            <Checks size={32} color="white" />
          </div>
        </button>
        <button
          onClick={handleOpenProposal}
          className="w-48 h-60 rounded-lg flex flex-col justify-center items-center bg-indigo-500 shadow-md shadow-indigo-500/50 gap-6 hover:scale-105"
        >
          <span className="text-white font-semibold">
            Aplicar conceitos de DDD
          </span>
          <div className="flex items-center gap-2">
            <Checks size={32} color="white" />
            <CaretDoubleRight size={16} color="white" />
            <ClipboardText size={32} color="white" />
          </div>
        </button>
      </section>
      {openTranscription && (
        <Modal
          closeModal={handleOpenTranscription}
          isOpen={openTranscription}
          tailwindCss="max-w-2xl"
        >
          <form className="space-y-6" action="#" method="POST">
            <div className="flex justify-between">
              <button
                className={
                  (optionFileSelected === "url"
                    ? "border-b-2 border-x-cyan-100"
                    : "border-b-0") + " mx-auto h-full w-full pb-2"
                }
                onClick={handleChangeOptionFileSelected}
              >
                URL
              </button>
              <button
                className={
                  (optionFileSelected === "file"
                    ? "border-b-2 border-x-cyan-100"
                    : "border-b-0") + " mx-auto h-full w-full pb-2"
                }
                onClick={handleChangeOptionFileSelected}
                disabled={true}
              >
                ARQUIVO
              </button>
            </div>

            {optionFileSelected === "file" ? (
              <>
                <label
                  htmlFor="routeToVideo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Selecione o Video
                </label>
                <input
                  id="routeToVideo"
                  name="routeToVideo"
                  type="file"
                  accept=".flac"
                  placeholder="ex: gs://irsnbucket/nomevideo.flac"
                  className="block w-full rounded-md p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </>
            ) : (
              <>
                <label
                  htmlFor="routeToVideo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Informe a rota do video
                </label>
                <input
                  id="routeToVideo"
                  name="routeToVideo"
                  placeholder="ex: gs://irsnbucket/nomevideo.flac"
                  value={urlToVideo}
                  onChange={({ target }) => setUrlToVideo(target.value)}
                  className="block w-full rounded-md p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </>
            )}

            <button
              onClick={handleSendRoute}
              disabled={awaiting || urlToVideo === ""}
              className="rounded bg-slate-600 bg-opacity-80 px-4 py-2 text-sm font-medium disabled:bg-opacity-30 text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              {awaiting ? (
                <>
                  <CircleAnimated />
                  Transcrevendo...
                </>
              ) : (
                "Salvar"
              )}
            </button>
            <button
              onClick={handleOpenTranscription}
              className="rounded bg-red-600 ml-2 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Fechar
            </button>
          </form>
        </Modal>
      )}
      {openCorrection && (
        <Modal isOpen={openCorrection} closeModal={handleOpenCorrection}>
          <div className="flex mx-auto ">
            <Aside
              changeNameTranscription={handleChangeNameTranscription}
              transcriptions={transcriptionsList}
              setSelectTranscription={setSelected}
              selected={selected}
            />
            <div className="flex flex-col w-full max-h-vh-max-120">
              <Header
                closeModal={handleOpenCorrection}
                onClickButtonSave={handleSaveContentChanges}
                showButtonSave={saveButton}
              />
              <main className="px-4 py-2 my-auto">
                <textarea
                  className="w-full min-h-vh-minus-200 resize-none bg-transparent p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                  value={selectedContent}
                  disabled={selected === ""}
                  onChange={({ target }) =>
                    handleChangeSelectedValue(target.value)
                  }
                  spellCheck={true}
                  lang="pt-BR"
                />
              </main>
            </div>
          </div>
        </Modal>
      )}
      {openProposal && (
        <Modal isOpen={openProposal} closeModal={handleOpenProposal}>
          <button
            onClick={handleOpenProposal}
            className="absolute right-0 top-0 rounded-bl-2xl bg-red-600 p-1 hover:cursor-pointer hover:scale-105 hover:opacity-30"
          >
            <X size={24} color="white" />
          </button>
          <div className="flex mx-auto gap-2 mt-2">
            <AsideProposal
              transcriptions={transcriptionsList}
              setSelectTranscription={handleSelectTranscriptionProposal}
              selected={selectTranscriptionProposal}
            />

            <section className="flex w-full gap-4">
              <fieldset className="mx-auto rounded h-full border-solid border-2 border-slate-400 w-full">
                <legend className="text-base font-semibold leading-6 text-gray-700 top-[-10px] bg-gradient-to-t mx-2 px-2">
                  Textos Selecionados
                </legend>
                <textarea
                  value={selectTranscriptionProposalContent}
                  className="w-full h-full resize-none bg-transparent p-2 focus:outline-none focus:ring-0 focus:ring-gray-300 focus:border-transparent"
                />
                <span className="text-sm font-light">
                  {
                    (
                      conceptsDDD +
                      selectTranscriptionProposalContent +
                      "Gostaria que você utilizasse os princípios de DDD - Domain Driven Design para encontrar as entidades e casos de usos da solicitação do cliente em markdown para JavaScript."
                    ).split(" ").length
                  }{" "}
                  palavra(s).
                </span>
              </fieldset>
              <div className="flex flex-col min-w-[150px] justify-center items-center gap-2">
                <ButtonGPT
                  text={"Aplicar"}
                  onClick={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
                <CaretDoubleRight size={32} />
              </div>
              <fieldset className="mx-auto w-full rounded h-full border-solid border-2 border-slate-400">
                <legend className="text-base font-semibold leading-6 text-gray-700 top-[-10px] bg-gradient-to-t mx-2 px-2">
                  Entidades e Casos de Uso
                </legend>
                <textarea className="w-full h-full resize-none bg-transparent p-2 focus:outline-none focus:ring-0 focus:ring-gray-300 focus:border-transparent" />
              </fieldset>
            </section>
          </div>
        </Modal>
      )}
      {saveButton && <SavedMessage />}
    </main>
  );
};
export default Page;

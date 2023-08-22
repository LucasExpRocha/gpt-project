import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Modal } from "./Modal";
import axios from "axios";
import { CircleAnimated } from "./circleAnimated";
import { api } from "@/services/api";
import { MyTranscriptions } from "@/app/page";

interface Props {
  transcriptions: { [key: string]: string };
  setTranscriptions: Dispatch<SetStateAction<MyTranscriptions>>;
  setSelectTranscription: Dispatch<SetStateAction<string>>;
  selected: string;
}

export const Aside = ({
  transcriptions,
  setTranscriptions,
  setSelectTranscription,
  selected,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [routeToVideo, setRouteToVideo] = useState("");
  const [routeToVideoBase64, setRouteToVideoBase64] = useState("");
  const [awaiting, setAwaiting] = useState(false);
  const [optionFileSelected, setOptionFileSelected] = useState("file");

  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleOptionFileSelected = () => setOptionFileSelected("file");
  const handleOptionUrlSelected = () => setOptionFileSelected("url");

  const handleSelectTranscription = ({ target }: any) => {
    setSelectTranscription(target.innerText);
  };

  const handleFileChange = async ({ target }: any) => {
    const file = target.files[0];

    if (file.type === "audio/flac") {
      const reader = new FileReader();

      console.log(reader)

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        setRouteToVideoBase64(result.split(',')[1]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSendRoute = async () => {
    if (routeToVideo === "") return;

    setAwaiting(true);
    try {
      let transcribe;
      if (optionFileSelected === "file") {
        transcribe = await api.post("/speech/transcribe/upload", {
          fileName: routeToVideoBase64,
        });
      } else {
        transcribe = await api.post("/speech/transcribe/meetings", {
          fileName: routeToVideo,
        });
      }
      const othersTranscriptions = localStorage.getItem("transcriptions");
      const newTranscriptions = {
        ...JSON.parse(othersTranscriptions || "{}"),
        [routeToVideo]: transcribe.data.transcription,
      };
      localStorage.setItem("transcriptions", JSON.stringify(newTranscriptions));
      setTranscriptions(newTranscriptions);
    } catch (error) {
      console.log(error);
    } finally {
      setAwaiting(false);
    }
  };

  return (
    <aside className="min-h-vh-minus-120">
      <fieldset className="mx-auto w-72 rounded h-full border-solid border-2 border-slate-400">
        <legend className="text-base font-semibold leading-6 text-gray-700 top-[-10px] bg-gradient-to-t mx-2 px-2">
          Transcrições
        </legend>
        <div className="flex flex-col justify-between h-full">
          <ul className="max-h-vh-aside overflow-y-auto">
            {transcriptions ? (
              Object.keys(transcriptions).map((key) => {
                return (
                  <li
                    key={key}
                    onClick={handleSelectTranscription}
                    className={
                      selected === key
                        ? "bg-zinc-300 px-6 py-1"
                        : "bg-transparent px-6 py-1"
                    }
                  >
                    {key}
                  </li>
                );
              })
            ) : (
              <li>Vazio</li>
            )}
          </ul>
          <button
            type="button"
            onClick={handleOpenModal}
            className="w-full rounded bg-slate-600 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Selecionar Video
          </button>
        </div>
      </fieldset>
      <Modal
        closeModal={handleCloseModal}
        isOpen={isOpen}
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
              onClick={handleOptionUrlSelected}
            >
              URL
            </button>
            <button
              className={
                (optionFileSelected === "file"
                  ? "border-b-2 border-x-cyan-100"
                  : "border-b-0") + " mx-auto h-full w-full pb-2"
              }
              onClick={handleOptionFileSelected}
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
                onChange={handleFileChange}
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
                value={routeToVideo}
                onChange={({ target }) => setRouteToVideo(target.value)}
                className="block w-full rounded-md p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </>
          )}

          <button
            onClick={handleSendRoute}
            disabled={awaiting || (routeToVideo === "" && routeToVideoBase64 === "")}
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
            onClick={handleCloseModal}
            className="rounded bg-red-600 ml-2 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Fechar
          </button>
        </form>
      </Modal>
    </aside>
  );
};

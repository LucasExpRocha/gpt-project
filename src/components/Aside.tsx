import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Modal } from "./Modal";
import axios from "axios";
import { CircleAnimated } from "./circleAnimated";

interface Props {
  transcriptions: { [key: string]: string };
  setSelectTranscription: Dispatch<SetStateAction<string>>;
  selected: string;
}

export const Aside = ({
  transcriptions,
  setSelectTranscription,
  selected,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [routeToVideo, setRouteToVideo] = useState("");
  const [awaiting, setAwaiting] = useState(false);
  const [transcription, setTranscription] = useState("");

  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = () => setIsOpen(true);

  const handleSelectTranscription = ({ target }: any) => {
    setSelectTranscription(target.innerText);
  };

  const handleSendRoute = async () => {
    if (routeToVideo === "") return;

    setAwaiting(true);
    try {
      const transcribe = await axios.post(
        "http://localhost:8080/speech/transcribe/meetings",
        {
          fileName: routeToVideo,
        }
      );
      setTranscription(transcribe.data.transcription);
      const othersTranscriptions = localStorage.getItem("transcriptions");
      const newTranscriptions = {
        ...JSON.parse(othersTranscriptions || "{}"),
        [routeToVideo]: transcribe.data.transcription,
      };
      localStorage.setItem("transcriptions", JSON.stringify(newTranscriptions));
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
          <div>
            <label
              htmlFor="routeToVideo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Informe a rota do video
            </label>
            <div className="mt-2">
              <input
                id="routeToVideo"
                name="routeToVideo"
                type="routeToVideo"
                placeholder="ex: gs://irsnbucket/nomevideo.flac"
                value={routeToVideo}
                onChange={({ target }) => setRouteToVideo(target.value)}
                className="block w-full rounded-md p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            onClick={handleSendRoute}
            disabled={awaiting}
            className="rounded bg-slate-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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

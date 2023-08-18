import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Modal } from "./Modal";
import axios from "axios";

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

  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = () => setIsOpen(true);

  // const [transcription, setTranscription] = useState("");
  // const [listening, setListening] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // const createRecognition = () => {
  //   const SpeechRecognition =
  //     window.SpeechRecognition || window.webkitSpeechRecognition;
  //   const recognition =
  //     SpeechRecognition !== undefined ? new SpeechRecognition() : null;

  //   if (!recognition) {
  //     return;
  //   }
  //   recognition.lang = "pt-BR";

  //   recognition.onstart = () => setListening(true);
  //   recognition.onend = () => setListening(false);
  //   recognition.onerror = (event) => console.log("error", event);
  //   recognition.onresult = (event) => {
  //     const current = event.resultIndex;
  //     const transcript = event.results[current][0].transcript;
  //     setTranscription(transcript);
  //     console.log(transcript);
  //   };

  //   return recognition;
  // };

  // const recognition = createRecognition();

  const handleFileChange = ({ target }: any) => {
    const file = target.files[0];
    setSelectedFile(file);
  };

  const handleSelectTranscription = ({ target }: any) =>
    setSelectTranscription(target.innerText);

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
      <Modal closeModal={handleCloseModal} isOpen={isOpen}>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-center text-lg">Transcrição de Áudio</h3>
          {/* <button
            onClick={() => {
              if (!recognition) return;
              setListening(false);
              listening ? recognition.stop() : recognition.start();
            }}
          >
            recognition
          </button> */}
          <input type="file" accept=".flac, .wav" onChange={handleFileChange} />
        </div>
        <div className="flex justify-center mt-4">
          <button className="rounded bg-slate-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Transcrever
          </button>
          <button
            onClick={handleCloseModal}
            className="rounded bg-red-600 ml-2 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </aside>
  );
};

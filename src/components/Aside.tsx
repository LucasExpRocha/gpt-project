import { useRef, useState } from "react";
import { Modal } from "./Modal";
import axios from "axios";

const transcricoes = {
  "1": "aaaa",
  "2": "bbbb",
  "3": "cccc",
  "4": "dddd",
  "5": "eeee",
  "6": "ffff",
  "7": "gggg",
  "8": "hhhh",
  "9": "iiii",
  "10": "jjjj",
  "11": "kkkk",
  "12": "llll",
  "13": "mmmm",
  "14": "nnnn",
  "15": "oooo",
  "16": "pppp",
  "17": "qqqq",
  "18": "rrrr",
  "19": "ssss",
  "20": "tttt",
  "21": "uuuu",
  "22": "vvvv",
  "23": "wwww",
  "24": "xxxx",
  "25": "yyyy",
  "26": "zzzz",
};

export const Aside = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = () => setIsOpen(true);

  const [transcription, setTranscription] = useState("");
  const [listening, setListening] = useState(false);

  const createRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition =
      SpeechRecognition !== undefined ? new SpeechRecognition() : null;

    if (!recognition) {
      return;
    }
    recognition.lang = "pt-BR";

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (event) => console.log("error", event);
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscription(transcript);
      console.log(transcript);
    };

    return recognition;
  };

  const recognition = createRecognition();

  return (
    <aside className="min-h-vh-minus-120">
      <fieldset className="mx-auto w-72 rounded h-full border-solid border-2 border-slate-400">
        <legend className="text-base font-semibold leading-6 text-gray-700 top-[-10px] bg-gradient-to-t mx-2 px-2">
          Transcrições
        </legend>
        <div className="flex flex-col justify-between h-full">
          <ul className="py-2 sm:px-6 lg:px-8 max-h-vh-aside overflow-y-scroll">
            {Object.keys(transcricoes).map((key) => {
              return <li key={key}>{key}</li>;
            })}
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
        <div className="flex flex-col">
          <p>{listening ? "escutando" : "parado"}</p>
          <button
            onClick={() => {
              if (!recognition) return;
              setListening(false);
              listening ? recognition.stop() : recognition.start();
            }}
          >
            recognition
          </button>
          <p>{transcription}</p>
        </div>
      </Modal>
    </aside>
  );
};

import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { SavedMessage } from "./SaveMessage";

interface Props {
  generateProposal: () => void;
}

export const Header = ({ generateProposal }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dddValue, setDddValue] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = () => setIsOpen(true);

  const handleChangePromptDDD = ({ target }: any) => setDddValue(target.value);
  const handleSavePromptDDD = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1500);
    localStorage.setItem("promptDDD", dddValue);
  };

  useEffect(() => {
    setDddValue(localStorage.getItem("promptDDD") || "");
  }, []);

  return (
    <header className="flex justify-between max-w-4xl w-full mx-auto my-2">
      <button
        onClick={handleOpenModal}
        className="rounded bg-slate-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Prompt DDD
      </button>
      <button
        onClick={generateProposal}
        className="rounded bg-slate-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Gerar Proposta
      </button>
      <Modal
        closeModal={handleCloseModal}
        isOpen={isOpen}
        tailwindCss="max-w-6xl"
      >
        <textarea
          className="w-full min-h-vh-minus-200 min-max-w-7xl resize-none bg-transparent p-2"
          onChange={handleChangePromptDDD}
          defaultValue={dddValue}
        />
        <button
          onClick={handleSavePromptDDD}
          className="rounded bg-slate-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Salvar
        </button>
        <button
          onClick={handleCloseModal}
          className="rounded bg-red-600 ml-2 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Fechar
        </button>
      </Modal>
      {showMessage && <SavedMessage />}
    </header>
  );
};

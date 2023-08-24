import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { SavedMessage } from "./SaveMessage";
import { ArrowLeft } from "@phosphor-icons/react";
import { ButtonGPT } from "./buttonGPT";

interface Props {
  closeModal: () => void;
  showButtonSave: boolean;
  onClickButtonSave: () => void;
}

export const Header = ({
  closeModal,
  showButtonSave,
  onClickButtonSave,
}: Props) => {
  return (
    <header className="flex justify-between items-center max-w-6xl w-full mx-auto my-2">
      {showButtonSave ? (
        <button
          onClick={onClickButtonSave}
          className="rounded bg-green-600 bg-opacity-80 px-4 h-[30px] text-sm font-medium text-white hover:scale-105 hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Salvar Alterações
        </button>
      ) : (
        <span className="w-[150px]"></span>
      )}
      <ButtonGPT text="Corrigir Texto" onClick={closeModal} />
      <button
        onClick={closeModal}
        className="flex items-center gap-1 text-red-600 underline underline-offset-4 hover:scale-105"
      >
        <ArrowLeft size={14} />
        <span>Retornar</span>
      </button>
    </header>
  );
};

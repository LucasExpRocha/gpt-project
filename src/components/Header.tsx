import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { SavedMessage } from "./SaveMessage";
import { ArrowLeft, X } from "@phosphor-icons/react";
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
    <header className="flex justify-between items-center max-w-6xl w-full mx-auto mt-2">
      <button
        onClick={onClickButtonSave}
        className="rounded bg-green-600 bg-opacity-80 px-4 h-[30px] text-sm font-medium text-white hover:scale-105 hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Salvar Alterações
      </button>

      <button
        onClick={closeModal}
        className="absolute right-0 top-0 rounded-bl-2xl bg-red-600 p-1 hover:cursor-pointer hover:scale-105 hover:opacity-30"
      >
        <X size={24} color="white" />
      </button>
    </header>
  );
};

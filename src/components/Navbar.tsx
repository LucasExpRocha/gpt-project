import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { Dialog } from "@headlessui/react";
import { SavedMessage } from "./SaveMessage";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiGptToken, setApiGptToken] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = () => setIsOpen(true);

  const handleSaveTokenGPT = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1500);
    localStorage.setItem("tokenValue", apiGptToken);
  };

  useEffect(() => {
    setApiGptToken(localStorage.getItem("tokenValue") || "");
  }, []);

  return (
    <nav className="">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <img
            className="h-8 w-auto"
            src="https://arphoenix.com.br/wp-content/uploads/2021/06/arp_logo.png"
            alt="ARPhoenix"
          />
          <button
            type="button"
            className="rounded-lg bg-slate-600 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={handleOpenModal}
          >
            ADICIONAR TOKEN
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={handleCloseModal} tailwindCss="max-w-2xl">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="tokenChatGPT"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Token ChatGPT
            </label>
            <div className="mt-2">
              <input
                id="tokenChatGPT"
                name="tokenChatGPT"
                type="tokenChatGPT"
                placeholder="Token ChatGPT"
                value={apiGptToken}
                onChange={({ target }) => setApiGptToken(target.value)}
                className="block w-full rounded-md p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            onClick={handleSaveTokenGPT}
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
        </form>
      </Modal>
      {showMessage && <SavedMessage />}
    </nav>
  );
};

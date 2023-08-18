import { useState } from "react";
import { Modal } from "./Modal";
import { Dialog } from "@headlessui/react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = () => setIsOpen(true);

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
      <Modal isOpen={isOpen} closeModal={handleCloseModal}>
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
                className="block w-full rounded-md p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
               />
            </div>
          </div>
        </form>
      </Modal>
    </nav>
  );
};

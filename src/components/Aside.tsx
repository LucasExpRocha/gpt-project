import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Modal } from "./Modal";
import axios from "axios";
import { CircleAnimated } from "./circleAnimated";
import { api } from "@/services/api";
import { MyTranscriptions } from "@/app/page";

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
  const handleSelectTranscription = ({ target }: any) => {
    setSelectTranscription(target.innerText);
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
                    className={`${
                      selected === key
                        ? "bg-zinc-300 px-6 py-1"
                        : "bg-transparent px-6 py-1"
                    }  block w-full cursor-pointer px-2 py-1 text-sm font-medium hover:text-gray-500 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out`}
                  >
                    {key}
                  </li>
                );
              })
            ) : (
              <li></li>
            )}
          </ul>
        </div>
      </fieldset>
    </aside>
  );
};

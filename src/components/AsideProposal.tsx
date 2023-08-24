import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Modal } from "./Modal";
import axios from "axios";
import { CircleAnimated } from "./circleAnimated";
import { api } from "@/services/api";
import { MyTranscriptions } from "@/app/page";

interface Props {
  transcriptions: { [key: string]: string };
  setSelectTranscription: (key: string) => void;
  selected: string[];
}

export const AsideProposal = ({
  transcriptions,
  setSelectTranscription,
  selected,
}: Props) => {
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
                  <li key={key}>
                    <input
                      type="checkbox"
                      name={key}
                      id={key}
                      className="hidden"
                    />
                    <label
                      htmlFor={key}
                      onClick={() => setSelectTranscription(key)}
                      className={`${
                        selected.includes(key) ? "bg-slate-200" : ""
                      } block w-full cursor-pointer px-2 py-1 text-sm font-medium hover:text-gray-500 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out`}
                    >
                      {key}
                    </label>
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

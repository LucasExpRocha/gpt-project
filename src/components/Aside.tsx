import { MyTranscriptions } from "@/app/page";
import { Check, Pen, X } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  transcriptions: MyTranscriptions;
  setSelectTranscription: Dispatch<SetStateAction<string>>;
  selected: string;
  changeNameTranscription: (key: string, name: string) => void;
}

export const Aside = ({
  transcriptions,
  setSelectTranscription,
  selected,
  changeNameTranscription,
}: Props) => {
  const [disabledInput, setDisabledInput] = useState("");

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
                let name = transcriptions[key].name;
                return (
                  <li
                    key={key}
                    onClick={() => setSelectTranscription(key)}
                    className={`${
                      selected === key
                        ? "bg-zinc-300 px-6 py-1"
                        : "bg-transparent px-6 py-1"
                    } flex w-full cursor-pointer px-2 py-1 text-sm font-medium hover:text-gray-500 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out`}
                  >
                    {Boolean(disabledInput !== name) ? (
                      <span className="w-full">{name}</span>
                    ) : (
                      <input
                        className="px-1"
                        type="text"
                        disabled={Boolean(disabledInput !== name)}
                        defaultValue={name}
                        onChange={({ target }) => (name = target.value)}
                      />
                    )}
                    {Boolean(disabledInput !== name) ? (
                      <Pen onClick={() => setDisabledInput(name)} />
                    ) : (
                      <div className="flex gap-2 bg-white">
                        <Check
                          onClick={() => {
                            changeNameTranscription(key, name);
                            setDisabledInput("");
                          }}
                          color="green"
                          size={20}
                        />
                        <X
                          onClick={() => setDisabledInput("")}
                          color="red"
                          size={20}
                        />
                      </div>
                    )}
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

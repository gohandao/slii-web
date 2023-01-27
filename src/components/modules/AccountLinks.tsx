import { nanoid } from "nanoid";
import type { Dispatch, SetStateAction } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { ReactSortable } from "react-sortablejs";

import type { LinksField } from "@/types/linksField";

type Props = {
  fields: LinksField[];
  setFields: Dispatch<SetStateAction<LinksField[]>>;
};
// eslint-disable-next-line import/no-default-export
export default function AccountLinks({ fields, setFields }: Props) {
  // const initial_id = nanoid();

  // const [fields, setFields] = useState<OptionalField[]>([
  //   {
  //     id: initial_id,
  //     label: "",
  //     value: "",
  //   },
  // ]);
  const AddButton = () => {
    return (
      <button
        className="btn flex h-[32px] w-[32px] !transform-none items-center justify-center gap-2 rounded-full bg-gray-900 text-white !transition-none"
        onClick={() => {
          const new_id = nanoid();
          const new_fields = [
            ...fields,
            {
              id: new_id,
              label: "",
              value: "",
            },
          ];
          setFields(() => {
            return new_fields;
          });
        }}
      >
        <AiOutlinePlus />
      </button>
    );
  };
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-bold text-gray-400">Links</p>
      <div className="flex flex-col">
        <ReactSortable list={fields} setList={setFields}>
          {fields?.length > 0 &&
            fields.map((item, index) => {
              return (
                <div key={item.id} className="relative mb-2 flex flex-col items-start gap-3">
                  {fields.length > 1 && (
                    <button
                      onClick={() => {
                        const new_fields = fields.filter((field) => {
                          return field.id !== item.id;
                        });
                        setFields(() => {
                          return new_fields;
                        });
                      }}
                      className="btn btn-circle absolute -top-[12px] -right-[12px] flex !h-[24px] min-h-0 !w-[24px] items-center justify-center rounded-full bg-black text-sm text-white"
                    >
                      <IoClose />
                    </button>
                  )}
                  <div className="flex w-full flex-col gap-5">
                    <div className="flex flex-col rounded-lg border-2 bg-slate-50 py-2 px-5">
                      <input
                        className="bg-slate-50 py-1"
                        placeholder="Label (optional)"
                        id={`${item.id}_label`}
                        name={`${item.id}_label`}
                        value={item.label}
                        onChange={(e) => {
                          const new_fields = fields;
                          new_fields[index].label = e.target.value;
                          setFields(() => {
                            return [...new_fields];
                          });
                        }}
                      ></input>
                      <input
                        className="bg-slate-50 py-1"
                        placeholder="https://example.com"
                        id={`${item.id}_value`}
                        name={`${item.id}_value`}
                        value={item.value}
                        onChange={(e) => {
                          const new_fields = fields;
                          new_fields[index].value = e.target.value;
                          setFields(() => {
                            return [...new_fields];
                          });
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
              );
            })}
        </ReactSortable>
      </div>
      <div className="flex justify-center">
        <AddButton />
      </div>
    </div>
  );
}

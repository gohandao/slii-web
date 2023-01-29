import { nanoid } from "nanoid";
import type { FC } from "react";
import type { FieldValues, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

type TaddButtonProps = {
  append: UseFieldArrayAppend<FieldValues, "links">;
};

const AddButton: FC<TaddButtonProps> = ({ append }) => {
  return (
    <button
      className="btn flex h-[32px] w-[32px] !transform-none items-center justify-center gap-2 rounded-full bg-gray-900 text-white !transition-none"
      onClick={() => {
        const firstId = nanoid();
        const secondId = nanoid();
        append([
          [
            {
              id: firstId,
              label: "",
              value: "",
            },
            {
              id: secondId,
              label: "",
              value: "",
            },
          ],
        ]);
      }}
    >
      <AiOutlinePlus />
    </button>
  );
};

type TdeleteButtonProps = {
  index: number;
  remove: UseFieldArrayRemove;
};

const DeleteButton: FC<TdeleteButtonProps> = ({ index, remove }) => {
  return (
    <button
      onClick={() => {
        remove(index);
      }}
      className="btn btn-circle absolute -top-[12px] -right-[12px] flex !h-[24px] min-h-0 !w-[24px] items-center justify-center rounded-full bg-black text-sm text-white"
    >
      <IoClose />
    </button>
  );
};

const AccountLinks: FC = () => {
  const { control, register } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    name: "links",
    control,
  });

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-bold text-gray-400">Links</p>
      <div className="flex flex-col">
        {fields?.length > 0 &&
          fields.map((item, index) => {
            return (
              <div key={item.id} className="relative mb-2 flex flex-col items-start gap-3">
                {fields.length > 1 && <DeleteButton index={index} remove={remove} />}
                <div className="flex w-full flex-col gap-5">
                  <div className="flex flex-col rounded-lg border-2 bg-slate-50 py-2 px-5">
                    <input
                      className="bg-slate-50 py-1"
                      placeholder="Label (optional)"
                      id={`${item.id}_label`}
                      {...register(`links.${index}.[0].value` as const)}
                    />
                    <input
                      className="bg-slate-50 py-1"
                      placeholder="https://example.com"
                      id={`${item.id}_value`}
                      {...register(`links.${index}.[1].value` as const)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <button
        className="bg-red-500"
        onClick={() => {
          move(0, 1);
        }}
      >
        move
      </button>
      <div className="flex justify-center">
        <AddButton append={append} />
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default AccountLinks;

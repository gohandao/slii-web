import { ErrorMessage } from "@hookform/error-message";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  id: string;
  before?: string;
  label?: string;
  placeholder?: string;
  type: string;
};
export const Input: FC<Props> = ({ id, before, label, placeholder, type }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={id} className="text-sm font-bold text-gray-400">
          {label}
        </label>
        <div className="relative flex items-center rounded-lg border-2 bg-slate-50">
          {before && <p className="absolute left-4 top-0 flex h-full items-center text-gray-400">{before}</p>}
          <input
            id={id}
            type={type}
            {...register(id)}
            className={`flex-1 rounded-lg bg-slate-50 py-3 px-4 ${before && "pl-9"}`}
            placeholder={placeholder}
          />
        </div>
      </div>
      <p className="text-red-400">
        <ErrorMessage errors={errors} name={id} />
      </p>
    </>
  );
};

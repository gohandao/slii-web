import type { FC } from "react";

type Props = {
  id: string;
  before?: string;
  label?: string;
  onChange: (arg: string) => void;
  placeholder?: string;
  type: string;
  value?: string;
};
export const Input: FC<Props> = ({ id, before, label, onChange, placeholder, type, value }) => {
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
            value={value}
            onChange={(e) => {
              return onChange(e.target.value);
            }}
            className={`flex-1 rounded-lg bg-slate-50 py-3 px-4 ${before && "pl-9"}`}
            placeholder={placeholder}
          />
        </div>
      </div>
    </>
  );
};

import type { FC } from "react";

type Props = {
  id: string;
  label?: string;
  onChange: (arg: string) => void;
  placeholder: string;
  type: string;
  value?: string;
};
export const Input: FC<Props> = ({ id, label, onChange, placeholder, type, value }) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-gray-100">
          {label}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => {
            return onChange(e.target.value);
          }}
          className="rounded px-5 py-3"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

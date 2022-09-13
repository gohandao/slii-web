import React from "react";
type Props = {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (arg: string) => void;
};
export const Input = ({ label, id, type, value, onChange }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-1 mb-5">
        <label htmlFor={id} className="text-gray-100">
          {label}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="px-5 py-3 rounded"
        />
      </div>
    </>
  );
};

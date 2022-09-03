import { useQueryState } from "next-usequerystate";
import React, { ReactNode } from "react";

type Props = {
  term?: string;
};
export const TermSort = ({ term }: Props) => {
  const [termParam, setTermParam] = useQueryState("term");

  type Props = {
    title: string;
  };
  const Button = ({ title }: Props) => {
    let activeClass;
    if (title == term || (!term && title == "all")) {
      activeClass = "border-gray-600 bg-gray-700";
    } else {
      activeClass = "border-gray-600 bg-gray-800";
    }
    return (
      <button
        className={`text-gray-300 w-10 h-10 flex justify-center items-center text-sm border-r last:border-r-0 capitalize ${activeClass}`}
        onClick={() => {
          setTermParam(title);
        }}
      >
        {title}
      </button>
    );
  };
  return (
    <div className="flex rounded border border-gray-600 items-center overflow-hidden">
      <Button title="24h" />
      <Button title="7d" />
      <Button title="30d" />
      <Button title="all" />
    </div>
  );
};

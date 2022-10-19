import React, { ReactNode, useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";

type Props = {
  children: ReactNode;
};
export const StatsBox = ({ children }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  let height = !show ? "h-[100px]" : "h-full";
  return (
    <div className="relative mx-auto">
      <dl
        className={`rounded-lg border border-gray-400 py-3 px-8 flex w-[320px] flex-col gap-1 overflow-hidden transition-all duration-300 ${height}`}
      >
        {children}
      </dl>
      <button
        className="absolute -bottom-4 left-0 right-0 m-auto w-[30px] transition-all duration-300"
        onClick={() => {
          setShow(!show);
        }}
      >
        <AiFillPlusSquare className="text-gray-400 text-3xl" />
      </button>
    </div>
  );
};

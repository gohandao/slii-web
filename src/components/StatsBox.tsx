import React, { ReactNode, useState } from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { BiMinus, BiPlus } from "react-icons/bi";

type Props = {
  children: ReactNode;
};
export const StatsBox = ({ children }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  let height = !show ? "h-[100px]" : "h-full";
  return (
    <div className={`relative mx-auto transition-all duration-300 ${height}`}>
      <dl
        className={` py-3 px-8 flex w-[320px] flex-col gap-1 overflow-hidden rounded-lg border border-gray-400  transition-all duration-300 ${height}`}
      >
        {children}
      </dl>
      <button
        className="absolute -bottom-4 left-0 right-0 m-auto w-7 h-7 bg-gray-400 flex items-center justify-center transition-all duration-300 -mt-10 rounded"
        onClick={() => {
          setShow(!show);
        }}
      >
        {!show ? (
          <BiPlus className="text-gray-800 text-3xl" />
        ) : (
          <BiMinus className="text-gray-800 text-3xl" />
        )}
      </button>
    </div>
  );
};

import React, { useState } from "react";

type Props = {
  text: string;
  alertText: string;
};
export const CopyText = ({ text, alertText }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const copyTextHandler = (text: string) => {
    navigator.clipboard.writeText(text);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };
  return (
    <div className="relative">
      <button
        onClick={() => {
          copyTextHandler(text);
        }}
        className="ellipsis max-w-[100px]"
      >
        {text}
      </button>
      {show && (
        <div className="absolute -top-[50px] left-1/2 transform -translate-x-1/2 m-auto bg-gray-800 border border-gray-700 rounded px-5 py-3 z-10 whitespace-nowrap ">
          <p>{alertText}</p>
        </div>
      )}
    </div>
  );
};

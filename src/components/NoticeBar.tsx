import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
const ls = require("local-storage");

export const NoticeBar = () => {
  const [show, setShow] = useState<boolean>(true);
  ls("noticeBar", "true");
  ls.get("noticeBar");
  return (
    <>
      {show && (
        <a
          href=""
          className="relative flex justify-center items-center bg-gradient text-gray-100 py-[6px] px-5 gap-4 tracking-wider"
        >
          Gachi ver0.0.1 released!
          <div className="rounded px-2 py-[2px] bg-pink-500 text-pink-100">
            Check!
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShow(false);
            }}
            className="absolute right-4 h-full flex justify-center items-center"
          >
            <IoMdClose className="text-white" />
          </button>
        </a>
      )}
    </>
  );
};

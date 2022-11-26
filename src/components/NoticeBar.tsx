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
          className="bg-gradient relative z-10 flex items-center justify-center gap-4 py-[6px] px-5 tracking-wider text-gray-100"
        >
          NFT OTAKU ver0.0.1 released!
          <div className="rounded bg-pink-500 px-2 py-[2px] text-pink-100">
            Check!
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShow(false);
            }}
            className="absolute right-4 flex h-full items-center justify-center"
          >
            <IoMdClose className="text-white" />
          </button>
        </a>
      )}
    </>
  );
};

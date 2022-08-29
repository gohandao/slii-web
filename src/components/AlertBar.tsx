import React, { useState } from "react";
const ls = require("local-storage");

export const AlertBar = () => {
  const [show, setShow] = useState<boolean>(true);
  ls("alertbar", "bar");
  ls.get("foo");
  return (
    <>
      {show && (
        <div className="flex justify-center items-center bg-red-500 text-red-100 py-[6px] px-5 gap-3">
          Gachi ver0.0.1 released!
          <a href="" className="rounded px-3 py-[2px] bg-red-700">
            Check Detail
          </a>
          <button
            onClick={() => {
              setShow(false);
            }}
          >
            close
          </button>
        </div>
      )}
    </>
  );
};

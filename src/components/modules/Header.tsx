import { useAtom } from "jotai";
import Link from "next/link";
import type { FC } from "react";
import { FaBell } from "react-icons/fa";

import { loginModalAtom } from "@/state/utilities.state";

import { authUserAtom } from "../../state/auth.state";

export const Header: FC = () => {
  const [, setLoginModal] = useAtom(loginModalAtom);
  const [authUser] = useAtom(authUserAtom);

  return (
    <header className="relative z-50 h-[68px] w-full py-3">
      <div className="fixed right-5 top-3 mx-auto flex justify-end">
        <div className="relative flex items-center gap-5">
          {!authUser && (
            <button
              onClick={() => {
                setLoginModal(true);
              }}
              className="mt-[1px] flex items-center justify-center rounded-full border-2 border-sky-500 bg-white py-1 px-5 font-bold text-sky-500 shadow-lg shadow-gray-100 transition-all duration-300 hover:bg-sky-500 hover:text-white"
            >
              Login
            </button>
          )}
          <Link
            href="https://google.com"
            className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full bg-white font-bold text-gray-900 shadow-lg shadow-gray-100 "
            target="_blank"
            rel="noreferrer"
          >
            <FaBell />
          </Link>
        </div>
      </div>
    </header>
  );
};

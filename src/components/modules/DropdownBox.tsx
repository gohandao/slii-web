import type { FC, ReactNode } from "react";
import { IoClose } from "react-icons/io5";

import { NavButton } from "@/components/elements/NavButton";

type Props = {
  children: ReactNode;
  dropdown: boolean;
  icon: any;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
};
export const DropdownBox: FC<Props> = ({ children, dropdown, icon, setDropdown, title }) => {
  return (
    <div className="">
      {dropdown && <div className="fixed top-0 left-0 z-[9999] h-screen w-screen bg-black bg-opacity-20"></div>}
      <div className="">
        <button
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          <NavButton>{icon}</NavButton>
        </button>
        {dropdown && (
          <div
            className={`absolute left-0 z-[99999] mt-2 flex w-full flex-col gap-3 rounded-xl bg-white py-5 px-5 shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{title ? title : "Menu"}</h3>
              <button
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
                onClick={() => {
                  setDropdown(!dropdown);
                }}
              >
                <IoClose className="text-lg" />
              </button>
            </div>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

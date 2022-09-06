import router from "next/router";
import React from "react";
import { IconType } from "react-icons";
import { BsThreeDots } from "react-icons/bs";
import { FaRegFlag } from "react-icons/fa";

type Props = {
  icon: any;
  dropdown: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  menus: {
    icon?: any;
    title: string;
    url: string;
  }[];
};
export const ProfileDropdown = ({
  icon,
  dropdown,
  setDropdown,
  menus,
}: Props) => {
  const onClickHandler = (url: string) => {
    //router.push(url);
    window.open(`${url}`, "_blank");
    setDropdown(false);
  };
  return (
    <div className="relative">
      <button
        onClick={() => {
          setDropdown(!dropdown);
        }}
        className="flex h-5 items-center"
      >
        {icon}
      </button>
      {dropdown && (
        <div
          className={`absolute origin-top-right left-0 sm:origin-top-left sm:right-0 sm:left-auto rounded border border-gray-700 bg-gray-800 z-20 w-48`}
        >
          {menus.map((menu, index) => (
            <button
              onClick={() => {
                onClickHandler(menu.url);
              }}
              className="flex px-5 py-3 text-sm text-gray-400 items-center gap-3 normal-case"
              key={index}
            >
              {menu.icon}
              {menu.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

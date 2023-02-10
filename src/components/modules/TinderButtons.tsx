import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";

import type { TButtons } from "@/types/tinder";

// eslint-disable-next-line import/no-default-export
export const TinderButtons = ({ onClickDisllike, onClickLike, onClickStar, onClickUndo }: TButtons) => {
  const buttons = [
    {
      class: "bg-white text-orange-500 w-[40px] h-[40px]",
      icon: <VscDebugRestart />,
      onClickHandler: onClickUndo && onClickUndo(),
    },
    {
      class: "bg-purple-500 text-white w-[60px] h-[60px]",
      icon: <IoClose />,
      onClickHandler: onClickDisllike && onClickDisllike(),
    },
    {
      class: "bg-pink-500 text-white w-[60px] h-[60px]",
      icon: <AiFillHeart />,
      onClickHandler: onClickLike && onClickLike(),
    },
    {
      class: "bg-yellow-500 text-white w-[40px] h-[40px]",
      icon: <AiFillStar />,
      onClickHandler: onClickStar && onClickStar(),
    },
  ];
  return (
    <div className="flex items-center justify-center gap-4">
      {buttons.map((value: any, index: number) => {
        return (
          <button
            key={index}
            className={`flex items-center justify-center rounded-full text-lg ${value.class}`}
            onClick={value.onClickHandler}
          >
            {value.icon}
          </button>
        );
      })}
    </div>
  );
};

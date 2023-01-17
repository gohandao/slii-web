import type { FC } from "react";

type StatsProps = {
  icon: JSX.Element | JSX.Element[];
  text: string | number;
};
export const ListSocial: FC<StatsProps> = ({ icon, text }) => {
  return (
    <div
      className={`relative left-0 top-0 z-10 flex items-center justify-center gap-2 rounded py-[2px] px-[2px] text-xs capitalize text-gray-500 md:text-xs `}
    >
      {icon}
      {text}
    </div>
  );
};

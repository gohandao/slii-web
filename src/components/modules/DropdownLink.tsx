import type { FC } from "react";
import { BiLinkExternal } from "react-icons/bi";

type Props = {
  icon?: JSX.Element;
  link: string;
  title: string;
};
export const DropdownLink: FC<Props> = ({ icon, link, title }) => {
  return (
    <a
      href={link}
      className="flex w-full items-center gap-3 rounded border-2 border-gray-700 bg-gray-200 px-4 py-2 font-bold"
      target="_blank"
      rel="noreferrer"
    >
      <div className="text-2xl">{icon ? icon : <BiLinkExternal />}</div>
      {title}
    </a>
  );
};

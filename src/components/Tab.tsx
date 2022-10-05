import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Tab = {
  title: string;
  emoji: string;
  path: string;
};

export const Tab = ({ title, emoji, path }: Tab) => {
  const router = useRouter();
  const currentPath = router.pathname;
  let colorClass = "";
  let passiveClass = "";
  if (currentPath != path) {
    passiveClass = "opacity-30";
  }
  switch (title) {
    case "Creators":
      colorClass = "bg-blue-500 border-blue-800 text-blue-100";
      if (currentPath != "/") {
        passiveClass = "opacity-30";
      }
      break;
    case "Collections":
      colorClass = "bg-green-600 border-green-700 text-green-100";
      if (currentPath != "/collections") {
        passiveClass = "opacity-30";
        // passiveClass =
        //   "bg-transparent border-green-200 opacity-50 text-green-100";
      }
      break;
    case "Users":
      colorClass = "bg-yellow-500 border-yellow-600 text-white";
      if (currentPath != "/users") {
        passiveClass = "opacity-30";
        // passiveClass =
        //   "bg-transparent border-yellow-200 opacity-50 text-yellow-100";
      }
      break;

    default:
      break;
  }
  return (
    <Link href={path}>
      <a
        className={`relative text-sm text-gray-100 font-bold py-2 pl-3 pr-4 border-2 rounded-lg flex justify-center items-center transition-all duration-300 ${passiveClass} ${colorClass}`}
      >
        <span className="mr-2">{emoji}</span>
        {title}
      </a>
    </Link>
  );
};

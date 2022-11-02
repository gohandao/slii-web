import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Tab = {
  title: string;
  // emoji: string;
  path?: string;
  param?: string;
};

export const Tab = ({ title, path, param }: Tab) => {
  const router = useRouter();
  // const currentPath = router.pathname;
  const { tab, search } = router.query;
  const removeParams = (asPath: string) => {
    return asPath.split("?")[0];
  };
  const currentPath = removeParams(router.asPath);
  console.log("currentPathiii");
  console.log(currentPath);

  let passiveClass = "text-gray-500";
  if (currentPath == path) {
    passiveClass = "text-gray-100";
  }
  if (
    (param == "creator" && tab == "creator") ||
    (param == "creator" && !tab)
  ) {
    passiveClass = "text-gray-100";
  }
  if (param == "collection" && tab == "collection") {
    passiveClass = "text-gray-100";
  }

  let new_query = { tab: param };
  if (typeof search == "string" && search.length > 0) {
    //@ts-ignore
    new_query = { tab: param, search: search };
  }
  return (
    <>
      {path && (
        <Link href={path}>
          <a
            className={`relative text-2xl font-bold py-2 rounded-lg flex justify-center items-center transition-all duration-300 ${passiveClass}`}
          >
            {title}
          </a>
        </Link>
      )}
      {param && (
        <button
          className={`relative text-2xl font-bold py-2 rounded-lg flex justify-center items-center transition-all duration-300 ${passiveClass}`}
          onClick={() => {
            if (param != "creator") {
              router.push(
                {
                  pathname: currentPath,
                  query: new_query,
                },
                undefined,
                { scroll: false }
              );
            } else {
              router.push(
                {
                  pathname: currentPath,
                  query: new_query,
                },
                undefined,
                { scroll: false }
              );
            }
          }}
        >
          {title}
        </button>
      )}
    </>
    // <Link href={path}>
    //   <a
    //     className={`relative text-sm text-gray-100 font-bold py-2 pl-3 pr-4 border-2 rounded-lg flex justify-center items-center transition-all duration-300 ${passiveClass} ${colorClass}`}
    //   >
    //     <span className="mr-2">{emoji}</span>
    //     {title}
    //   </a>
    // </Link>
  );
};

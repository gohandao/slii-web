import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";

type Tab = {
  title: string;
  // emoji: string;
  path?: string;
  param?: string;
};

export const Tab = ({ title, path, param }: Tab) => {
  const router = useRouter();
  const { tab, search } = router.query;
  const { setPrevHeight } = useContext(UtilitiesContext);

  const removeParams = (asPath: string) => {
    return asPath.split("?")[0];
  };
  const currentPath = removeParams(router.asPath);

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
        <Link
          href={path}
          onClick={() => {
            setPrevHeight(0);
          }}
        >
          <div
            className={`relative flex items-center justify-center rounded-lg py-2 text-2xl font-bold transition-all duration-300 ${passiveClass}`}
          >
            {title}
          </div>
        </Link>
      )}
      {param && (
        <button
          className={`relative flex items-center justify-center rounded-lg py-2 text-2xl font-bold transition-all duration-300 ${passiveClass}`}
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
  );
};

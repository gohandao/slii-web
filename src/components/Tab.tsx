import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useContext } from "react";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";

type Props = {
  param?: string;
  path?: string;
  title: string;
};
export const Tab: FC<Props> = ({ param, path, title }) => {
  const router = useRouter();
  const { search, tab } = router.query;
  const { setPrevHeight } = useContext(UtilitiesContext);

  const removeParams = (asPath: string) => {
    return asPath.split("?")[0];
  };
  const currentPath = removeParams(router.asPath);

  let passiveClass = "text-gray-500";
  if (currentPath == path) {
    passiveClass = "text-gray-100";
  }
  if ((param == "creator" && tab == "creator") || (param == "creator" && !tab)) {
    passiveClass = "text-gray-100";
  }
  if (param == "collection" && tab == "collection") {
    passiveClass = "text-gray-100";
  }

  let new_query = {};
  if (typeof search == "string" && search.length > 0) {
    new_query = { search: search, tab: param };
  } else {
    new_query = { tab: param };
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

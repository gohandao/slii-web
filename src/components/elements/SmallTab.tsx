import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";

import type { Params } from "@/types/params";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";

type Props = {
  path: string;
  title: string;
};
export const SmallTab: FC<Props> = ({ path, title }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { order, search, sort, tab, term, type, username } = router.query;

  let new_query = {
    order: order,
    search: search,
    sort: sort,
    tab: tab,
    term: term,
    type: type,
  } as Params;
  new_query = removeUndefinedObject(new_query);

  let passiveClass = "";
  if (currentPath == "/[username]" && path == "upvotes") {
    passiveClass = "bg-gray-800";
  } else if (currentPath == "/[username]/bookmarks" && path == "bookmarks") {
    passiveClass = "bg-gray-800";
  }
  let pathName = "/" + username;
  if (path == "bookmarks") {
    pathName = "/" + username + "/bookmarks";
  }

  return (
    <Link
      href={{
        pathname: pathName,
        query: new_query,
      }}
      legacyBehavior
    >
      <a className={`rounded-full px-5 py-1 text-xs  text-gray-100 ${passiveClass}`}>{title}</a>
    </Link>
  );
};

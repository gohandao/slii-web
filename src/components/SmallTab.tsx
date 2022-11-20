import { useRouter } from "next/router";
import React from "react";
import { Params } from "@/types/params";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";
import Link from "next/link";

type Props = {
  title: string;
  path: string;
};
export const SmallTab = ({ title, path }: Props) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const { order, sort, term, page, type, search, tab, username } = router.query;

  let new_query = {
    tab: tab,
    type: type,
    sort: sort,
    term: term,
    order: order,
    search: search,
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

  const users = { id: 1, name: "tanaka", text: "暖かくなってきたね！" };
  return (
    // <Link href={{ pathname: '/search', query: { keyword: 'this way' } }}><a>path</a></Link>

    <Link
      href={{
        pathname: pathName,
        query: new_query,
      }}
      legacyBehavior
    >
      <a
        className={`text-gray-100 rounded-full px-5 py-1  text-xs ${passiveClass}`}
      >
        {title}
      </a>
    </Link>
    // <button
    //   className={`text-gray-100 rounded-full px-5 py-1  text-xs ${passiveClass}`}
    //   onClick={() => {
    //     router.push(
    //       {
    //         pathname: pathName,
    //         query: new_query,
    //       },
    //       undefined,
    //       { scroll: false }
    //     );
    //   }}
    // >
    //   {title}
    // </button>
  );
};

import React, { useContext } from "react";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";
import router from "next/router";
import { Params } from "@/types/params";

export const setParams = ({
  slug,
  sort,
  order,
  term,
  page,
  type,
  search,
  tab,
  screen,
}: Params) => {
  const query = {
    slug: slug,
    tab: tab,
    type: type,
    sort: sort,
    term: term,
    order: order,
    page: page,
    search: search,
    screen: screen,
  };
  const new_query: Params = removeUndefinedObject(query);
  const currentUrl = location.pathname;
  router.push(
    {
      pathname: currentUrl,
      query: new_query,
    },
    undefined,
    { scroll: false }
  );
  return;
};

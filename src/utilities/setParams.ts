import React from "react";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";
import router from "next/router";
import { Params } from "@/types/params";

export const setParams = ({
  sort,
  order,
  term,
  page,
  type,
  search,
  tab,
}: Params) => {
  const query = {
    tab: tab,
    type: type,
    sort: sort,
    term: term,
    order: order,
    page: page,
    search: search,
  };
  const new_query: Params = removeUndefinedObject(query);
  const currentUrl = location.pathname;
  console.log("new_query");
  console.log(query);
  console.log(new_query);
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

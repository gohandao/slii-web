import React from "react";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";
import router from "next/router";
import { Params } from "@/types/params";

export const setParams = ({ sortBy, order, term, page, type }: Params) => {
  const query = {
    type: type,
    sortBy: sortBy,
    order: order,
    term: term,
    page: page,
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

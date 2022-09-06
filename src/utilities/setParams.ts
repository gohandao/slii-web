import React from "react";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";
import router from "next/router";

type setParamsProps = {
  sortBy?: string;
  order?: string;
  term?: string;
};
export const setParams = ({ sortBy, order, term }: setParamsProps) => {
  const query = {
    sortBy: sortBy,
    order: order,
    term: term,
  };
  const new_query: setParamsProps = removeUndefinedObject(query);
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

import React, { useContext } from "react";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";
import router, { useRouter } from "next/router";
import { Params } from "@/types/params";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

export const setParams = ({
  slug,
  sort,
  order,
  term,
  page,
  type,
  search,
  tab,
  hiddenUrl,
  keyword,
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
  };
  const new_query: Params = removeUndefinedObject(query);
  // const { hiddenUrl } = useContext(UtilitiesContext);
  const currentUrl = location.pathname;
  const new_url = hiddenUrl ? hiddenUrl : currentUrl;
  const new_asUrl = hiddenUrl ? currentUrl : undefined;

  console.log("currentUrlssss");
  console.log(currentUrl);
  console.log(new_url);
  console.log(new_asUrl);

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

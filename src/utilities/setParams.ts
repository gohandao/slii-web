import router from "next/router";

import type { Params } from "@/types/params";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";

export const setParams = ({ order, page, screen, search, slug, sort, tab, term, type }: Params) => {
  /* eslint-disable */
  // パラメーター順序に意味がある
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

import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";
import { setParams } from "@/utilities/setParams";
import router, { useRouter } from "next/router";
import React from "react";
import { BsTriangleFill, BsTwitter } from "react-icons/bs";
import { FaDiscord, FaSort, FaSortDown } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";

type Props = {
  title: string;
  sort: string;
};

export const Th = ({ title }: Props) => {
  const router = useRouter();
  const { order, sort, term, search } = router.query;

  const titleToParam = (title: string) => {
    let sortParam;
    switch (title) {
      case "Twitter":
        sortParam = "twitter";
        break;
      case "Upvotes":
        sortParam = "upvotes";
        break;
      case "Discord":
        sortParam = "discord";
        break;
      case "Collection Name":
        sortParam = "name";
        break;
      case "Volume":
        sortParam = "volume";
        break;
      case "Ave. Price":
        sortParam = "average_price";
        break;
      case "Floor Price":
        sortParam = "floor_price";
        break;
      case "Market Cap":
        sortParam = "market_cap";
        break;
      case "% Change":
        sortParam = "change";
        break;
      case "Sales":
        sortParam = "sales";
        break;
      case "Owners":
        sortParam = "owners";
        break;
      case "Items":
        sortParam = "items";
        break;
      default:
        break;
    }
    return sortParam;
  };
  const changeParams = async () => {
    // const test = window.scrollY;
    let titleParam = null;
    titleParam = titleToParam(title) as string;
    if (!order && sort == "upvotes") {
      setParams({
        sort: "",
        order: "asc",
        term: term as string,
        search: search as string,
      });
    } else if (titleParam != sort && titleParam == "name") {
      setParams({
        sort: titleParam as string,
        order: "asc",
        term: term as string,
        search: search as string,
      });
    } else if (!sort && titleParam == "upvotes") {
      setParams({
        sort: "",
        order: order == "desc" ? "asc" : "desc",
        term: term as string,
        search: search as string,
      });
    } else if (titleParam == "upvotes") {
      setParams({
        sort: "",
        order: order == "desc" ? "asc" : "desc",
        term: term as string,
        search: search as string,
      });
    } else if (titleParam != sort) {
      setParams({
        sort: titleParam as string,
        order: "desc",
        term: term as string,
        search: search as string,
      });
    } else if (order && titleParam == sort) {
      order == "desc"
        ? setParams({
            sort: titleParam,
            order: "asc",
            term: term as string,
            search: search as string,
          })
        : setParams({
            sort: titleParam,
            order: "desc",
            term: term as string,
            search: search as string,
          });
    } else {
      setParams({
        sort: titleParam,
        order: "desc",
        term: term as string,
        search: search as string,
      });
    }
    //setParams({ sort: titleParam, order: "desc", term: term as string });
    //window.scrollTo({ top: test, behavior: "smooth" });
  };

  let thClass = "";
  let active = false;
  if (sort == titleToParam(title)) {
    thClass = "text-gray-300";
    active = true;
  } else if (!sort && titleToParam(title) == "Upvotes") {
    thClass = "text-gray-300";
  } else {
    thClass = "text-gray-500";
  }
  let TitleIcon;
  if (title == "Twitter") {
    TitleIcon = <BsTwitter className="text-twitter" />;
  } else if (title == "Discord") {
    TitleIcon = <FaDiscord className="text-discord" />;
  } else if (title == "Upvotes") {
    TitleIcon = <BsTriangleFill className="text-sm text-gray-500" />;
  }

  let termArea;
  let termTag;
  if (
    title == "Volume" ||
    title == "Ave. Price" ||
    title == "% Change" ||
    title == "Sales"
  ) {
    if (term && term != "all") {
      termTag = term;
    } else if (!term || term == "all") {
      termTag = "Total";
    }
    termArea = true;
  }
  return (
    <>
      {title.length > 0 ? (
        <th
          scope="col"
          className={`py-3.5 pr-3 text-left text-sm font-medium ${
            title != "Collection Name" && "pl-3 sm:pl-3"
          } ${thClass}`}
        >
          <button
            className="flex items-center gap-2"
            onClick={() => {
              changeParams();
            }}
          >
            {termArea && (
              <p
                className="rounded bg-gray-700 px-[6px] py-[2px] text-xs capitalize text-gray-300"
                suppressHydrationWarning={true}
              >
                {termTag}
              </p>
            )}
            <p className="flex items-center gap-2 whitespace-nowrap">
              {TitleIcon ? TitleIcon : title}
              {(!sort && title == "Upvotes") || (active && order == "desc") ? (
                <TiArrowSortedDown className="text-gray-300 transition-all duration-300" />
              ) : active && order == "asc" ? (
                <TiArrowSortedDown className="rotate-180 text-gray-300 transition-all duration-300" />
              ) : (
                <FaSort className="text-gray-700" />
              )}
            </p>
          </button>
        </th>
      ) : (
        <th className="min-w-[28px] py-3.5 text-left text-sm font-medium text-gray-400"></th>
      )}
    </>
  );
};

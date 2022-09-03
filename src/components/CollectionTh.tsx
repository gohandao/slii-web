import { useQueryState } from "next-usequerystate";
import router from "next/router";
import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaDiscord, FaSort, FaSortDown } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";

type Props = {
  title: string;
  sortBy: string;
};

export const Th = ({ title, sortBy }: Props) => {
  const [orderParam, setOrderParam] = useQueryState("order");
  const [sortByParam, setSortByParam] = useQueryState("sortBy");
  const [termParam, setTermParam] = useQueryState("term");

  const titleToParam = (title: string) => {
    let sortParam;
    switch (title) {
      case "Twitter":
        sortParam = "twitter";
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
    let titleParam = null;
    titleParam = titleToParam(title) as string;
    await setSortByParam(titleParam);
    if (!orderParam && sortBy == "volume") {
      await setOrderParam("asc");
    } else if (titleParam != sortBy && titleParam == "name") {
      await setOrderParam("asc");
    } else if (titleParam != sortBy) {
      await setOrderParam("desc");
    } else if (orderParam && titleParam == sortBy) {
      orderParam == "desc"
        ? await setOrderParam("asc")
        : await setOrderParam("desc");
    }
  };

  let thClass = "";
  let active = false;
  if (sortBy == titleToParam(title)) {
    thClass = "text-gray-300";
    active = true;
  } else {
    thClass = "text-gray-500";
  }
  let TitleIcon;
  if (title == "Twitter") {
    TitleIcon = <BsTwitter className="text-twitter" />;
  } else if (title == "Discord") {
    TitleIcon = <FaDiscord className="text-discord" />;
  }
  return (
    <>
      {title.length > 0 ? (
        <th
          scope="col"
          className={`py-3.5 pr-3 text-left text-sm font-medium ${
            title != "Collection Name" && "pl-4 sm:pl-6"
          } ${thClass}`}
        >
          <button
            className="flex gap-2 items-center"
            onClick={() => {
              changeParams();
            }}
          >
            {TitleIcon ? TitleIcon : title}
            {active && (
              <>
                {orderParam == "desc" ? (
                  <TiArrowSortedDown className="transition-all duration-300" />
                ) : (
                  <TiArrowSortedDown className="transition-all duration-300 rotate-180" />
                )}
              </>
            )}
          </button>
        </th>
      ) : (
        <th className="py-3.5 text-left text-sm font-medium text-gray-400 min-w-[28px]"></th>
      )}
    </>
  );
};

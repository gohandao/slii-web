import { useRouter } from "next/router";
import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiCategory, BiFilterAlt } from "react-icons/bi";
import { BsCheck, BsFilter, BsFolder2Open } from "react-icons/bs";
import { TbUsers } from "react-icons/tb";

import { setParams } from "@/utilities/setParams";

type Props = {
  custom_menu?: {
    key: string;
    value: string;
  }[];
  position: "left" | "right";
  property:
    | "creatorType"
    | "collectionType"
    | "nftType"
    | "creatorSort"
    | "collectionSort"
    | "nftSort"
    | "assetsDropdown"
    | "term";
};
export const Dropdown: FC<Props> = ({ custom_menu, position, property }) => {
  const router = useRouter();
  const { order, screen, search, slug, sort, term, type } = router.query;

  const [status, setStatus] = useState<boolean>(false);
  const assetsDropdown = ["All", "Buy now", "On auction", "Price low to high"];
  let menus = [] as string[];
  let title = "" as any;
  let icon = "" as any;

  type TitleProps = {
    children: ReactNode;
  };
  const Title: FC<TitleProps> = ({ children }) => {
    return <span className="hidden capitalize sm:inline-block">{children}</span>;
  };
  //メニュー表示
  switch (property) {
    case "assetsDropdown":
      menus = assetsDropdown;
      if (!type) {
        title = (
          <>
            <BsFilter className="text-gray-400" />
            <Title>all</Title>
          </>
        );
      } else {
        title = type ? (
          <>
            <BsFilter className="text-gray-400" />
            <Title>{type}</Title>
          </>
        ) : (
          "Sort"
        );
      }
      break;
    case "term":
      menus = ["all", "30d", "7d", "24h", "6h", "1h"];
      icon = <AiOutlineClockCircle className="text-gray-400" />;
      if (!term) {
        title = (
          <>
            {icon}
            <Title>all</Title>
          </>
        );
      } else {
        title = (
          <>
            {icon}
            <Title>{term}</Title>
          </>
        );
      }
      break;
    case "creatorType":
      menus = ["all", "creator", "project"];
      icon = <TbUsers className="text-gray-400" />;
      if (!type) {
        title = (
          <>
            {icon}
            <Title>all</Title>
          </>
        );
      } else {
        title = (
          <>
            {icon}
            <Title>{type}</Title>
          </>
        );
      }
      break;
    case "creatorSort":
      menus = ["popular", "new listed", "name", "twitter"];
      icon = <BiFilterAlt className="text-gray-400" />;
      if (!sort) {
        title = (
          <>
            {icon}
            <Title>popular</Title>
          </>
        );
      } else if (sort == "listed_at") {
        title = (
          <>
            {icon}
            <Title>new listed</Title>
          </>
        );
      } else {
        title = (
          <>
            {icon}
            <Title>{sort}</Title>
          </>
        );
      }
      break;
    case "collectionType":
      menus = ["all", "handmade", "generative", "utilities"];
      icon = <BiCategory className="text-gray-400" />;
      if (!type) {
        title = (
          <>
            {icon}
            <Title>all</Title>
          </>
        );
      } else {
        title = (
          <>
            {icon}
            <Title>{type}</Title>
          </>
        );
      }
      break;
    case "nftType":
      const new_menus = custom_menu
        ? custom_menu.map((item, index) => {
            if (index == 0) {
              return item.value;
            }
            return item.value;
          })
        : [];
      menus = ["all", ...new_menus];
      icon = <BsFolder2Open className="text-gray-400" />;
      if (!type) {
        title = (
          <>
            {icon}
            <Title>all</Title>
          </>
        );
      } else {
        title = (
          <>
            {icon}
            <Title>{type}</Title>
          </>
        );
      }
      break;
    case "nftSort":
      menus = ["token id", "last price", "last sale", "random"];
      icon = <BiCategory className="text-gray-400" />;
      if (!sort) {
        title = (
          <>
            {icon}
            <Title>token id</Title>
          </>
        );
      } else if (sort == "last_price") {
        title = (
          <>
            {icon}
            <Title>last price</Title>
          </>
        );
      } else if (sort == "last_sale") {
        title = (
          <>
            {icon}
            <Title>last sale</Title>
          </>
        );
      } else {
        title = (
          <>
            {icon}
            <Title>{sort}</Title>
          </>
        );
      }
      break;
    case "collectionSort":
      menus = [
        "popular",
        "newest",
        "new listed",
        "name",
        "floor price",
        "total volume",
        "30d volume",
        "7d volume",
        "24h volume",
        "owners",
        "items",
        "twitter",
        "discord",
      ];
      icon = <BiFilterAlt className="text-gray-400" />;
      if (!sort) {
        title = (
          <>
            {icon}
            <Title>popular</Title>
          </>
        );
      } else if (sort == "created_at") {
        title = (
          <>
            {icon}
            <Title>newest</Title>
          </>
        );
      } else if (sort == "listed_at") {
        title = (
          <>
            {icon}
            <Title>new listed</Title>
          </>
        );
      } else if (sort == "volume" && !term) {
        title = (
          <>
            {icon}
            <Title>total volume</Title>
          </>
        );
      } else {
        title = (
          <>
            {icon}
            <Title>{term ? (term as string) + " " + sort : sort}</Title>
          </>
        );
      }
      break;
  }
  let possitionClass = "";
  switch (position) {
    case "left":
      possitionClass = "origin-top-left left-0 ";
      break;
    case "right":
      possitionClass = "origin-top-right right-0 ";
      break;
  }

  useEffect(() => {
    //初期値
  }, []);

  const toggleDropdownHandler = () => {
    setStatus(!status);
  };
  const updateParamsHandler = (title: string) => {
    if (property == "term") {
      let new_term;
      if (title != "all") {
        new_term = title;
      }
      setParams({
        order: order && (order as string),
        screen: screen && (screen as string),
        search: search && (search as string),
        sort: sort && (sort as string),
        term: new_term,
        type: type && (type as string),
      });
    }
    if (property == "nftType") {
      let new_type;
      if (title != "all") {
        new_type = title;
      }
      setParams({
        order: order && (order as string),
        screen: screen && (screen as string),
        search: search && (search as string),
        slug: new_type,
        sort: sort && (sort as string),
      });
    }
    if (property == "nftSort") {
      let new_sort;
      if (title != "all") {
        new_sort = new_sort;
      }
      switch (title) {
        case "all":
          new_sort = undefined;
          break;
        case "token id":
          new_sort = "token_id";
          break;
        case "last price":
          new_sort = "last_price";
          break;
        case "last sale":
          new_sort = "last_sale";
          break;
        default:
          new_sort = title;
          break;
      }
      setParams({
        order: order && (order as string),
        screen: screen && (screen as string),
        search: search && (search as string),
        slug: slug && (slug as string),
        sort: new_sort,
      });
    }
    if (property == "creatorType") {
      let new_type;
      if (title != "all") {
        new_type = title;
      }
      setParams({
        order: order && (order as string),
        screen: screen && (screen as string),
        search: search && (search as string),
        sort: sort && (sort as string),
        type: new_type,
      });
    }
    if (property == "creatorSort") {
      let new_sort;
      if (title == "new listed") {
        new_sort = "listed_at";
      } else if (title != "popular") {
        new_sort = title;
      }
      setParams({
        order: order && (order as string),
        screen: screen && (screen as string),
        search: search && (search as string),
        sort: new_sort,
        type: type && (type as string),
      });
    }
    if (property == "collectionType") {
      let new_type;
      if (title != "all") {
        new_type = title;
      }
      setParams({
        order: order && (order as string),
        screen: screen && (screen as string),
        search: search && (search as string),
        sort: sort && (sort as string),
        type: new_type,
      });
    }
    if (property == "collectionSort") {
      let new_sort = title;
      let new_term;
      if (title == "newest") {
        new_sort = "created_at";
      }
      if (title == "new listed") {
        new_sort = "listed_at";
      }
      if (title == "floor price") {
        new_sort = "floor_price";
      }
      if (title == "total volume") {
        new_sort = "volume";
      }
      if (title == "30d volume") {
        new_sort = "volume";
        new_term = "30d";
      }
      if (title == "7d volume") {
        new_sort = "volume";
        new_term = "7d";
      }
      if (title == "24h volume") {
        new_sort = "volume";
        new_term = "24h";
      }
      setParams({
        order: order && (order as string),
        search: search && (search as string),
        slug: slug && (slug as string),
        sort: new_sort,
        term: new_term && (new_term as string),
        type: type && (type as string),
      });
    }
    setStatus(false);
  };

  const dropdownClass = !status && "hidden";

  return (
    <>
      <div className={`relative z-50 inline-block text-left ${menus.length < 2 && "_hidden"}`}>
        <div>
          <button
            type="button"
            className="inline-flex h-[46px] w-full  items-center justify-center gap-2 rounded-md border border-gray-600 bg-gray-800 px-4 py-[11px] text-sm font-medium capitalize text-gray-300 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-600"
            id="menu-button"
            onClick={() => {
              toggleDropdownHandler();
            }}
          >
            <>
              {title}
              <svg
                className="-mr-1 ml-2 hidden h-5 w-5 sm:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          </button>
        </div>
        <div
          className={`absolute mt-2 w-56 rounded-md border border-gray-700 bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${dropdownClass} ${possitionClass}`}
          role="menu"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {menus &&
              menus.map((menu, index) => {
                const checkCurrentParam = () => {
                  switch (menu) {
                    case sort:
                    case type:
                      return true;
                      break;
                    case property == "term" && term == undefined && "all":
                    case property == "term" && term == "1h" && "1h":
                    case property == "term" && term == "6h" && "6h":
                    case property == "term" && term == "24h" && "24h":
                    case property == "term" && term == "1d" && "1d":
                    case property == "term" && term == "7d" && "7d":
                    case property == "term" && term == "30d" && "30d":
                    case property == "collectionSort" && sort == undefined && "popular":
                    case property == "collectionSort" && sort == undefined && "popular":
                    case property == "creatorSort" && sort == undefined && "popular":
                    case property == "collectionType" && type == undefined && "all":
                    case property == "creatorType" && type == undefined && "all":
                    case property == "nftType" && slug == undefined && "all":
                      return true;
                    case property == "nftSort" && slug == undefined && "token_id":
                      return true;
                      break;
                    case sort == "created_at" && "newest":
                    case sort == "listed_at" && "new listed":
                    case sort == "volume" && term == undefined && "total volume":
                      return true;
                    case sort == "volume" && term == "24h" && "24h volume":
                    case sort == "volume" && term == "7d" && "7d volume":
                    case sort == "volume" && term == "30d" && "30d volume":
                      return true;
                      break;
                    default:
                      return false;
                      break;
                  }
                };
                const iconCheck = checkCurrentParam();
                return (
                  <button
                    className="ellipsis relative block w-full gap-2 border-b border-gray-600 py-[11px] pl-8 pr-4 text-left text-sm capitalize text-gray-300 last:border-b-0"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                    onClick={() => {
                      updateParamsHandler(menu);
                    }}
                    key={index}
                  >
                    {iconCheck && <BsCheck className="absolute left-3 top-0 flex h-full items-center text-green-500" />}
                    {menu}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

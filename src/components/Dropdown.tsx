import React, { useState, useEffect, useContext, ReactNode } from "react";
import { useQueryState } from "next-usequerystate";

import Link from "next/link";
import { BsCheck, BsFilter, BsFolder2Open } from "react-icons/bs";
import { BiSortAlt2, BiCategory, BiFilterAlt } from "react-icons/bi";
import { TbUsers } from "react-icons/tb";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { useRouter } from "next/router";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";
import { Params } from "@/types/params";
import { setParams } from "@/utilities/setParams";
import { AiOutlineClockCircle } from "react-icons/ai";

type Props = {
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
  custom_menu?: {
    key: string;
    value: string;
  }[];
};
export const Dropdown = ({ position, property, custom_menu }: Props) => {
  const router = useRouter();
  const { order, sort, term, page, type, search, slug, screen } = router.query;

  const [status, setStatus] = useState<boolean>(false);
  const assetsDropdown = ["All", "Buy now", "On auction", "Price low to high"];
  let menus = [] as string[];
  let title = "" as any;
  let icon = "" as any;

  type TitleProps = {
    children: ReactNode;
  };
  const Title = ({ children }: TitleProps) => {
    return (
      <span className="hidden sm:inline-block capitalize">{children}</span>
    );
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
      let new_menus = custom_menu
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
    let new_order;
    if (property == "term") {
      let new_term;
      if (title != "all") {
        new_term = title;
      }
      setParams({
        type: type && (type as string),
        sort: sort && (sort as string),
        term: new_term,
        order: order && (order as string),
        search: search && (search as string),
        screen: screen && (screen as string),
      });
    }
    if (property == "nftType") {
      let new_type;
      if (title != "all") {
        new_type = title;
      }
      setParams({
        slug: new_type,
        sort: sort && (sort as string),
        order: order && (order as string),
        search: search && (search as string),
        screen: screen && (screen as string),
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
        slug: slug && (slug as string),
        sort: new_sort,
        order: order && (order as string),
        search: search && (search as string),
        screen: screen && (screen as string),
      });
    }
    if (property == "creatorType") {
      let new_type;
      if (title != "all") {
        new_type = title;
      }
      setParams({
        type: new_type,
        sort: sort && (sort as string),
        order: order && (order as string),
        search: search && (search as string),
        screen: screen && (screen as string),
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
        type: type && (type as string),
        sort: new_sort,
        order: order && (order as string),
        search: search && (search as string),
        screen: screen && (screen as string),
      });
    }
    if (property == "collectionType") {
      let new_type;
      if (title != "all") {
        new_type = title;
      }
      setParams({
        type: new_type,
        sort: sort && (sort as string),
        order: order && (order as string),
        search: search && (search as string),
        screen: screen && (screen as string),
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
        slug: slug && (slug as string),
        type: type && (type as string),
        sort: new_sort,
        order: order && (order as string),
        term: new_term && (new_term as string),
        search: search && (search as string),
      });
    }
    setStatus(false);
  };

  const dropdownClass = !status && "hidden";

  return (
    <>
      <div
        className={`relative inline-block text-left z-50 ${
          menus.length < 2 && "_hidden"
        }`}
      >
        <div>
          <button
            type="button"
            className="inline-flex h-[46px] items-center  gap-2 justify-center w-full rounded-md border border-gray-600 shadow-sm px-4 py-[11px] bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 focus:ring-indigo-500 capitalize"
            id="menu-button"
            onClick={() => {
              toggleDropdownHandler();
            }}
          >
            <>
              {title}
              <svg
                className="-mr-1 ml-2 h-5 w-5 hidden sm:block"
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
          className={`absolute mt-2 w-56 rounded-md shadow-lg border border-gray-700 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none ${dropdownClass} ${possitionClass}`}
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
                    case property == "collectionSort" &&
                      sort == undefined &&
                      "popular":
                    case property == "collectionSort" &&
                      sort == undefined &&
                      "popular":
                    case property == "creatorSort" &&
                      sort == undefined &&
                      "popular":
                    case property == "collectionType" &&
                      type == undefined &&
                      "all":
                    case property == "creatorType" &&
                      type == undefined &&
                      "all":
                    case property == "nftType" && slug == undefined && "all":
                      return true;
                    case property == "nftSort" &&
                      slug == undefined &&
                      "token_id":
                      return true;
                      break;
                    case sort == "created_at" && "newest":
                    case sort == "listed_at" && "new listed":
                    case sort == "volume" &&
                      term == undefined &&
                      "total volume":
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
                    className="relative text-gray-300 block pl-8 pr-4 py-[11px] text-sm capitalize w-full text-left border-b border-gray-600 last:border-b-0 gap-2 ellipsis"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                    onClick={() => {
                      updateParamsHandler(menu);
                    }}
                    key={index}
                  >
                    {iconCheck && (
                      <BsCheck className="absolute left-3 flex h-full top-0 items-center text-green-500" />
                    )}
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

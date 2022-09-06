import React, { useState, useEffect, useContext } from "react";
import { useQueryState } from "next-usequerystate";

import Link from "next/link";
import { BsFilter } from "react-icons/bs";
import { BiSortAlt2, BiCategory } from "react-icons/bi";
import { TbUsers } from "react-icons/tb";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { useRouter } from "next/router";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";

type Props = {
  position: "left" | "right";
  type:
    | "creatorType"
    | "collectionType"
    | "sortCreators"
    | "sortCollections"
    | "creatorCategories"
    | "collectionCategories"
    | "assetsDropdown";
};
export const Dropdown = ({ position, type }: Props) => {
  const {
    sortAction,
    setSortAction,
    creatorType,
    setCreatorType,
    creatorsSort,
    setCreatorsSort,
    creatorCategory,
    setCreatorCategory,
    collectionCategory,
    setCollectionCategory,
  } = useContext(UtilitiesContext);
  const router = useRouter();
  const { order, sortBy, term } = router.query;

  const [status, setStatus] = useState<boolean>(false);
  const categories = [
    "All",
    "PFP",
    "Art",
    "Metaverse",
    "Game",
    "Sports",
    "Sounds",
    "Photography",
    "Earning",
    "Utilities",
  ];
  const assetsDropdown = ["All", "Buy now", "On auction", "Price low to high"];
  let menus = [] as string[];
  let title = "" as any;

  //メニュー表示
  switch (type) {
    case "assetsDropdown":
      menus = assetsDropdown;
      if (creatorType == "all") {
        title = (
          <>
            <BsFilter className="text-gray-400" />
            All
          </>
        );
      } else {
        title = creatorType ? (
          <>
            <BsFilter className="text-gray-400" />
            {creatorType}
          </>
        ) : (
          "Sort"
        );
      }
      break;
    case "creatorType":
      menus = ["all", "creator", "project"];
      if (creatorType == "all") {
        title = (
          <>
            <TbUsers className="text-gray-400" />
            All
          </>
        );
      } else {
        title = creatorType ? (
          <>
            <TbUsers className="text-gray-400" />
            {creatorType}
          </>
        ) : (
          "Sort"
        );
      }
      break;
    case "creatorCategories":
      menus = categories;
      if (creatorCategory == "All") {
        title = (
          <>
            <BiCategory className="text-gray-400" />
            Categories
          </>
        );
      } else {
        title = creatorCategory ? (
          <>
            <BiCategory className="text-gray-400" />
            {creatorCategory}
          </>
        ) : (
          "Sort"
        );
      }
      break;
    case "collectionCategories":
      menus = categories;
      if (collectionCategory == "All") {
        title = (
          <>
            <BiCategory className="text-gray-400" />
            Categories
          </>
        );
      } else {
        title = collectionCategory ? (
          <>
            <BiCategory className="text-gray-400" />
            {collectionCategory}
          </>
        ) : (
          "Sort"
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

  type setParamsProps = {
    sortBy?: string;
    order?: string;
    term?: string;
  };
  const setParams = ({ sortBy, order, term }: setParamsProps) => {
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
  const changeCollectionParams = (title: string) => {
    switch (title) {
      case "Floor Price":
        switch (sortBy) {
          case "Price Low to High":
            setParams({ sortBy: title, order: "asc", term: term as string });
            //setSortAction(true);
            break;
          case "Price High to Low":
            setParams({ sortBy: title, order: "desc", term: term as string });
            //setSortAction(true);
            break;
          default:
            setParams({ sortBy: title, order: "desc", term: term as string });
            //setSortAction(true);
            break;
        }
        break;
      default:
        setParams({ sortBy: title, order: "asc", term: term as string });
        break;
    }
    // const exception =
    //   title != "Price Low to High" && title != "Price High to Low" && true;
    // if (orderParam) {
    //   if (title == sortBy && exception) {
    //     orderParam == "desc" ? setOrderParam("asc") : setOrderParam("desc");
    //   }
    // }
  };
  const onChangeHandler = (menu: string) => {
    switch (type) {
      case "creatorType":
        setCreatorType(menu);
        setStatus(false);
        break;
      case "sortCreators":
        setCreatorsSort(menu);
        setSortAction(true);
        setStatus(false);
        break;
      case "sortCollections":
        changeCollectionParams(menu);
        setSortAction(true);
        setStatus(false);
        break;
      case "creatorCategories":
        setCreatorCategory(menu);
        setStatus(false);
        break;
      case "collectionCategories":
        console.log("menu");
        console.log(menu);
        setCollectionCategory(menu);
        setStatus(false);
        break;
    }
  };

  useEffect(() => {
    //初期値
    setCreatorsSort("All");
    setCreatorCategory("All");
    setCollectionCategory("All");
  }, []);

  const toggleDropdownHandler = () => {
    setStatus(!status);
  };

  const dropdownClass = !status && "hidden";
  return (
    <>
      <div className="relative inline-block text-left z-10">
        <div>
          <button
            type="button"
            className="inline-flex items-center  gap-2 justify-center w-full rounded-md border border-gray-600 shadow-sm px-4 py-[9px] bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 focus:ring-indigo-500 capitalize"
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
              menus.map((title, index) => (
                <button
                  className="text-gray-300 block px-4 py-[11px] text-sm capitalize w-full text-left border-b border-gray-600 last:border-b-0"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-0"
                  onClick={() => {
                    onChangeHandler(title);
                  }}
                  key={index}
                >
                  {title}
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

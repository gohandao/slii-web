import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { BsFilter } from "react-icons/bs";
import { BiSortAlt2, BiCategory } from "react-icons/bi";
import { TbUsers } from "react-icons/tb";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";

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
    collectionsSort,
    setCollectionsSort,
    creatorCategory,
    setCreatorCategory,
    collectionCategory,
    setCollectionCategory,
    totalVolumeOrder,
    setTotalVolumeOrder,
    oneDayChangeOrder,
    setOneDayChangeOrder,
    thirtyDayChangeOrder,
    setThirtyDayChangeOrder,
    sevenDayChangeOrder,
    setSevenDayChangeOrder,
    ownersOrder,
    setOwnersOrder,
    itemsOrder,
    setItemsOrder,
    collectionNameOrder,
    setCollectionNameOrder,
  } = useContext(UtilitiesContext);
  const [status, setStatus] = useState<boolean>(false);
  const collectionsSortMenu = [
    "Total Volume",
    "Price Low to High",
    "Price High to Low",
    "24h %",
    "3d %",
    "7d %",
    "Owners",
    "Items",
    "Collection Name",
  ];
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
    case "sortCreators":
      menus = collectionsSortMenu;
      title = creatorsSort ? "Sort: " + creatorsSort : "Sort";
      break;
    case "sortCollections":
      menus = collectionsSortMenu;
      title = collectionsSort ? (
        <>
          <BiSortAlt2 className="text-gray-400" />
          <span className="ellipsis max-w-[90px]">{collectionsSort}</span>
        </>
      ) : (
        "Sort"
      );
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

  const resetOrder = () => {
    setTotalVolumeOrder("desc");
    setOneDayChangeOrder("desc");
    setThirtyDayChangeOrder("desc");
    setSevenDayChangeOrder("desc");
    setOwnersOrder("desc");
    setItemsOrder("desc");
    setCollectionNameOrder("asc");
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
        //setCollectionsSort("");
        if (collectionsSort == menu) {
          setSortAction(true);
        } else {
          resetOrder();
          setSortAction(true);
          setCollectionsSort(menu);
        }
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
    setCollectionsSort("Total Volume");
    setCreatorCategory("All");
    setCollectionCategory("All");
  }, []);

  const toggleDropdownHandler = () => {
    setStatus(!status);
  };

  const dropdownClass = !status && "hidden";
  return (
    <>
      <div className="relative inline-block text-left z-10 mb-4">
        <div>
          <button
            type="button"
            className="inline-flex items-center  gap-2 justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 capitalize"
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
          className={`absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${dropdownClass} ${possitionClass}`}
          role="menu"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {menus &&
              menus.map((menu, index) => (
                <button
                  className="text-gray-700 block px-4 py-2 text-sm capitalize w-full text-left"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-0"
                  onClick={() => {
                    onChangeHandler(menu);
                  }}
                  key={index}
                >
                  {menu}
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

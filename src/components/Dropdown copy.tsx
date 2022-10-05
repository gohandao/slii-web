import React, { useState, useEffect, useContext } from "react";
import { useQueryState } from "next-usequerystate";

import Link from "next/link";
import { BsFilter } from "react-icons/bs";
import { BiSortAlt2, BiCategory, BiFilterAlt } from "react-icons/bi";
import { TbUsers } from "react-icons/tb";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { useRouter } from "next/router";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";
import { Params } from "@/types/params";
import { setParams } from "@/utilities/setParams";

type Props = {
  position: "left" | "right";
  property:
    | "creatorType"
    | "collectionType"
    | "creatorSort"
    | "collectionSort"
    | "assetsDropdown";
};
export const Dropdown = ({ position, property }: Props) => {
  const router = useRouter();
  const { order, sortBy, term, page, type } = router.query;

  const [status, setStatus] = useState<boolean>(false);
  const assetsDropdown = ["All", "Buy now", "On auction", "Price low to high"];
  let menus = [] as string[];
  let title = "" as any;

  //メニュー表示
  switch (property) {
    case "assetsDropdown":
      menus = assetsDropdown;
      if (!type) {
        title = (
          <>
            <BsFilter className="text-gray-400" />
            All
          </>
        );
      } else {
        title = type ? (
          <>
            <BsFilter className="text-gray-400 capitalize" />
            {type}
          </>
        ) : (
          "Sort"
        );
      }
      break;
    case "creatorType":
      menus = ["all", "creator", "project"];
      if (!type) {
        title = (
          <>
            <TbUsers className="text-gray-400" />
            All
          </>
        );
      } else {
        title = (
          <>
            <TbUsers className="text-gray-400 capitalize" />
            {type}
          </>
        );
      }
      break;
    case "creatorSort":
      menus = ["popular", "newest", "name", "twitter"];
      if (!sortBy) {
        title = (
          <>
            <BiFilterAlt className="text-gray-400" />
            Popular
          </>
        );
      } else {
        title = (
          <>
            <BiFilterAlt className="text-gray-400 capitalize" />
            {sortBy}
          </>
        );
      }
      break;
    case "collectionType":
      menus = ["all", "handmade", "generative", "utilities"];
      if (!type) {
        title = (
          <>
            <BiCategory className="text-gray-400" />
            All
          </>
        );
      } else {
        title = (
          <>
            <BiCategory className="text-gray-400 capitalize" />
            {type}
          </>
        );
      }
      break;
    case "collectionSort":
      menus = [
        "popular",
        "newest",
        "name",
        "floor price",
        "total volume",
        "30d volume",
        "7d volume",
        "24h volume",
        "owners",
        "itens",
        "twitter",
        "duscord",
      ];
      if (!sortBy) {
        title = (
          <>
            <BiFilterAlt className="text-gray-400" />
            Popular
          </>
        );
      } else {
        title = (
          <>
            <BiFilterAlt className="text-gray-400 capitalize" />
            {sortBy}
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
    if (property == "creatorType") {
      let new_type;
      if (title != "all") {
        new_type = title;
      }
      setParams({
        type: new_type,
        sortBy: sortBy && (sortBy as string),
        order: order ? (order as string) : "desc",
      });
    }
    if (property == "creatorSort") {
      let new_sortBy = title;
      if (title == "newest") {
        new_sortBy = "created_at";
      }
      setParams({
        type: type && (type as string),
        sortBy: new_sortBy,
        order: order ? (order as string) : "desc",
      });
    }
    if (property == "collectionType") {
      let new_type;
      if (title != "all") {
        new_type = title;
      }
      setParams({
        type: new_type,
        sortBy: sortBy && (sortBy as string),
        order: order ? (order as string) : "desc",
      });
    }
    if (property == "collectionSort") {
      let new_sortBy = title;
      if (title == "newest") {
        new_sortBy = "created_at";
      }
      setParams({
        type: type && (type as string),
        sortBy: new_sortBy,
        order: order ? (order as string) : "desc",
      });
    }
    setStatus(false);
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
              menus.map((menu, index) => (
                <button
                  className="text-gray-300 block px-4 py-[11px] text-sm capitalize w-full text-left border-b border-gray-600 last:border-b-0"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-0"
                  onClick={() => {
                    updateParamsHandler(menu);
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

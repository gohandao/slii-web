import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { BiSearchAlt, BiSearchAlt2 } from "react-icons/bi";
import { setParams } from "@/utilities/setParams";
import { IoSearchCircleSharp } from "react-icons/io5";

export const Searchbox = () => {
  const router = useRouter();
  const { order, sort, term, page, type, search, tab } = router.query;

  const { keyword, setKeyword } = useContext(UtilitiesContext);

  useEffect(() => {
    search && search.length > 0 && !keyword && setKeyword(search as string);
  }, []);
  useEffect(() => {
    setParams({
      type: type && (type as string),
      sort: sort && (sort as string),
      order: order && (order as string),
      term: term && (term as string),
      search: keyword && (keyword as string),
      tab: tab && (tab as string),
    });
  }, [keyword]);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    // setTimeout(() => {
    //   setParams({
    //     type: type && (type as string),
    //     sort: sort && (sort as string),
    //     order: order && (order as string),
    //     term: term && (term as string),
    //     search: keyword && (keyword as string),
    //   });
    // }, 3000);
  };

  // const searchHandler = () => {
  //   if (search && search.length > 0) {
  //     // router.push(`/search/${search}`);
  //     setParams({
  //       type: type && (type as string),
  //       sort: sort && (sort as string),
  //       order: order && (order as string),
  //       term: term && (term as string),
  //       search: search && (search as string),
  //     });
  //   }
  // };
  return (
    <>
      <div className="relative w-full rounded-lg overflow-hidden flex-1">
        <input
          type="text"
          name=""
          id=""
          placeholder="Keyword search"
          value={keyword}
          onChange={(e) => {
            onChangeText(e);
          }}
          // onKeyPress={(e) => {
          //   if (e.key == "Enter") {
          //     searchHandler();
          //   }
          // }}
          className="block w-full py-[11px] pl-4 sm:pl-12 pr-4 text-base text-gray-400 rounded-lg bg-gray-800"
        />
        <BiSearchAlt2 className="absolute left-[16px] top-[14px] text-gray-400 text-xl hidden sm:inline-block" />
        {/* <button
          className="absolute right-0 top-0 w-10 flex h-full justify-center items-center bg-blue-500"
          onClick={() => {
            searchHandler();
          }}
        >
          <BiSearchAlt className="text-white" />
        </button> */}
      </div>
    </>
  );
};

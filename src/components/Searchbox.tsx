import React, { useState, useContext } from "react";
import { useRouter } from "next/router";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { BiSearchAlt } from "react-icons/bi";

export const Searchbox = () => {
  const router = useRouter();

  const { search, setSearch } = useContext(UtilitiesContext);
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    //console.log("search");
    //console.log(search);
  };

  const searchHandler = () => {
    if (search && search.length > 0) {
      router.push(`/search/${search}`);
    }
  };
  return (
    <>
      <div className="relative w-full rounded-lg overflow-hidden">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search creators or collectons"
          value={search}
          onChange={(e) => {
            onChangeText(e);
          }}
          onKeyPress={(e) => {
            if (e.key == "Enter") {
              searchHandler();
            }
          }}
          className="block w-full py-[10px] pl-5 pr-4 text-base text-gray-900 bg-white rounded-lg border-2 border-gray-100 bg-blue-50"
        />
        <button
          className="absolute right-0 top-0 w-10 flex h-full justify-center items-center bg-blue-500"
          onClick={() => {
            searchHandler();
          }}
        >
          <BiSearchAlt className="text-white" />
        </button>
      </div>
    </>
  );
};

import React, { useState, useContext } from "react";
import { useRouter } from "next/router";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { BiSearchAlt } from "react-icons/bi";

export const Searchbox = () => {
  const router = useRouter();

  const { search, setSearch } = useContext(UtilitiesContext);
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log("search");
    console.log(search);
  };

  const searchHandler = () => {
    router.push(`/search/${search}`);
  };
  return (
    <>
      <div className="relative w-full  rounded-lg overflow-hidden">
        <input
          type="text"
          name=""
          id=""
          placeholder="Creators, collectons, NFTs"
          value={search}
          onChange={(e) => {
            onChangeText(e);
          }}
          className="block w-full py-2 pl-5 pr-4 text-base text-gray-900 bg-white  rounded-lg border-2 border-gray-900 bg-blue-50"
        />
        <button
          className="absolute right-0 top-0 w-10 flex h-full justify-center items-center bg-gray-900"
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

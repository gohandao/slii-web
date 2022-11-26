import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { BiSearchAlt, BiSearchAlt2 } from "react-icons/bi";
import { setParams } from "@/utilities/setParams";
import { IoSearchCircleSharp } from "react-icons/io5";

type Props = {
  id: string;
  property?: "default" | "nft";
};
export const Searchbox = ({ id, property }: Props) => {
  const router = useRouter();
  const { order, sort, term, page, type, search, tab, screen } = router.query;
  const { hiddenParams } = useContext(UtilitiesContext);
  const [value, setValue] = useState<string>("");

  const { keyword, setKeyword, NFTKeyword, setNFTKeyword } =
    useContext(UtilitiesContext);
  const currentKeyword = property == "nft" ? NFTKeyword : keyword;

  useEffect(() => {
    if (property == "nft") {
      if (search && search.length > 0 && !NFTKeyword) {
        setNFTKeyword(search && typeof search == "string" ? search : "");
        setValue(search && typeof search == "string" ? search : "");
      }
    } else {
      if (hiddenParams?.search && hiddenParams.search.length > 0) {
        setKeyword(hiddenParams.search as string);
        setValue(hiddenParams.search as string);
      } else {
        setKeyword(search && typeof search == "string" ? search : "");
        setValue(search && typeof search == "string" ? search : "");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (property == "nft") {
      setNFTKeyword(value);
    } else {
      setKeyword(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setParams({
      type: type && (type as string),
      sort: sort && (sort as string),
      order: order && (order as string),
      term: term && (term as string),
      search: e.target.value && (e.target.value as string),
      tab: tab && (tab as string),
      screen: screen && (screen as string),
    });
  };

  // const inputElement = useRef<HTMLInputElement | null>(null);
  // useEffect(() => {
  //   if (inputElement.current && autofocus == true) {
  //     inputElement.current.focus();
  //   }
  // }, []);
  return (
    <>
      <div className="relative w-full flex-1 overflow-hidden rounded-lg">
        <input
          type="text"
          name={id}
          id={id}
          placeholder="Keyword search"
          value={value}
          onChange={(e) => {
            onChangeText(e);
          }}
          // onKeyPress={(e) => {
          //   if (e.key == "Enter") {
          //     searchHandler();
          //   }
          // }}
          className="block w-full rounded-lg bg-gray-800 py-[11px] pl-4 pr-4 text-base text-gray-400 sm:pl-12"
        />
        <BiSearchAlt2 className="absolute left-[16px] top-[14px] hidden text-xl text-gray-400 sm:inline-block" />
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

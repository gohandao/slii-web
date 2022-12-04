import { useRouter } from "next/router";
import type { FC } from "react";
import { useContext, useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { setParams } from "@/utilities/setParams";

type Props = {
  id: string;
  property?: "default" | "nft";
};
export const Searchbox: FC<Props> = ({ id, property }) => {
  const router = useRouter();
  const { order, screen, search, sort, tab, term, type } = router.query;
  const { hiddenParams } = useContext(UtilitiesContext);
  const [value, setValue] = useState<string>("");

  const { NFTKeyword, setKeyword, setNFTKeyword } = useContext(UtilitiesContext);

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
      order: order && (order as string),
      screen: screen && (screen as string),
      search: e.target.value && (e.target.value as string),
      sort: sort && (sort as string),
      tab: tab && (tab as string),
      term: term && (term as string),
      type: type && (type as string),
    });
  };

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
          className="block w-full rounded-lg bg-gray-800 py-[11px] pl-4 pr-4 text-base text-gray-400 sm:pl-12"
        />
        <BiSearchAlt2 className="absolute left-[16px] top-[14px] hidden text-xl text-gray-400 sm:inline-block" />
      </div>
    </>
  );
};

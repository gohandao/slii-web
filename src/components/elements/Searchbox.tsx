import { useAtom } from "jotai";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

import { collectionsKeywordAtom, combinedKeywordAtom, creatorsKeywordAtom } from "@/state/utilities.state";

type Props = {
  id: string;
};
export const Searchbox: FC<Props> = ({ id }) => {
  const router = useRouter();
  const current_path = router.pathname;
  const [combinedKeyword, setCombinedKeyword] = useAtom(combinedKeywordAtom);
  const [creatorsKeyword, setCreatorsKeyword] = useAtom(creatorsKeywordAtom);
  const [collectionsKeyword, setCollectionsKeyword] = useAtom(collectionsKeywordAtom);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    switch (current_path) {
      case "/":
        combinedKeyword && setValue(combinedKeyword);
        break;
      case "/creators":
        creatorsKeyword && setValue(creatorsKeyword);
        break;
      case "/colelctions":
        collectionsKeyword && setValue(collectionsKeyword);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  useEffect(() => {
    switch (current_path) {
      case "/":
        setCombinedKeyword(value);
        break;
      case "/creators":
        setCreatorsKeyword(value);
        break;
      case "/colelctions":
        setCollectionsKeyword(value);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="relative w-full flex-1 overflow-hidden rounded-lg">
        <input
          type="text"
          name={id}
          id={id}
          placeholder="Input keyword"
          value={value}
          onChange={(e) => {
            onChangeText(e);
          }}
          className="block w-full rounded-lg border bg-gray-50 py-[11px] pl-4 pr-4 text-base  sm:pl-12"
        />
        <BiSearchAlt2 className="absolute left-[16px] top-[14px] hidden text-xl text-gray-600 sm:inline-block" />
      </div>
    </>
  );
};

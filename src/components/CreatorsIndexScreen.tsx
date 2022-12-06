// kata: indexページの主な内容
import type { FC } from "react";
import { useContext, useEffect, useState } from "react";
import { IoMdSync } from "react-icons/io";

import { CreatorList } from "@/components/CreatorList";
import { Dropdown } from "@/components/Dropdown";
import { OrderButton } from "@/components/OrderButton";
import { Pagination } from "@/components/Pagination";
import { Searchbox } from "@/components/Searchbox";
import { TabIndex } from "@/components/TabIndex";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { sortList } from "@/libs/sortList";
import type { Creator } from "@/types/creator";
import type { Params } from "@/types/params";

type Props = {
  params: Params;
};
export const CreatorsIndexScreen: FC<Props> = ({ params }) => {
  const { order, page, search, sort, term, type } = params;
  const currentPage = page ? Number(page) : 1;
  const limit = 100;
  const { creators } = useContext(BaseContext);
  const { hiddenParams, setTempCreators, tempCreators } = useContext(UtilitiesContext);

  const [sortedCreators, setSortedCreators] = useState<Creator[]>([]);
  const [checkInitial, setCheckInitial] = useState<boolean>(false);

  const currentCreators = tempCreators.length > 0 && !checkInitial ? tempCreators : sortedCreators;
  const filteredCreators =
    type && type != "all"
      ? creators.filter((creator) => {
          return creator.type === type;
        })
      : creators;

  const uppperKeyword = typeof search == "string" && search.toUpperCase();
  //1.match username
  const searchedCreators01 = uppperKeyword
    ? filteredCreators.filter((creator) => {
        return (
          typeof search == "string" &&
          //すべて大文字にして大文字小文字の区別をなくす
          creator.username != null &&
          creator.username.toUpperCase().includes(uppperKeyword) == true
        );
      })
    : filteredCreators;
  // //2.match description
  // const searchedCreators02 = filteredCreators.filter(
  //   (creator) =>
  //     typeof search == "string" &&
  //     //@ts-ignore
  //     creator.description &&
  //     //@ts-ignore
  //     creator.description.toUpperCase().includes(uppperKeyword) == true
  // );
  const origin_searchedCreators = [
    ...searchedCreators01,
    // ...searchedCreators02,
  ];
  //重複削除
  const searchedCreators =
    search && search.length > 0 ? Array.from(new Set(origin_searchedCreators)) : filteredCreators;

  const args = {
    limit: limit,
    list: searchedCreators,
    order: order as "desc" | "asc" | undefined,
    page: currentPage,
    property: "creators" as "creators" | "collections",
    sort: sort as string | undefined,
    term: term as "24h" | "7d" | "30d" | "all" | undefined,
  };
  //モーダルを閉じた際の処理
  if (
    tempCreators.length == 0 &&
    hiddenParams.page != page &&
    hiddenParams.order != order &&
    hiddenParams.sort != sort &&
    hiddenParams.term != term &&
    creators.length > 0 &&
    !checkInitial
  ) {
    const data = sortList(args);
    setSortedCreators(() => {
      return data;
    });
  }
  if (!checkInitial) setCheckInitial(true);

  useEffect(() => {
    if (checkInitial && creators.length > 0) {
      const data = sortList(args);
      setSortedCreators(() => {
        return data;
      });
      setTempCreators(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, page, search, order, sort, term]);

  return (
    <>
      <section className="mx-auto px-5 lg:px-8">
        <div>
          <TabIndex />
        </div>
        <div className="mb-2 flex gap-3">
          <div className="flex w-full items-baseline justify-between gap-3">
            <p className="text-sm text-gray-500">{searchedCreators.length} Creators</p>
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <IoMdSync />
              every 24h
            </p>
          </div>
        </div>
        <div className="relative z-20 mb-3 flex justify-between gap-3 sm:gap-5">
          <Dropdown position="left" property="creatorType" />
          <Searchbox id="creator" />
          <div className="flex items-center gap-3">
            <Dropdown position="right" property="creatorSort" />
            <OrderButton />
          </div>
        </div>
        <div className="mb-10">
          {searchedCreators.length > 0 && <CreatorList creators={currentCreators} limit={limit} />}
        </div>
        <div className="flex justify-center">
          <Pagination currentPage={currentPage} length={searchedCreators.length} limit={limit} />
        </div>
      </section>
    </>
  );
};

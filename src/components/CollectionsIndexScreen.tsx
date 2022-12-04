import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { IoMdSync } from "react-icons/io";

import { CollectionList } from "@/components/CollectionList";
import { Dropdown } from "@/components/Dropdown";
import { OrderButton } from "@/components/OrderButton";
import { Pagination } from "@/components/Pagination";
import { Searchbox } from "@/components/Searchbox";
import { TabIndex } from "@/components/TabIndex";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { sortList } from "@/libs/sortList";
import type { Collection } from "@/types/collection";

export const CollectionsIndexScreen = () => {
  const router = useRouter();
  const { order, page, search, sort, term, type } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 100;
  const [sortedCollections, setSortedCollections] = useState<Collection[]>([]);
  const [checkInitial, setCheckInitial] = useState<boolean>(false);

  const { collections } = useContext(BaseContext);
  const { hiddenParams, setTempCollections, tempCollections } = useContext(UtilitiesContext);

  const currentCollections = tempCollections.length > 0 && !checkInitial ? tempCollections : sortedCollections;

  const filteredCollections =
    type && type != "all"
      ? collections.filter((collection) => {
          return collection.type === type;
        })
      : collections;

  const uppperKeyword = typeof search == "string" && search.toUpperCase();
  //1.match username
  const searchedCollections01 = filteredCollections.filter((collection) => {
    return (
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      collection.name.toUpperCase().includes(uppperKeyword) == true
    );
  });
  const origin_searchedCollections = [
    ...searchedCollections01,
    // ...searchedCreators02,
  ];
  //重複削除
  let searchedCollections = [] as Collection[];
  if (search && search.length > 0) {
    searchedCollections = Array.from(new Set(origin_searchedCollections));
  } else {
    searchedCollections = filteredCollections;
  }

  const args = {
    //category: collectionsSort,
    limit: limit,
    list: searchedCollections,
    order: order as "desc" | "asc" | undefined,
    page: currentPage,
    property: "collections" as "creators" | "collections",
    sort: sort as string | undefined,
    term: term as "24h" | "7d" | "30d" | "all" | undefined,
  };
  //モーダルを閉じた際の処理
  if (
    hiddenParams.page != page &&
    hiddenParams.order != order &&
    hiddenParams.sort != sort &&
    hiddenParams.term != term &&
    !checkInitial
  ) {
    const data = sortList(args);
    setSortedCollections(() => {
      return data;
    });
  }
  if (!checkInitial) {
    setCheckInitial(true);
  }
  useEffect(() => {
    if (tempCollections.length == 0 || checkInitial) {
      const data = sortList(args);
      setSortedCollections(() => {
        return data;
      });
      setTempCollections(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collections, order, sort, term, page, type]);

  return (
    <section className="mx-auto px-5 lg:px-8">
      <div className="">
        <TabIndex />
      </div>
      <div className="mb-2 flex gap-3">
        <div className="flex w-full items-baseline justify-between gap-3">
          <p className="text-sm text-gray-500">{searchedCollections.length} Collections</p>
          <p className="flex items-center gap-2 text-sm text-gray-500">
            <IoMdSync />
            every 24h
          </p>
        </div>
      </div>
      <div className="relative z-20 mb-3 flex justify-between gap-3 sm:gap-5">
        <Dropdown position="left" property="collectionType" />
        <Searchbox id="collection" />
        <div className="flex items-center gap-3">
          <Dropdown position="right" property="collectionSort" />
          <OrderButton />
        </div>
      </div>
      <div className="mb-10">
        {searchedCollections.length > 0 && <CollectionList collections={currentCollections} limit={limit} />}
      </div>
      <div className="flex justify-center">
        <Pagination currentPage={currentPage} length={searchedCollections.length} limit={limit} />
      </div>
    </section>
  );
};

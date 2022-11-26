import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useState, useEffect, useContext } from "react";

import { CreatorList } from "@/components/CreatorList";
import { CollectionTable } from "@/components/CollectionTable";
import { SearchArea } from "@/components/SearchArea";

import { BreadCrumbs } from "@/components/BreadCrumbs";

import { Mainvisual } from "@/components/Mainvisual";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { Hr } from "@/components/Hr";
import { Title } from "@/components/Title";
import { LinkButton } from "@/components/LinkButton";

import { TagList } from "@/components/TagList";

import { CreatorsContext } from "@/contexts/CreatorsContext";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { Tag } from "@/types/tag";
import { Searchbox } from "@/components/Searchbox";
import { Tab } from "@/components/Tab";
import { Dropdown } from "@/components/Dropdown";
import { OrderButton } from "@/components/OrderButton";
import { CollectionList } from "@/components/CollectionList";
import { Collection } from "@/types/collection";
import { sortList } from "@/libs/sortList";
import { TabIndex } from "@/components/TabIndex";
import { Params } from "@/types/params";
import { JP } from "country-flag-icons/react/3x2";
import { Creator } from "@/types/creator";

type Props = {
  params: Params;
};
export const CollectionsIndexScreen = ({ params }: Props) => {
  const router = useRouter();
  const { order, sort, term, page, type, search, screen } = router.query;
  const currentPage = page ? Number(page) : 1;
  const currentPath = router.pathname;
  const limit = 10;
  const [sortedCollections, setSortedCollections] = useState<Collection[]>([]);
  const [checkInitial, setCheckInitial] = useState<boolean>(false);

  const { creators, collections, tags } = useContext(BaseContext);
  const { setHeaderIcon, tempCollections, setTempCollections, hiddenParams } =
    useContext(UtilitiesContext);

  const currentCollections =
    tempCollections.length > 0 && !checkInitial
      ? tempCollections
      : sortedCollections;

  const filteredCollections =
    type && type != "all"
      ? collections.filter((collection) => collection.type === type)
      : collections;

  const uppperKeyword = typeof search == "string" && search.toUpperCase();
  //1.match username
  const searchedCollections01 = filteredCollections.filter(
    (collection) =>
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      //@ts-ignore
      collection.name.toUpperCase().includes(uppperKeyword) == true
  );
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
    property: "collections" as "creators" | "collections",
    list: searchedCollections,
    page: currentPage,
    order: order as "desc" | "asc" | undefined,
    sort: sort as string | undefined,
    term: term as "24h" | "7d" | "30d" | "all" | undefined,
    //category: collectionsSort,
    limit: limit,
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
    setSortedCollections((sortedCollections) => data);
  }
  if (!checkInitial) {
    setCheckInitial(true);
  }
  useEffect(() => {
    if (tempCollections.length == 0 || checkInitial) {
      const data = sortList(args);
      setSortedCollections((sortedCollections) => data);
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
        <div className="flex items-baseline gap-3">
          <p className="text-sm text-gray-500">
            {searchedCollections.length} Collections
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
        {searchedCollections.length > 0 && (
          <CollectionList collections={currentCollections} limit={limit} />
        )}
      </div>
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          length={searchedCollections.length}
          limit={limit}
        />
      </div>
    </section>
  );
};

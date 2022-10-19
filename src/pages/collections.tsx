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
import { ShowMore } from "@/components/ShowMore";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { IndexTab } from "@/components/IndexTab";
import { Hr } from "@/components/Hr";
import { Title } from "@/components/Title";
import { LinkButton } from "@/components/LinkButton";

import { TagList } from "@/components/TagList";

import {
  CreatorTagsContext,
  CollectionTagsContext,
} from "@/contexts/TagsContext";
import { CreatorsContext } from "@/contexts/CreatorsContext";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { Tag } from "@/types/tag";
import { Searchbox } from "@/components/Searchbox";
import { AllList } from "@/components/AllList";
import { Tab } from "@/components/Tab";
import { SplitLayout } from "@/components/SplitLayout";
import { Dropdown } from "@/components/Dropdown";
import { OrderButton } from "@/components/OrderButton";
import { CollectionList } from "@/components/CollectionList";
import { Collection } from "@/types/collection";
import { sortList } from "@/libs/sortList";

const CollectionsPage: NextPage = () => {
  const router = useRouter();
  const { order, sort, term, page, type, search } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 10;
  const [sortedCollections, setSortedCollections] = useState<Collection[]>([]);

  const { creators, collections, OSCollections, creatorTags, collectionTags } =
    useContext(BaseContext);
  const { setHeaderIcon, setBreadcrumbList } = useContext(UtilitiesContext);

  const filteredCollections =
    type && type != "all"
      ? OSCollections.filter((collection) => collection.type === type)
      : OSCollections;

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

  useEffect(() => {
    const data = sortList(args);
    setSortedCollections((sortedCollections) => data);
  }, [OSCollections, order, sort, term, page, type, search]);

  const breadcrumbList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Collections",
      path: "/collections",
    },
  ];
  useEffect(() => {
    setHeaderIcon({
      title: "",
      emoji: "",
      avatar: "",
      path: "/",
    });
    setBreadcrumbList(breadcrumbList);
  }, []);

  return (
    <div>
      <Head>
        <title>
          NFT OTAKU | Search Japanese NFT creators, projects, collections.
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SplitLayout>
        <section className="mx-auto">
          <div className="relative flex gap-5 z-20 justify-between mb-3">
            <Dropdown position="left" property="collectionType" />
            <div className="flex items-center gap-3">
              <Dropdown position="right" property="collectionSort" />
              <OrderButton />
            </div>
          </div>
          <div className="flex gap-3 mb-2">
            <div className="flex gap-3 items-baseline">
              <p className="text-gray-500 text-sm">
                {searchedCollections.length} Collections
              </p>
            </div>
          </div>
          <div className="mb-6">
            {searchedCollections.length > 0 && (
              <CollectionList collections={sortedCollections} limit={limit} />
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
      </SplitLayout>
    </div>
  );
};

export default CollectionsPage;

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";

import { CreatorList } from "@/components/CreatorList";
import { CollectionTable } from "@/components/CollectionTable";
import { SearchArea } from "@/components/SearchArea";

import { Mainvisual } from "@/components/Mainvisual";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { Hr } from "@/components/Hr";
import { Title } from "@/components/Title";
import { LinkButton } from "@/components/LinkButton";

import { Dropdown } from "@/components/Dropdown";

import { CreatorsContext } from "@/contexts/CreatorsContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { Headline } from "@/components/Headline";
import { BreadCrumbs } from "@/components/BreadCrumbs";
import { TermSort } from "@/components/TermSort";
import { Searchbox } from "@/components/Searchbox";
import { TbDiamond } from "react-icons/tb";
import { NextSeo } from "next-seo";
const StatsPage: NextPage = () => {
  const router = useRouter();
  const { order, sort, term, page, type, search } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 10;

  const { setBreadcrumbList, setHeaderIcon } = useContext(UtilitiesContext);
  // const breadcrumbList = [
  //   {
  //     name: "Home",
  //     path: "/",
  //   },
  //   {
  //     name: "Collection stats",
  //     path: "/stats",
  //   },
  // ];
  useEffect(() => {
    setHeaderIcon({
      title: "Collection stats",
      emoji: "",
      element: <TbDiamond />,
      avatar: "",
      path: "/stats",
    });
    // setBreadcrumbList(breadcrumbList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { creators, collections } = useContext(BaseContext);

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
  //const [collectionsMenu, setCollectionMenu] =
  //useState<string[]>(collectionsMenus);

  return (
    <div>
      <NextSeo
        title="NFT Collection Stats in Japan | NFT OTAKU"
        description="Search and analize various Japanese NFT collections."
        openGraph={{
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/stats",
          title: "NFT Collection Stats in Japan | NFT OTAKU",
          description: "Search and analize various Japanese NFT collections.",
        }}
      />
      <BaseLayout>
        <section className="mx-auto px-5 md:px-8 mt-3">
          <h1 className="text-gray-500 text-sm tracking-[0.2em] mb-3">
            Japanese awesome NFT collections stats.
          </h1>
          {collections && (
            <p className="text-gray-500 mb-2 text-sm">
              {collections.length} collections
            </p>
          )}
          <div className="flex gap-3 sm:gap-5 justify-between items-center mb-4">
            <Dropdown position="left" property="collectionType" />
            <Searchbox id="collection" />
            <div className="hidden md:flex">
              <TermSort term={term as string} />
            </div>
            <div className="flex md:hidden">
              <Dropdown position="right" property="term" />
            </div>
          </div>
          <div className="mb-10">
            {searchedCollections && (
              <CollectionTable
                collections={searchedCollections}
                limit={limit}
              />
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
      </BaseLayout>
    </div>
  );
};

export default StatsPage;

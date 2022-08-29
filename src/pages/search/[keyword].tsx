import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import React, { useContext, useEffect } from "react";

import { CollectionsContext } from "@/contexts/CollectionsContext";

import { CreatorList } from "@/components/CreatorList";
import { CollectionTable } from "@/components/CollectionTable";
import { SearchArea } from "@/components/SearchArea";

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

import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { Tag } from "@/types/tag";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

const KeywordPage: NextPage = () => {
  const router = useRouter();
  const { keyword, page } = router.query;
  const { setBreadcrumbList } = useContext(UtilitiesContext);
  const breadcrumbList = keyword && [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Search",
      path: "/",
    },
    {
      name: keyword as string,
      path: `/search/${keyword as string}`,
    },
  ];
  useEffect(() => {
    breadcrumbList && setBreadcrumbList(breadcrumbList);
  }, []);
  const creators = useContext(CreatorsContext);
  const collections = useContext(CollectionsContext);

  const CreatorTags = useContext(CreatorTagsContext);
  const CollectionTags = useContext(CollectionTagsContext);

  const uppperKeyword = typeof keyword == "string" && keyword.toUpperCase();
  const filteredCreators01 = creators.filter(
    (item) =>
      typeof keyword == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      //@ts-ignore
      item.username.toUpperCase().includes(uppperKeyword) == true
  );
  const filteredCreators02 = creators.filter(
    (item) =>
      typeof keyword == "string" &&
      //@ts-ignore
      item.description &&
      //@ts-ignore
      item.description.toUpperCase().includes(uppperKeyword) == true
  );
  const origin_filteredCreators = [
    ...filteredCreators01,
    ...filteredCreators02,
  ];
  //重複削除
  const filteredCreators = Array.from(new Set(origin_filteredCreators));

  const filteredCollections01 = collections.filter(
    (item) =>
      typeof keyword == "string" &&
      //@ts-ignore
      item.name.toUpperCase().includes(uppperKeyword) == true
  );
  const filteredCollections = Array.from(new Set(filteredCollections01));
  console.log("filteredCollections");
  console.log(filteredCollections01);
  console.log(filteredCollections);

  const creatorsLength = filteredCreators && filteredCreators.length;
  const collectionsLength = filteredCollections && filteredCollections.length;

  return (
    <div>
      <Head>
        <title>Gachi | Search your favorite anime op and ed animation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout>
        <section className="mx-auto px-5 md:px-8 mt-5 lg:mt-10">
          <h1 className="text-gray-100">
            Resulut of{" "}
            <span className="text-3xl ml-1 text-bold">{keyword}</span>
          </h1>
        </section>
        <section className="mx-auto px-5 md:px-8 mt-5">
          <div className="flex gap-3 mb-4">
            <div className="flex items-center">
              <div className="animated-dot"></div>
            </div>
            <div className="flex gap-3 items-baseline">
              <Title property="h2" addClass="">
                Creators
              </Title>
              <p className="text-gray-400 text-sm">{creatorsLength} Creators</p>
            </div>
          </div>
          <div className="mb-10">
            {filteredCreators && filteredCreators.length > 0 ? (
              <CreatorList creators={filteredCreators} />
            ) : (
              <p className="text-gray-100">Not found.</p>
            )}{" "}
          </div>
        </section>
        <section className="mx-auto px-5 md:px-8 mt-5">
          <div className="flex gap-3 mb-4">
            <div className="flex items-center">
              <div className="animated-dot"></div>
            </div>
            <div className="flex gap-3 items-baseline">
              <Title property="h2" addClass="">
                Collections
              </Title>
              <p className="text-gray-400 text-sm">
                {collectionsLength} Collections
              </p>
            </div>
          </div>
          <div className="mb-10">
            {filteredCollections && filteredCollections.length > 0 ? (
              <CollectionTable collections={filteredCollections} />
            ) : (
              <p className="text-gray-100">Not found.</p>
            )}
          </div>
        </section>
        {/*<div className="flex flex-col gap-10 px-5 mx-auto max-w-7xl">
          <div className="mx-auto">
            <ShowMore currentPage={page ? Number(page) : 1} />
          </div>
  </div>*/}
      </BaseLayout>
    </div>
  );
};

export default KeywordPage;

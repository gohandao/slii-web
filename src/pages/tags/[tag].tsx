import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "node:querystring";
import TagsJson from "@/json/tags.json";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import React, { useContext, useEffect, useState } from "react";

import { CreatorsContext } from "@/contexts/CreatorsContext";
import { BaseContext } from "@/contexts/BaseContext";

import { CreatorList } from "@/components/CreatorList";
import { CollectionTable } from "@/components/CollectionTable";
import { SearchArea } from "@/components/SearchArea";

import { Mainvisual } from "@/components/Mainvisual";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { Hr } from "@/components/Hr";
import { Title } from "@/components/Title";
import { LinkButton } from "@/components/LinkButton";
import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { TabIndex } from "@/components/TabIndex";
import { CollectionList } from "@/components/CollectionList";
import { Dropdown } from "@/components/Dropdown";
import { Searchbox } from "@/components/Searchbox";
import { OrderButton } from "@/components/OrderButton";
import { sortList } from "@/libs/sortList";
import { NextSeo } from "next-seo";

const TagPage: NextPage = (props: any) => {
  const router = useRouter();
  const { tag, tab, order, sort, term, page, type, search } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 10;

  const { creators, collections } = useContext(BaseContext);

  const [sortedCreators, setSortedCreators] = useState<Creator[]>([]);
  const [sortedCollections, setSortedCollections] = useState<Collection[]>([]);

  const { setHeaderIcon } = useContext(UtilitiesContext);
  useEffect(() => {
    setHeaderIcon({
      // title: ("#" + tag) as string,
      title: "Tags",
      emoji: "",
      avatar: "",
      path: `/tags`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1.filtered creators
  const uppperKeyword = typeof search == "string" && search.toUpperCase();

  const filteredCreators01 = creators.filter(
    //@ts-ignore
    (item) => item.tags && item.tags.includes(tag) == true
  );
  const filteredCreators02 =
    type && type != "all"
      ? filteredCreators01.filter((creator) => creator.type === type)
      : filteredCreators01;

  const filteredCreators = filteredCreators02;

  //1.match username
  const searchedCreators01 = filteredCreators.filter(
    (creator) =>
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      //@ts-ignore
      creator.username.toUpperCase().includes(uppperKeyword) == true
  );
  const origin_searchedCreators = [
    ...searchedCreators01,
    // ...searchedCreators02,
  ];
  //重複削除
  let searchedCreators = [] as Creator[];
  if (search && search.length > 0) {
    searchedCreators = Array.from(new Set(origin_searchedCreators));
  } else {
    searchedCreators = filteredCreators;
  }

  const creators_args = {
    property: "creators" as "creators" | "collections",
    list: searchedCreators,
    page: currentPage,
    order: order as "desc" | "asc" | undefined,
    sort: sort as string | undefined,
    term: term as "24h" | "7d" | "30d" | "all" | undefined,
    //category: collectionsSort,
    limit: limit,
  };

  // 2.filtered collections
  const filteredCollections01 = collections.filter(
    //@ts-ignore
    (item) => item.tags && item.tags.includes(tag) == true
  );
  const filteredCollections02 =
    type && type != "all"
      ? filteredCollections01.filter((collection) => collection.type === type)
      : filteredCollections01;
  const filteredCollections = filteredCollections02;

  //1.match name
  const searchedCollections01 = filteredCollections.filter(
    (collection) =>
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      //@ts-ignore
      collection.name.toUpperCase().includes(uppperKeyword) == true
  );
  //1.match creator username
  const searchedCollections02 = filteredCollections.filter(
    (collection) =>
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      //@ts-ignore
      collection.creator_id.toUpperCase().includes(uppperKeyword) == true
  );
  const origin_searchedCollections = [
    ...searchedCollections01,
    ...searchedCollections02,
  ];
  //重複削除
  let searchedCollections = [] as Collection[];
  if (search && search.length > 0) {
    searchedCollections = Array.from(new Set(origin_searchedCollections));
  } else {
    searchedCollections = filteredCollections;
  }

  const collections_args = {
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
    if (tab != "collection") {
      const data = sortList(creators_args);
      setSortedCreators((sortedCreators) => data);
    } else {
      const data = sortList(collections_args);
      setSortedCollections((sortedCollections) => data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collections, creators, order, sort, term, page, type, search, tab]);

  return (
    <div>
      {/* <Head>
        <title>
          NFT OTAKU | Search Japanese NFT creators, projects, collections.
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <NextSeo
        title={props.title}
        description={props.description}
        openGraph={{
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/tags/" + tag,
          title: props.title,
          description: props.description,
        }}
      />
      <BaseLayout>
        <section className="mx-auto mt-5 px-5 md:px-8">
          <h1 className="mb-3 text-sm tracking-[0.2em] text-gray-500">
            Resulut of <span className="text-bold ml-1 text-3xl">#{tag}</span>
          </h1>
          <div className="mb- flex gap-3">
            <div className="flex items-baseline gap-3">
              <p className="text-sm text-gray-400">
                {searchedCreators.length} Creators, {searchedCollections.length}{" "}
                Collections
              </p>
            </div>
          </div>
          <div className="mb-2">
            <TabIndex property="tag" />
          </div>
          {tab != "collection" && (
            <div className="">
              <div className="relative z-20 mb-3 flex justify-between gap-3 sm:gap-5">
                <Dropdown position="left" property="collectionType" />
                <Searchbox id="creator" />
                <div className="flex items-center gap-3">
                  <Dropdown position="right" property="collectionSort" />
                  <OrderButton />
                </div>
              </div>
              <div className="mb-10">
                {sortedCreators && sortedCreators.length > 0 ? (
                  <CreatorList creators={sortedCreators} />
                ) : (
                  <p className="text-gray-100">Not found.</p>
                )}
              </div>
            </div>
          )}
          {tab == "collection" && (
            <div>
              {sortedCollections && sortedCollections.length > 0 ? (
                <CollectionList collections={sortedCollections} />
              ) : (
                <p className="text-gray-100">Not found.</p>
              )}
            </div>
          )}
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

export default TagPage;

export const getStaticPaths = async () => {
  // const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  // const response01 = await fetch(
  //   `https://api.airtable.com/v0/appFYknMhbtkUTFgt/creator_tags?api_key=${AIRTABLE_API_KEY}`
  // );
  // const response02 = await fetch(
  //   `https://api.airtable.com/v0/appFYknMhbtkUTFgt/collection_tags?api_key=${AIRTABLE_API_KEY}`
  // );
  // const json01 = await response01.json();
  // const json02 = await response02.json();
  // const tags = [...json01.records, ...json02.records];
  const tags = TagsJson;
  return {
    paths: tags.map((tag: any) => `/tags/${tag.name}`),
    //fallback: false,
    fallback: "blocking",
  };
};

type PathProps = {
  ogImageUrl: string;
};
type Params = ParsedUrlQuery & {
  slug: string;
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({
  params,
}) => {
  // const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  // const response01 = await fetch(
  //   `https://api.airtable.com/v0/appFYknMhbtkUTFgt/creator_tags?api_key=${AIRTABLE_API_KEY}`
  // );
  // const response02 = await fetch(
  //   `https://api.airtable.com/v0/appFYknMhbtkUTFgt/collection_tags?api_key=${AIRTABLE_API_KEY}`
  // );
  // const json01 = await response01.json();
  // const json02 = await response02.json();
  // const tags = [...json01.records, ...json02.records];
  const tags = TagsJson;
  const tag_name = params && params.tag;
  const filtered_tags = tags.filter((tag: any) => tag.name === tag_name);
  const tag = filtered_tags[0];
  let baseUrl;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }
  return {
    props: {
      // OGP画像は絶対URLで記述する必要があります
      title: `${tag.name}'s NFT creators and collections in Japan | NFT OTAKU`,
      description: `Check ${tag.name}'s NFT creators and collections in Japan now.`,
      ogImageUrl: `${baseUrl}/api/ogp?title=${tag}&label=Tags`,
      revalidate: 600,
    },
  };
};

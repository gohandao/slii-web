import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "node:querystring";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import React, { useContext, useEffect, useState } from "react";

import { CreatorsContext } from "@/contexts/CreatorsContext";
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
import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

const TagPage: NextPage = () => {
  const router = useRouter();
  const { tag, type } = router.query;

  const { setBreadcrumbList } = useContext(UtilitiesContext);
  const breadcrumbList = tag && [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Tags",
      path: "/tags",
    },
    {
      name: tag as string,
      path: `/tags/${tag as string}`,
    },
  ];
  useEffect(() => {
    breadcrumbList && setBreadcrumbList(breadcrumbList);
  }, []);
  const creators = useContext(CreatorsContext);
  const collections = useContext(CollectionsContext);

  const [filteredCreators, setFilteredCreators] = useState<Creator[]>();
  const [filteredCollections, setFilteredCollections] =
    useState<Collection[]>();

  useEffect(() => {
    const new_creators = creators.filter(
      //@ts-ignore
      (item) => item.tags && item.tags.includes(tag) == true
    );

    setFilteredCreators(new_creators);
    const new_collections = collections.filter(
      //@ts-ignore
      (item) => item.tags && item.tags.includes(tag) == true
    );
    setFilteredCollections(new_collections);
    //const filteredCollections = Array.from(new Set(filteredCollections01));
  }, [collections]);

  /*
  const filteredCreators = creators.filter(
    //@ts-ignore
    (item) => item.tags && item.tags.includes(tag) == true
  );
  const filteredCollections01 = collections.filter(
    //@ts-ignore
    (item) => item.tags && item.tags.includes(tag) == true
  );
  const filteredCollections = Array.from(new Set(filteredCollections01));
  */

  const creatorsLength = filteredCreators && filteredCreators.length;
  const collectionsLength = filteredCollections && filteredCollections.length;
  const testasync = async () => {
    const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;

    const response01 = await fetch(
      `https://api.airtable.com/v0/appFYknMhbtkUTFgt/creator_tags?api_key=${AIRTABLE_API_KEY}`
    );
    const response02 = await fetch(
      `https://api.airtable.com/v0/appFYknMhbtkUTFgt/collection_tags?api_key=${AIRTABLE_API_KEY}`
    );
    //const { records } = await response01.json();
    const json01 = await response01.json();
    const json02 = await response02.json();
    const tags = [...json01.records, ...json02.records];
    //const { records } = (await response01.json()) + response02.json();
    //const { records02 } = await response02.json();
    //console.log("zoo");
    //console.log(tags);
    //const tags = [records01, records02];
  };
  //testasync();
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
            Resulut of <span className="text-3xl ml-1 text-bold">#{tag}</span>
          </h1>
        </section>
        {type != "collection" && (
          <section className="mx-auto px-5 md:px-8 mt-5">
            <div className="flex gap-3 mb-4">
              <div className="flex items-center">
                <div className="animated-dot"></div>
              </div>
              <div className="flex gap-3 items-baseline">
                <Title property="h2" addClass="">
                  Creators
                </Title>
                <p className="text-gray-400 text-sm">
                  {creatorsLength} Creators
                </p>
              </div>
            </div>
            <div className="mb-10">
              {filteredCreators && filteredCreators.length > 0 ? (
                <CreatorList creators={filteredCreators} />
              ) : (
                <p className="text-gray-100">Not found.</p>
              )}
            </div>
          </section>
        )}
        {type != "creator" && (
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
        )}
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
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const response01 = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/creator_tags?api_key=${AIRTABLE_API_KEY}`
  );
  const response02 = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/collection_tags?api_key=${AIRTABLE_API_KEY}`
  );
  const json01 = await response01.json();
  const json02 = await response02.json();
  const tags = [...json01.records, ...json02.records];
  return {
    paths: tags.map((tag: any) => `/tags/${tag.fields.name}`),
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
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const response01 = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/creator_tags?api_key=${AIRTABLE_API_KEY}`
  );
  const response02 = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/collection_tags?api_key=${AIRTABLE_API_KEY}`
  );
  const json01 = await response01.json();
  const json02 = await response02.json();
  const tags = [...json01.records, ...json02.records];
  const tag_name = params && params.tag;
  const tag = tags.filter((tag: any) => tag.fields.name === tag_name);
  let baseUrl;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }
  return {
    props: {
      // OGP画像は絶対URLで記述する必要があります
      ogImageUrl: `${baseUrl}/api/ogp?key=${tag}&page=tags`,
      revalidate: 10,
    },
  };
};

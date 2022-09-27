import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";

import { ParsedUrlQuery } from "node:querystring";

import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { base } from "@/libs/airtable";

import { useRouter } from "next/router";

import { BaseContext } from "@/contexts/BaseContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";

import { CollectionCard } from "@/components/CollectionCard";
import { List } from "@/components/List";
import { ShowMore } from "@/components/ShowMore";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { IndexTab } from "@/components/IndexTab";
import { CreatorProfile } from "@/components/CreatorProfile";
import { Title } from "@/components/Title";
import { Custom404 } from "@/pages/404";

import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

const CreatorIndex: NextPage = (props: any) => {
  const router = useRouter();
  const { username } = router.query;
  const [creator, setCreator] = useState<Creator>();
  const [collectionSlug, setCollectionSlug] = useState<string>();

  const [collection, setCollection] = useState([]);

  const [loading, setLoading] = useState<boolean>(false);

  const { creators, collections, OSCollections } = useContext(BaseContext);
  // const collections = useContext(CollectionsContext);
  const { setHeaderIcon } = useContext(UtilitiesContext);
  let avatar_url = "" as string;
  if (creator && creator.avatar) {
    avatar_url =
      creator.avatar.length > 0
        ? //@ts-ignore
          creator.avatar[0].thumbnails.large.url
        : //@ts-ignore
          creator.avatar[0].url;
  }
  useEffect(() => {
    {
      creator &&
        setHeaderIcon({
          title: creator.username,
          emoji: "",
          avatar: avatar_url,
          path: `/creator/${creator.username}`,
        });
    }
  }, [creator]);
  const { setBreadcrumbList } = useContext(UtilitiesContext);
  const breadcrumbList = username && [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Creators",
      path: "/creators",
    },
    {
      name: username as string,
      path: `/creator/${username as string}`,
    },
  ];
  useEffect(() => {
    breadcrumbList && setBreadcrumbList(breadcrumbList);
  }, []);

  if (!creator && username && creators && creators.length > 0) {
    //set creator
    const creator_filter = creators.filter(
      (creator) => creator.username === username
    );
    if (creator_filter[0]) {
      setCreator(creator_filter[0]);
    }
  }
  if (!collection && username && OSCollections && OSCollections.length > 0) {
    //set collection
    const collection_filter = OSCollections.filter(
      (collection) => collection.creator_id === username
    );
    collection_filter.length > 0 && setCollection(collection_filter[0]);
  }
  useEffect(() => {
    if (username && creators && creators.length > 0) {
      //set creator
      const creator_filter = creators.filter(
        (creator) => creator.username === username
      );
      if (creator_filter[0]) {
        setCreator(creator_filter[0]);
      }
    }
    if (username && OSCollections && OSCollections.length > 0) {
      //set collection
      const collection_filter = OSCollections.filter(
        (collection) => collection.creator_id === username
      );
      collection_filter.length > 0 && setCollection(collection_filter[0]);
    }
  }, [username, collections]);
  [username, collections];

  return (
    <>
      <NextSeo
        title={props.title}
        description={props.description}
        openGraph={{
          type: "article",
          title: props.title,
          description: props.description,
          url: process.env.NEXT_PUBLIC_SITE_URL + `/${username}`,
          images: [
            {
              url: props.ogImageUrl,
              width: 1200,
              height: 630,
              alt: props.title,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <BaseLayout>
        <div className="flex flex-col gap-10 pb-20">
          {creator && <CreatorProfile creator={creator} />}
          {collection.length != 0 && (
            <div className="mx-auto max-w-4xl w-full px-5">
              <CollectionCard username={username} collection={collection} />
            </div>
          )}
        </div>
      </BaseLayout>
    </>
  );
};
export default CreatorIndex;

type PathProps = {
  title: string;
  description: string;
  ogImageUrl: string;
};
type Params = ParsedUrlQuery & {
  username: string;
};

export const getStaticPaths = async () => {
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const response = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/creators?api_key=${AIRTABLE_API_KEY}`
  );
  const { records } = await response.json();
  const creators = records;
  return {
    paths: creators.map(
      (creator: any) => `/creator/${creator.fields.username}`
    ),
    //fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({
  params,
}) => {
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  /*const response = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/creators?api_key=${AIRTABLE_API_KEY}`
  );*/
  const username = params && params.username;
  const response = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/creators?api_key=${AIRTABLE_API_KEY}&filterByFormula=%7Busername%7D+%3D+%22${username}%22`
  );
  const { records } = await response.json();
  //const creators = records;
  //const creator = creators[0];
  //console.log("static creator");
  //console.log(creator);
  /*const creator = creators.filter(
    (creator: any) => creator.fields.username === username
  );*/
  const description =
    records.length > 0 && records[0].fields.description
      ? records[0].fields.description
      : "";
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
      //ogImageUrl: `${baseUrl}/api/ogp?title=${creator.username}&page=creators`,
      title: `${username}'s NFT collections`,
      description: description,
      //description: `${records[0].fields.description}`,
      ogImageUrl: `${baseUrl}/api/ogp?title=${username}&subTitle=Creator`,
      revalidate: 10,
    },
  };
};
/*
export const getStaticPaths = async () => {
  const creators = useContext(CreatorsContext);
  return {
    paths: creators.map((creator) => `/${creator.username}`),
    //fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = ({
  params,
}) => {
  const username = params && params.username;
  const creators = useContext(CreatorsContext);
  const creator = creators.filter((creator) => creator.username === username);
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
      ogImageUrl: `${baseUrl}/api/ogp?key=${username}&page=creators`,
      revalidate: 10,
    },
  };
};

*/
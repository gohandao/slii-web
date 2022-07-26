import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";

import { ParsedUrlQuery } from "node:querystring";

import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { base } from "@/libs/airtable";

import { useRouter } from "next/router";

import { CreatorsContext } from "@/contexts/CreatorsContext";
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

type PathProps = {
  //title: string;
  ogImageUrl: string;
};
type Params = ParsedUrlQuery & {
  username: string;
};

const CreatorIndex: NextPage = (props: any) => {
  const router = useRouter();
  const creators = useContext(CreatorsContext);
  const collections = useContext(CollectionsContext);
  const [creator, setCreator] = useState<Creator>();
  const [collectionSlug, setCollectionSlug] = useState<string>();
  const { username } = router.query;
  const [loading, setLoading] = useState<boolean>(false);

  const [collection, setCollection] = useState([]);
  const options = { method: "GET" };

  const getCollection = () => {
    fetch(`https://api.opensea.io/api/v1/collection/${collectionSlug}`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log("response.collection");
        console.log(response.collection);
        setCollection(response.collection);
      })
      .catch((err) => console.error(err));
  };

  const updateCollectionSlug = (slug: string) => {
    setCollectionSlug(slug);
  };

  useEffect(() => {
    if (username && creators) {
      //set creator
      const creator_filter = creators.filter(
        (creator) => creator.username === username
      );
      setCreator(creator_filter[0]);
      //set collection
      const collection_filter = collections.filter(
        (collection) => collection.creator_id === username
      );
      collection_filter.length > 0 &&
        updateCollectionSlug(collection_filter[0].slug);
    }
  }, [username, collections]);
  useEffect(() => {
    collectionSlug && getCollection();
  }, [collectionSlug]);

  //@ts-ignore
  const title = creator && creator.username;
  //@ts-ignore
  const description = creator && creator.description;
  return (
    <div>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: "article",
          title: title,
          description: description,
          images: [
            {
              url: props.ogImageUrl,
              width: 1200,
              height: 630,
              alt: title,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <BaseLayout>
        <div className="flex flex-col gap-10 pb-20">
          {creator && <CreatorProfile creator={creator} />}
          {collection && (
            <div className="mx-auto max-w-7xl w-full">
              <Title property="h2" addClass="mb-5">
                Featured Collections
              </Title>
              <CollectionCard collection={collection} />
            </div>
          )}
        </div>
      </BaseLayout>
    </div>
  );
};
export default CreatorIndex;

export const getStaticPaths = async () => {
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const response = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/creators?api_key=${AIRTABLE_API_KEY}`
  );
  const { records } = await response.json();
  const creators = records;
  console.log("testrecords");
  console.log(records);
  return {
    paths: creators.map((creator: any) => `/${creator.fields.username}`),
    //fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({
  params,
}) => {
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const response = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/creators?api_key=${AIRTABLE_API_KEY}`
  );
  const { records } = await response.json();
  const creators = records;
  const username = params && params.username;
  const creator = creators.filter(
    (creator: any) => creator.fields.username === username
  );
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
      ogImageUrl: `${baseUrl}/api/ogp?key=${creator.username}&page=creators`,
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
      production: "https://gachi.vercel.app",
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

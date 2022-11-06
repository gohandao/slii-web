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
import { JP } from "country-flag-icons/react/3x2";
import { ProfileHeader } from "@/components/ProfileHeader";
import { CopyText } from "@/components/CopyText";
import { MdVerified } from "react-icons/md";
import { getNFTs } from "@/utilities/getNFTs";

const CreatorIndex: NextPage = (props: any) => {
  const router = useRouter();
  const { username } = router.query;
  const [creator, setCreator] = useState<Creator>();

  const [creatorCollections, setCreatorCollections] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const { creators, collections } = useContext(BaseContext);
  // const collections = useContext(CollectionsContext);
  const { setHeaderIcon } = useContext(UtilitiesContext);
  useEffect(() => {
    {
      creator &&
        setHeaderIcon({
          title: creator.username,
          subTitle: (
            <div className="flex gap-1 text-[10px] items-center text-gray-400 leading-none">
              <JP title="Japan" className="h-[10px] rounded-sm" />
              {creator.username}
            </div>
          ),
          emoji: "",
          avatar: "",
          path: `/creator/${creator.username}`,
        });
    }
  }, [creator]);

  // useEffect(() => {
  //   console.log("creator nfts");
  //   // creator && getNFTs([creator.address]);
  //   const fetchData = async () => {
  //     let collectionAssets = [] as any[];
  //     creatorCollections &&
  //       creatorCollections.map(async (collection) => {
  //         const new_assets = await getNFTs(collection.name);
  //         collectionAssets = [...collectionAssets, new_assets];
  //       });
  //     console.log("collectionAssets");
  //     console.log(collectionAssets);
  //   };
  //   fetchData();
  // }, [creatorCollections]);

  if (!creator && username && creators && creators.length > 0) {
    //set creator
    const creator_filter = creators.filter(
      (creator) => creator.username === username
    );
    if (creator_filter[0]) {
      setCreator(creator_filter[0]);
    }
  }
  if (
    !creatorCollections &&
    username &&
    collections &&
    collections.length > 0
  ) {
    //set collection
    const collection_filter = collections.filter(
      (collection) => collection.creator_id === username
    );
    collection_filter.length > 0 && setCreatorCollections(collection_filter);
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
    if (username && collections && collections.length > 0) {
      //set collection
      const collection_filter = collections.filter(
        (collection) => collection.creator_id === username
      );
      setCreatorCollections(collection_filter);
    }
  }, [username, collections]);

  //props
  const title = creator && (
    <>
      {creator.username}{" "}
      {creator.verified == true && (
        <MdVerified className="text-gray-500 text-xl inline ml-1" />
      )}
    </>
  );
  const sub_title = creator && (
    <>
      <Image src="/icon-eth.svg" width={16} height={16} alt="" />
      <CopyText text={creator.address} alertText="ETH address has copied!" />
    </>
  );

  // let avatar_url = "" as string;
  // if (creator && creator.avatar) {
  //   avatar_url =
  //     creator.avatar.length > 0
  //       ? //@ts-ignore
  //         creator.avatar[0].thumbnails.large.url
  //       : //@ts-ignore
  //         creator.avatar[0].url;
  // }

  // const getBackground = () => {
  //   let data;
  //   if (creator) {
  //     creator.avatar && creator.avatar.length > 0
  //       ? //@ts-ignore
  //         (data = creator.avatar[0].thumbnails.large.url)
  //       : //@ts-ignore
  //         (data = creator.avatar[0].url);
  //   }
  //   return data;
  // };
  // const background_url = getBackground() as string;

  const links = {
    address: creator?.address,
    twitter_id: creator?.twitter_id,
    instagram_id: creator?.instagram_id,
    discord_url: creator?.discord_url,
    website_url: creator?.website_url,
    opensea_username: creator?.username,
  };

  const stats = [
    {
      field: "twitter",
      value: "twitter",
    },
  ];

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
          {creator && (
            <ProfileHeader
              page="creator"
              id={creator.username}
              title={title}
              sub_title={sub_title}
              avatar_url={creator.avatar}
              background_url={creator.background}
              description={creator.description}
              links={links}
              tags={creator.tags}
              stats={stats}
              twitter_id={creator.twitter_id}
              twitter_followers={creator.twitter_followers}
              discord_url={creator.discord_url}
              upvotes_count={creator.upvotes_count}
            />
          )}
          {creatorCollections.length != 0 && (
            <div className="mx-auto w-full px-5 lg:px-8 flex gap-6">
              {creatorCollections.map((collection, index) => (
                <CollectionCard
                  username={username}
                  collection={collection}
                  key={index}
                />
              ))}
            </div>
          )}
          <div className="flex"></div>
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

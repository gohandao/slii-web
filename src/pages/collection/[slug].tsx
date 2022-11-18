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

import { List } from "@/components/List";
import { Title } from "@/components/Title";
import { ShowMore } from "@/components/ShowMore";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { IndexTab } from "@/components/IndexTab";
import { CreatorProfile } from "@/components/CreatorProfile";
import { CollectionProfile } from "@/components/CollectionProfile";
import { CollectionAssets } from "@/components/CollectionAssets";

import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { Dropdown } from "@/components/Dropdown";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { SocialCount } from "@/components/SocialCount";
import { JP } from "country-flag-icons/react/3x2";
import { ProfileHeader } from "@/components/ProfileHeader";
import { MdVerified } from "react-icons/md";
import { RandomButton } from "@/components/RandomButton";
import { Searchbox } from "@/components/Searchbox";
import { OrderButton } from "@/components/OrderButton";
import { sortNFTs } from "@/libs/sortNFTs";
import { randomize } from "@/utilities/randomize";
import { NFTList } from "@/components/NFTList";
import { getNFTs } from "@/utilities/getNFTs";

const CollectionIndex: NextPage = (props: any) => {
  const OPENSEA_API_KEY = process.env.NEXT_PUBLIC_OPENSEA_API_KEY as string;

  const router = useRouter();
  const { username, order, sort, term, page, type, search, slug } =
    router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 50;

  const [sortedAssets, setSortedAssets] = useState<any[]>([]);
  const [random, setRandom] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [collection, setCollection] = useState<any>();
  const [airtableCollection, setAirtableCollection] = useState<Collection>();
  const { creators, collections } = useContext(BaseContext);
  const [assets, setAssets] = useState<any[]>([]);
  const [currentAssets, setCurrentAssets] = useState<any[]>([]);

  const [existence, setExistence] = useState<boolean>(false);
  const [creator, setCreator] = useState<Creator>();
  const [collectionAssets, setCollectionAssets] = useState<[]>([]);

  const { setHeaderIcon, setKeyword } = useContext(UtilitiesContext);

  console.log("collection");
  console.log(collection);

  useEffect(() => {
    {
      creator &&
        setHeaderIcon({
          title: creator.username,
          subTitle: (
            <div className="flex gap-1 text-[10px] items-center text-gray-400 leading-none">
              <JP title="Japan" className="h-[10px] rounded-sm" />
              {creator.type}
            </div>
          ),
          emoji: "",
          avatar: "",
          path: `/creator/${collection.creator_id}`,
        });
    }
  }, [collection]);
  useEffect(() => {
    setKeyword(undefined);
  }, []);

  if (!creator && creators && collection && creators.length > 0) {
    //set creator
    const creator_filter = creators.filter(
      (creator) => creator.username === collection.creator_id
    );
    if (creator_filter[0]) {
      setCreator(creator_filter[0]);
    }
  }
  if (!collection && collections && collections.length > 0) {
    //set collection
    const collection_filter = collections.filter(
      (collection) => collection.slug === slug
    );
    collection_filter.length > 0 && setCollection(collection_filter[0]);
  }
  useEffect(() => {
    if (collection && creators && creators.length > 0) {
      //set creator
      const creator_filter = creators.filter(
        (creator) => creator.username === collection.slug
      );
      if (creator_filter[0]) {
        setCreator(creator_filter[0]);
      }
    }
    if (!collection && collections && collections.length > 0) {
      //set collection
      const collection_filter = collections.filter(
        (collection) => collection.slug === slug
      );
      collection_filter.length > 0 && setCollection(collection_filter[0]);
    }
  }, [username, collections, collection]);

  if (assets.length < 1 && collection) {
    const fetchData = async () => {
      let new_assets: any[] = [];
      const data = await getNFTs(collection.slug);
      if (data) {
        new_assets = [...new_assets, ...data];
      }
      setAssets(new_assets);
    };
    fetchData();
  }

  useEffect(() => {
    if (assets.length < 1 && collection) {
      const fetchData = async () => {
        let new_assets: any[] = [];
        const data = await getNFTs(collection.slug);
        if (data) {
          new_assets = [...new_assets, ...data];
        }
        setAssets(new_assets);
      };
      fetchData();
    }
  }, [slug]);

  const filteredAssets =
    slug && slug != "all"
      ? assets.filter((asset) => asset.collection_slug === slug)
      : assets;

  const uppperKeyword = typeof search == "string" && search.toUpperCase();
  //1.match username
  const searchedAssets01 = filteredAssets.filter(
    (asset) =>
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      //@ts-ignore
      asset.name.toUpperCase().includes(uppperKeyword) == true
  );
  // //2.match description
  const origin_searchedAssets = [
    ...searchedAssets01,
    // ...searchedCreators02,
  ];
  //重複削除
  let searchedAssets = [] as any[];
  if (search && search.length > 0) {
    searchedAssets = Array.from(new Set(origin_searchedAssets));
  } else {
    searchedAssets = filteredAssets;
  }

  const args = {
    property: "nfts" as "nfts" | "creators" | "collections",
    list: searchedAssets,
    page: currentPage,
    order: order as "desc" | "asc" | undefined,
    sort: sort as string | undefined,
    //category: collectionsSort,
    limit: limit,
  };

  useEffect(() => {
    if (sort != "random") {
      const data = sortNFTs(args);
      setSortedAssets((sortedAssets) => data);
    }
  }, [assets, creators, order, sort, term, page, type, search]);

  useEffect(() => {
    if (sort == "random") {
      setCurrentAssets(randomize(searchedAssets));
    } else {
      setCurrentAssets(sortedAssets);
    }
  }, [sortedAssets, sort, random, search]);

  //props
  const title = collection && (
    <>
      {collection.name}
      {collection.safelist_request_status == "verified" && (
        <MdVerified className="text-gray-500 text-xl inline ml-2" />
      )}
    </>
  );
  const sub_title = creator && (
    <>
      <p className="text-xs text-gray-500">
        By{" "}
        <Link href={`/creator/${creator.username}`}>
          <a className="inline-flex gap-1 items-center">
            {creator.username}{" "}
            {creator.verified == true && (
              <MdVerified className="mt-[2px] text-gray-500" />
            )}
          </a>
        </Link>
      </p>
    </>
  );

  let avatar_url = "" as string;
  if (collection && collection.image_url) {
    avatar_url = collection.image_url;
  }
  const getBackground = () => {
    let data;
    if (collection && collection.banner_image_url) {
      data = collection.banner_image_url;
    }
    return data;
  };
  const background_url = getBackground() as string;

  const links = {
    twitter_id: collection?.twitter_id,
    instagram_id: collection?.instagram_id,
    discord_url: collection?.discord_url,
    website_url: collection?.website_url,
    opensea_username: collection?.slug,
  };

  const stats = [
    {
      field: "twitter",
      value: "twitter",
    },
  ];

  return (
    <>
      {collection ? (
        <>
          <NextSeo
            title={props.title}
            description={props.description}
            openGraph={{
              type: "article",
              title: props.title,
              description: props.description,
              url: process.env.NEXT_PUBLIC_SITE_URL + `/${props.slug}`,
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
            <div className="flex flex-col gap-10">
              {/* {collection && <CollectionProfile collection={collection} />} */}
              {collection && (
                <ProfileHeader
                  page="collection"
                  id={collection.slug}
                  title={title}
                  sub_title={sub_title}
                  avatar_url={avatar_url}
                  background_url={background_url}
                  description={collection.description}
                  links={links}
                  tags={collection.tags}
                  stats={stats}
                  twitter_id={collection.twitter_id}
                  discord_url={collection.discord_url}
                  upvotes_count={collection.upvotes_count}
                />
              )}
              {assets && assets.length > 0 && (
                <div className="px-5 lg:px-8">
                  <div className="relative flex gap-3 z-20 justify-between mb-5 sm:gap-5">
                    <Searchbox id="nft" property="nft" />
                    <div className="flex items-center gap-3">
                      <Dropdown position="right" property="nftSort" />
                      {sort != "random" ? (
                        <OrderButton />
                      ) : (
                        <RandomButton random={random} setRandom={setRandom} />
                      )}
                    </div>
                  </div>
                  <NFTList assets={currentAssets} />
                  {sort != "random" && searchedAssets.length > limit && (
                    <div className="flex justify-center">
                      <Pagination
                        currentPage={currentPage}
                        length={searchedAssets.length}
                        limit={limit}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </BaseLayout>
        </>
      ) : (
        <p>faga</p>
      )}
    </>
  );
};

export default CollectionIndex;

type PathProps = {
  slug: string;
  title: string;
  description: string;
  ogImageUrl: string;
};
type Params = ParsedUrlQuery & {
  slug: string;
};

export const getStaticPaths = async () => {
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const response = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/collections?api_key=${AIRTABLE_API_KEY}`
  );
  const { records } = await response.json();
  const collections = records;
  //console.log("testrecords");
  //console.log(records);
  return {
    paths: collections.map(
      (colelction: any) => `/collection/${colelction.fields.slug}`
    ),
    //fallback: true,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({
  params,
}) => {
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const slug = params && params.slug;
  const response = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/collections?api_key=${AIRTABLE_API_KEY}&filterByFormula=%7Bslug%7D+%3D+%22${slug}%22`
  );
  const { records } = await response.json();
  /*const collections = records;
  const collection = collections.filter(
    (collection: any) => collection.fields.slug === slug
  );*/
  //console.log("records");
  //console.log(records);
  let baseUrl;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }

  return {
    props: {
      slug: records[0].fields.slug,
      title: `${records[0].fields.name} collection by ${records[0].fields.creator_id[0]}`,
      description: `${records[0].fields.name} is a NFT OTAKU featured NFT collection created by ${records[0].fields.creator_id[0]}.`,
      // OGP画像は絶対URLで記述する必要があります
      ogImageUrl: `${baseUrl}/api/ogp?title=${slug}&page=collections`,
      revalidate: 10,
    },
  };
};

/*
export const getStaticProps: GetStaticProps<PathProps, Params> = ({
  params,
}) => {
  const slug = params && params.slug;
  const collections = useContext(CollectionsContext);
  const collection = collections.filter(
    (collection) => collection.slug === slug
  );
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
      ogImageUrl: `${baseUrl}/api/ogp?key=${slug}&page=creators`,
      revalidate: 10,
    },
  };
};
*/

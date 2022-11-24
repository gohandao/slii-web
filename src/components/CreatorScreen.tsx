import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";

import { ParsedUrlQuery } from "node:querystring";

import React, { useState, useEffect, useContext, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { base } from "@/libs/airtable";

import { useRouter } from "next/router";

import { BaseContext } from "@/contexts/BaseContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";

import { CollectionCard } from "@/components/CollectionCard";
import { List } from "@/components/List";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
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
import { Dropdown } from "@/components/Dropdown";
import { Searchbox } from "@/components/Searchbox";
import { OrderButton } from "@/components/OrderButton";
import { sortList } from "@/libs/sortList";
import { sortNFTs } from "@/libs/sortNFTs";
import { randomize } from "@/utilities/randomize";
import { RandomButton } from "@/components/RandomButton";
import { NFTList } from "@/components/NFTList";

type Props = {
  property?: "modal";
};
export const CreatorScreen = ({ property }: Props) => {
  const router = useRouter();
  const { username, order, sort, term, page, type, search, slug, screen } =
    router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 50;
  const [checkAssets, setCheckAssets] = useState(false);
  const [sortedAssets, setSortedAssets] = useState<any[]>([]);
  const [random, setRandom] = useState<boolean>(false);

  const [creator, setCreator] = useState<Creator>();

  const [creatorCollections, setCreatorCollections] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [assets, setAssets] = useState<any[]>([]);
  const [currentAssets, setCurrentAssets] = useState<any[]>([]);
  // const currentAssets = useRef<any[]>([]);

  const { creators, collections } = useContext(BaseContext);
  // const collections = useContext(CollectionsContext);
  const { setHeaderIcon, setKeyword, keyword, NFTKeyword } =
    useContext(UtilitiesContext);

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
  }, [creators, username, collections]);

  // if (!checkAssets && assets.length < 1 && creatorCollections.length > 0) {
  //   const fetchData = async () => {
  //     let new_assets: any[] = [];
  //     await Promise.all(
  //       creatorCollections.map(async (collection) => {
  //         const data = await getNFTs(collection.slug);
  //         if (data) {
  //           new_assets = [...new_assets, ...data];
  //         }
  //       })
  //     );
  //     // console.log(creatorCollections);
  //     // console.log(assets);
  //     // console.log(new_assets);
  //     setAssets(new_assets);
  //     setCheckAssets(true);
  //   };
  //   fetchData();
  // }
  console.log("checkAssets");
  console.log(checkAssets);

  useEffect(() => {
    if (!checkAssets && assets.length < 1 && creatorCollections.length > 0) {
      const fetchData = async () => {
        let new_assets: any[] = [];
        await Promise.all(
          creatorCollections.map(async (collection) => {
            const data = await getNFTs(collection.slug);
            if (data) {
              new_assets = [...new_assets, ...data];
            }
          })
        );
        // console.log("assets nfts");
        // console.log(creatorCollections);
        // console.log(assets);
        // console.log(new_assets);
        setAssets(new_assets);
        setCheckAssets(true);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatorCollections]);

  const test = creator && !screen && screen != "modal" && "test";
  console.log("test m");
  console.log(test);

  useEffect(() => {
    {
      creator && !screen
        ? setHeaderIcon({
            title: creator.username,
            subTitle: (
              <div className="flex gap-1 text-[10px] items-center text-gray-400 leading-none">
                <JP title="Japan" className="h-[10px] rounded-sm" />
                Creator
              </div>
            ),
            emoji: "",
            avatar: "",
            path: `/creator/${creator.username}`,
          })
        : setHeaderIcon({
            title: "",
            emoji: "",
            avatar: "",
            path: "/",
            type: "home",
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creator, screen]);
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
      <Image
        src="/icon-eth.svg"
        width={16}
        height={16}
        alt=""
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <CopyText text={creator.address} alertText="ETH address has copied!" />
    </>
  );

  const filteredAssets =
    slug && slug != "all"
      ? assets.filter((asset) => asset.collection_slug === slug)
      : assets;

  const uppperKeyword =
    typeof NFTKeyword == "string" && NFTKeyword.toUpperCase();
  //1.match username
  const searchedAssets01 = filteredAssets.filter(
    (asset) =>
      typeof NFTKeyword == "string" &&
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
  if (NFTKeyword && NFTKeyword.length > 0) {
    searchedAssets = Array.from(new Set(origin_searchedAssets));
  } else {
    searchedAssets = filteredAssets;
  }

  const args = {
    property: "nfts" as "nfts" | "creators" | "collections",
    list: searchedAssets,
    page: Number(page),
    order: order as "desc" | "asc" | undefined,
    sort: sort as string | undefined,
    //category: collectionsSort,
    limit: limit,
  };

  useEffect(() => {
    if (sort != "random") {
      const data = sortNFTs(args);
      setSortedAssets((sortedAssets) => data);
      setCurrentAssets((currentAssets) => data);
    } else if (sort == "random") {
      setCurrentAssets((currentAssets) => randomize(searchedAssets));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets, creators, order, sort, term, page, type, search, random]);

  // useEffect(() => {
  //   if (sort == "random") {
  //     setCurrentAssets((currentAssets) => randomize(searchedAssets));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sortedAssets, sort, random]);

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

  const custom_menu = creatorCollections.map((collection) => {
    return {
      key: collection.slug as string,
      value: collection.name as string,
    };
  });

  return (
    <>
      <div className="flex flex-col gap-10 pb-10">
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
        {assets && assets.length > 0 && (
          <div className="px-5 lg:px-8">
            <div className="relative flex gap-3 z-20 justify-between mb-5 sm:gap-5">
              {custom_menu.length > 0 && (
                <Dropdown
                  position="left"
                  property="nftType"
                  custom_menu={custom_menu}
                />
              )}
              <Searchbox property="nft" id="nft" />
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
            {sort != "random" && currentAssets.length > limit && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  length={currentAssets.length}
                  limit={limit}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

// kata:creatorコンポーネントをクリック後動く
import { JP } from "country-flag-icons/react/3x2";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useContext, useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";

import { CollectionCard } from "@/components/CollectionCard";
import { CopyText } from "@/components/CopyText";
import { Dropdown } from "@/components/Dropdown";
import { IconEth } from "@/components/IconEth";
import { NFTList } from "@/components/NFTList";
import { OrderButton } from "@/components/OrderButton";
import { Pagination } from "@/components/Pagination";
import { ProfileHeader } from "@/components/ProfileHeader";
import { RandomButton } from "@/components/RandomButton";
import { Searchbox } from "@/components/Searchbox";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { sortNFTs } from "@/libs/sortNFTs";
import type { Creator } from "@/types/creator";
import type { Type1 } from "@/types/model/tmp1.model";
import { abbreviateNumber } from "@/utilities/abbreviateNumber";
import { getNFTs } from "@/utilities/getNFTs";
import { randomize } from "@/utilities/randomize";

export const CreatorScreen: FC = () => {
  const router = useRouter();
  const { order, page, screen, search, slug, sort, term, type, username } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 50;
  const { collections, creators } = useContext(BaseContext);
  const { NFTKeyword, setHeaderIcon } = useContext(UtilitiesContext);

  const [checkAssets, setCheckAssets] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortedAssets, setSortedAssets] = useState<any[]>([]);
  const [random, setRandom] = useState<boolean>(false);

  const [creator, setCreator] = useState<Creator>();
  const [creatorCollections, setCreatorCollections] = useState<any[]>([]);

  const [assets, setAssets] = useState<Type1[]>([]);
  const [currentAssets, setCurrentAssets] = useState<any[]>([]);

  if (!creator && username && creators && creators.length > 0) {
    //set creator
    const creator_filter = creators.filter((creator) => {
      return creator.username === username;
    });
    if (creator_filter[0]) {
      setCreator(creator_filter[0]);
    }
  }
  if (!creatorCollections && username && collections && collections.length > 0) {
    //set collection
    const collection_filter = collections.filter((collection) => {
      return collection.creator_id === username;
    });
    collection_filter.length > 0 && setCreatorCollections(collection_filter);
  }
  useEffect(() => {
    if (username && creators && creators.length > 0) {
      //set creator
      const creator_filter = creators.filter((creator) => {
        return creator.username === username;
      });
      if (creator_filter[0]) {
        setCreator(creator_filter[0]);
      }
    }
    if (username && collections && collections.length > 0) {
      //set collection
      const collection_filter = collections.filter((collection) => {
        return collection.creator_id === username;
      });
      setCreatorCollections(collection_filter);
    }
  }, [creators, username, collections]);

  if (!checkAssets && assets.length < 1 && creatorCollections.length > 0) {
    const fetchData = async () => {
      let new_assets: any[] = [];
      await Promise.all(
        creatorCollections.map(async (collection) => {
          const data = await getNFTs(collection.slug);
          console.log("assets data");
          console.log(data);

          if (data) {
            new_assets = [...new_assets, ...data];
          }
        })
      );
      setAssets(new_assets);
      setCheckAssets(true);
    };
    fetchData();
  }

  useEffect(() => {
    if (!checkAssets && assets.length < 1 && creatorCollections.length > 0) {
      const fetchData = async () => {
        let new_assets: any[] = [];
        await Promise.all(
          creatorCollections.map(async (collection) => {
            const data = await getNFTs(collection.slug);
            console.log("assets data");
            console.log(data);
            if (data) {
              new_assets = [...new_assets, ...data];
            }
          })
        );
        setAssets(new_assets);
        setCheckAssets(true);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatorCollections]);

  useEffect(() => {
    {
      creator && !screen
        ? setHeaderIcon({
            avatar: "",
            emoji: "",
            path: `/creator/${creator.username}`,
            subTitle: (
              <div className="flex items-center gap-1 text-[10px] leading-none text-gray-400">
                <JP title="Japan" className="h-[10px] rounded-sm" />
                Creator
              </div>
            ),
            title: creator.username,
          })
        : setHeaderIcon({
            avatar: "",
            emoji: "",
            path: "/",
            title: "",
            type: "home",
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creator, screen]);
  //props
  const title = creator && (
    <>
      {creator.username} {creator.verified == true && <MdVerified className="ml-1 inline text-xl text-gray-500" />}
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
          height: "auto",
          maxWidth: "100%",
        }}
      />
      <CopyText text={creator.address} alertText="ETH address has copied!" />
    </>
  );

  const filteredAssets =
    slug && slug != "all"
      ? assets.filter((asset) => {
          return asset.collection_slug === slug;
        })
      : assets;

  // kata: リファクタしていいのかよくわからないので聞く
  const uppperKeyword = typeof NFTKeyword == "string" ? NFTKeyword.toUpperCase() : "";
  //1.match username
  const searchedAssets01 = filteredAssets.filter((asset) => {
    return (
      asset.name &&
      asset.name.length > 0 &&
      typeof NFTKeyword == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      asset.name.toUpperCase().includes(uppperKeyword) == true
    );
  });
  // //2.match description
  const origin_searchedAssets = [
    ...searchedAssets01,
    // ...searchedCreators02,
  ];
  //重複削除
  const searchedAssets =
    NFTKeyword && NFTKeyword.length > 0 ? Array.from(new Set(origin_searchedAssets)) : filteredAssets;

  const args = {
    limit: limit,
    list: searchedAssets,
    order: order as "desc" | "asc" | undefined,
    page: Number(page),
    property: "nfts" as "nfts" | "creators" | "collections",
    sort: sort as "last_price" | "last_sale" | "token_id" | undefined,
  };

  useEffect(() => {
    if (sort != "random") {
      const data = sortNFTs(args);
      console.log(data, "wwwwwwwwwwwwwwwwww");
      setSortedAssets(() => {
        return data;
      });
      setCurrentAssets(() => {
        return data;
      });
    } else if (sort == "random") {
      setCurrentAssets(() => {
        return randomize(searchedAssets);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets, creators, order, sort, term, page, type, search, random]);

  const links = {
    address: creator?.address,
    discord_url: creator?.discord_url,
    instagram_id: creator?.instagram_id,
    opensea_username: creator?.username,
    twitter_id: creator?.twitter_id,
    website_url: creator?.website_url,
  };

  const stats = [
    {
      field: "Total Volume",
      value: creator && creator.total_volume && (
        <>
          {creator.token_symbol && creator.token_symbol == "ETH" && <IconEth />}
          {abbreviateNumber(creator.total_volume)}
        </>
      ),
    },
    {
      field: "Ave. Volume",
      value: creator && creator.average_volume && (
        <>
          {creator.token_symbol && creator.token_symbol == "ETH" && <IconEth />}
          {abbreviateNumber(creator.average_volume)}
        </>
      ),
    },
    {
      field: "Ave. Floor Price",
      value: creator && creator.average_floor_price && (
        <>
          {creator.token_symbol && creator.token_symbol == "ETH" && <IconEth />}
          {abbreviateNumber(creator.average_floor_price)}
        </>
      ),
    },
    {
      field: "Total Supply",
      value: creator?.total_supply,
    },
    {
      field: "Total Sales",
      value: creator?.total_sales,
    },
  ];

  // const custom_menu = creatorCollections.map((collection) => {
  //   return {
  //     key: collection.slug as string,
  //     value: collection.name as string,
  //   };
  // });

  return (
    <>
      <div className={`flex flex-col gap-10 pb-10 `}>
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
          <div className="hide-scrollbar mx-auto -mt-7 flex w-full gap-6 overflow-x-auto rounded px-5 pt-5 lg:px-8">
            {creatorCollections.map((collection, index) => {
              return <CollectionCard username={username} collection={collection} key={index} />;
            })}
          </div>
        )}
        {assets && assets.length > 0 && (
          <div className="px-5 lg:px-8">
            <div className="relative z-20 mb-5 flex justify-between gap-3 sm:gap-5">
              {/* {custom_menu.length > 0 && (
                <Dropdown
                  position="left"
                  property="nftType"
                  custom_menu={custom_menu}
                />
              )} */}
              <Searchbox property="nft" id="nft" />
              <div className="flex items-center gap-3">
                <Dropdown position="right" property="nftSort" />
                {sort != "random" ? <OrderButton /> : <RandomButton random={random} setRandom={setRandom} />}
              </div>
            </div>
            <NFTList assets={currentAssets} />
            {sort != "random" && searchedAssets.length > limit && (
              <div className="flex justify-center">
                <Pagination currentPage={currentPage} length={searchedAssets.length} limit={limit} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

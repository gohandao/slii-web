import { JP } from "country-flag-icons/react/3x2";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useContext, useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";

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
import { abbreviateNumber } from "@/utilities/abbreviateNumber";
import { getNFTs } from "@/utilities/getNFTs";
import { randomize } from "@/utilities/randomize";

export const CollectionScreen: FC = () => {
  const router = useRouter();
  const { order, page, screen, search, slug, sort, term, type, username } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 50;
  const { setHeaderIcon, setKeyword } = useContext(UtilitiesContext);
  const [checkAssets, setCheckAssets] = useState(false);
  const [sortedAssets, setSortedAssets] = useState<any[]>([]);
  const [random, setRandom] = useState<boolean>(false);
  const [collection, setCollection] = useState<any>();
  const { collections, creators } = useContext(BaseContext);
  const [creator, setCreator] = useState<Creator>();
  const [assets, setAssets] = useState<any[]>([]);
  const [currentAssets, setCurrentAssets] = useState<any[]>([]);

  useEffect(() => {
    {
      creator && !screen
        ? setHeaderIcon({
            avatar: "",
            emoji: "",
            path: `/creator/${collection.creator_id}`,
            subTitle: (
              <div className="flex items-center gap-1 text-[10px] leading-none text-gray-400">
                <JP title="Japan" className="h-[10px] rounded-sm" />
                {creator.type}
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
  }, [collection]);
  useEffect(() => {
    setKeyword(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!creator && creators && collection && creators.length > 0) {
    //set creator
    const creator_filter = creators.filter((creator) => {
      return creator.username === collection.creator_id;
    });
    if (creator_filter[0]) {
      setCreator(creator_filter[0]);
    }
  }
  if (!collection && collections && collections.length > 0) {
    //set collection
    const collection_filter = collections.filter((collection) => {
      return collection.slug === slug;
    });
    collection_filter.length > 0 && setCollection(collection_filter[0]);
  }
  useEffect(() => {
    if (collection && creators && creators.length > 0) {
      //set creator
      const creator_filter = creators.filter((creator) => {
        return creator.username === collection.slug;
      });
      if (creator_filter[0]) {
        setCreator(creator_filter[0]);
      }
    }
    if (!collection && collections && collections.length > 0) {
      //set collection
      const collection_filter = collections.filter((collection) => {
        return collection.slug === slug;
      });
      collection_filter.length > 0 && setCollection(collection_filter[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creators, username, collections, collection]);

  useEffect(() => {
    if (!checkAssets && assets.length < 1 && collection) {
      const fetchData = async () => {
        let new_assets: any[] = [];
        const data = await getNFTs(collection.slug);
        if (data) {
          new_assets = [...new_assets, ...data];
        }
        setAssets(new_assets);
        setCheckAssets(true);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const filteredAssets =
    slug && slug != "all"
      ? assets.filter((asset) => {
          return asset.collection_slug === slug;
        })
      : assets;

  const uppperKeyword = typeof search == "string" && search.toUpperCase();
  //1.match username
  const searchedAssets01 = filteredAssets.filter((asset) => {
    return (
      typeof search == "string" &&
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
  let searchedAssets = [] as any[];
  if (search && search.length > 0) {
    searchedAssets = Array.from(new Set(origin_searchedAssets));
  } else {
    searchedAssets = filteredAssets;
  }

  const args = {
    //category: collectionsSort,
    limit: limit,
    list: searchedAssets,
    order: order as "desc" | "asc" | undefined,
    page: Number(page),
    property: "nfts" as "nfts" | "creators" | "collections",
    sort: sort as string | undefined,
  };

  useEffect(() => {
    console.log("searchedAssets");
    console.log(searchedAssets);

    if (sort != "random") {
      const data = sortNFTs(args);
      setSortedAssets(() => {
        return data;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets, creators, order, sort, term, page, type, search]);

  useEffect(() => {
    if (sort == "random") {
      setCurrentAssets(randomize(searchedAssets));
    } else {
      setCurrentAssets(sortedAssets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedAssets, sort, random, search]);

  //props
  const title = collection && (
    <>
      {collection.name}
      {collection.safelist_request_status == "verified" && <MdVerified className="ml-2 inline text-xl text-gray-500" />}
    </>
  );
  const sub_title = creator && (
    <>
      <p className="text-xs text-gray-500">
        By{" "}
        <Link href={`/creator/${creator.username}`} legacyBehavior>
          <a className="inline-flex items-center gap-1">
            {creator.username} {creator.verified == true && <MdVerified className="mt-[2px] text-gray-500" />}
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
    discord_url: collection?.discord_url,
    instagram_id: collection?.instagram_id,
    opensea_username: collection && "collection/" + collection.slug,
    twitter_id: collection?.twitter_id,
    website_url: collection?.website_url,
  };

  const stats = [
    {
      field: "Total Volume",
      value: collection && collection.stats.total_volume && (
        <>
          {collection.payment_tokens && collection.payment_tokens[0].symbol == "ETH" && <IconEth />}
          {abbreviateNumber(collection.stats.total_volume)}
        </>
      ),
    },
    {
      field: "Floor Price",
      value: collection && collection.stats.floor_price && (
        <>
          {collection.payment_tokens && collection.payment_tokens[0].symbol == "ETH" && <IconEth />}
          {abbreviateNumber(collection.stats.floor_price)}
        </>
      ),
    },
    {
      field: "Ave. Price",
      value: collection && collection.stats.average_price && (
        <>
          {collection.payment_tokens && collection.payment_tokens[0].symbol == "ETH" && <IconEth />}
          {abbreviateNumber(collection.stats.average_price)}
        </>
      ),
    },
    {
      field: "Total Supply",
      value: collection && collection.stats.total_supply,
    },
    {
      field: "Total Owneres",
      value: collection && collection.stats.num_owners,
    },
    {
      field: "Total Sales",
      value: collection && collection.stats.total_sales,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-10 pb-10">
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
            <div className="relative z-20 mb-5 flex justify-between gap-3 sm:gap-5">
              <Searchbox id="nft" property="nft" />
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

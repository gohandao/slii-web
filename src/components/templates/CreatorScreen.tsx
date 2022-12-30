import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";

import { CopyText } from "@/components/elements/CopyText";
import { RandomButton } from "@/components/elements/RandomButton";
import { CollectionCard } from "@/components/modules/CollectionCard";
import { NFTList } from "@/components/modules/NFTList";
import { ProfileHeader } from "@/components/modules/ProfileHeader";
import { useGetCreators } from "@/hooks/useGetCreators";
import { getCollections, getNFTs, upsertNFTPrices } from "@/libs/supabase";
import type { Creator } from "@/types/creator";

export const CreatorScreen = () => {
  const router = useRouter();
  const { username } = router.query;
  const [random, setRandom] = useState<boolean>(false);
  const [creator, setCreator] = useState<Creator>();
  const [collections, setCollections] = useState<any[]>();
  const [assets, setAssets] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const { getCreators } = useGetCreators();

  useEffect(() => {
    // アクセス時にNFTの価格を更新する
    creator &&
      creator.collections &&
      creator.collections.length > 0 &&
      creator.collections.map(async (collection_slug: string) => {
        await upsertNFTPrices(collection_slug);
      });
  }, [creator]);

  useEffect(() => {
    const fetchData = async () => {
      const props = {
        username: username as string,
      };
      const { data } = await getCreators(props);
      data && setCreator(data as Creator);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    const fetchData = async () => {
      const slugs = creator?.collections;
      if (slugs && !collections) {
        const props = {
          slugs: slugs,
          sort: "total_volume",
        };
        const { data } = await getCollections(props);
        data && setCollections(data);
      }
      if (slugs) {
        const props = {
          slugs: slugs,
        };
        const { count, data } = slugs && (await getNFTs(props));
        data && setAssets(data);
        count && setCount(count);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creator, random]);

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

  const links = {
    address: creator?.address,
    discord_url: creator?.discord_url,
    instagram_id: creator?.instagram_id,
    opensea_username: creator?.username,
    twitter_id: creator?.twitter_id,
    website_url: creator?.website_url,
  };

  // const stats = [
  //   {
  //     field: "Total Volume",
  //     value: creator && creator.total_volume && (
  //       <>
  //         {creator.token_symbol && creator.token_symbol == "ETH" && <IconEth />}
  //         {abbreviateNumber(creator.total_volume)}
  //       </>
  //     ),
  //   },
  //   {
  //     field: "Ave. Volume",
  //     value: creator && creator.average_volume && (
  //       <>
  //         {creator.token_symbol && creator.token_symbol == "ETH" && <IconEth />}
  //         {abbreviateNumber(creator.average_volume)}
  //       </>
  //     ),
  //   },
  //   {
  //     field: "Ave. Floor Price",
  //     value: creator && creator.average_floor_price && (
  //       <>
  //         {creator.token_symbol && creator.token_symbol == "ETH" && <IconEth />}
  //         {abbreviateNumber(creator.average_floor_price)}
  //       </>
  //     ),
  //   },
  //   {
  //     field: "Total Supply",
  //     value: creator?.total_supply,
  //   },
  //   {
  //     field: "Total Sales",
  //     value: creator?.total_sales,
  //   },
  // ];

  // const custom_menu = creatorCollections.map((collection) => {
  //   return {
  //     key: collection.slug as string,
  //     value: collection.name as string,
  //   };
  // });

  return (
    <>
      <div className={`flex flex-col gap-10 pb-8`}>
        {creator && (
          <ProfileHeader
            page="creator"
            id={creator.username}
            title={title}
            sub_title={sub_title}
            avatar_url={creator.avatar}
            background_url={creator.background}
            // description={creator.description}
            links={links}
            tags={creator.tags}
            // stats={stats}
            twitter_id={creator.twitter_id}
            twitter_followers={creator.twitter_followers}
            discord_url={creator.discord_url}
            upvotes_count={creator.upvotes_count_function}
          />
        )}
        {collections && collections.length != 0 && (
          <div className="hide-scrollbar mx-auto -mt-7 flex w-full gap-6 overflow-x-auto rounded px-5 pt-5 lg:px-8">
            {collections.map((collection: any, index: number) => {
              return <CollectionCard username={username} collection={collection} key={index} />;
            })}
          </div>
        )}
        {assets && assets.length > 0 && (
          <div className="px-5 lg:px-8">
            <div className="relative z-20 mb-5 flex w-full">
              <RandomButton random={random} setRandom={setRandom} count={count} />
            </div>
            <NFTList assets={assets} />
          </div>
        )}
      </div>
    </>
  );
};

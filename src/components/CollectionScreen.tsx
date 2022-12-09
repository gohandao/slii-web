import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";

import { IconEth } from "@/components/IconEth";
import { NFTList } from "@/components/NFTList";
import { ProfileHeader } from "@/components/ProfileHeader";
import { RandomButton } from "@/components/RandomButton";
import { getCollections, getNFTs } from "@/libs/supabase";
import { abbreviateNumber } from "@/utilities/abbreviateNumber";

export const CollectionScreen = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [random, setRandom] = useState<boolean>(false);
  const [collection, setCollection] = useState<any>();
  const [assets, setAssets] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const props = {
        slug: slug as string,
      };
      const { data } = await getCollections(props);
      data && setCollection(data);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    const fetchData = async () => {
      if (collection && collection.slug) {
        const props = {
          slugs: [collection.slug],
        };
        const { count, data } = await getNFTs(props);
        data &&
          setAssets(() => {
            return data;
          });
        count && setCount(count);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, random]);

  //props
  const title = collection && (
    <>
      {collection.name}
      {collection.safelist_request_status == "verified" && <MdVerified className="ml-2 inline text-xl text-gray-500" />}
    </>
  );
  const sub_title = collection && collection.creator && (
    <>
      <p className="text-xs text-gray-500">
        By{" "}
        <Link href={`/creator/${collection.creator_username}`} legacyBehavior>
          <a className="inline-flex items-center gap-1">
            {collection.creator.username}{" "}
            {collection.creator.verified == true && <MdVerified className="mt-[2px] text-gray-500" />}
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
      value: collection && collection.total_volume && (
        <>
          {collection.symbols && collection.symbols[0] == "ETH" && <IconEth />}
          {abbreviateNumber(collection.total_volume)}
        </>
      ),
    },
    {
      field: "Floor Price",
      value: collection && collection.floor_price && (
        <>
          {collection.symbols && collection.symbols[0] == "ETH" && <IconEth />}
          {abbreviateNumber(collection.floor_price)}
        </>
      ),
    },
    {
      field: "Ave. Price",
      value: collection && collection.average_price && (
        <>
          {collection.symbols && collection.symbols[0] == "ETH" && <IconEth />}
          {abbreviateNumber(collection.average_price)}
        </>
      ),
    },
    {
      field: "Total Supply",
      value: collection && collection.total_supply,
    },
    {
      field: "Total Owneres",
      value: collection && collection.num_owners,
    },
    {
      field: "Total Sales",
      value: collection && collection.total_sales,
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
              <RandomButton random={random} setRandom={setRandom} count={count} />
            </div>
            <NFTList assets={assets} />
          </div>
        )}
      </div>
    </>
  );
};

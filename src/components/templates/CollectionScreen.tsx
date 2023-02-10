import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { BasePageTemplate } from "@/components/templates/BasePageTemplate";
import { useGetCollections } from "@/hooks/useGetCollections";
import { useGetCreators } from "@/hooks/useGetCreators";
import { getNFTs, upsertNFTPrices } from "@/libs/supabase";
import type { Creator } from "@/types/creator";

export const CollectionScreen = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { getCollections } = useGetCollections();
  const { getCreators } = useGetCreators();
  const [random] = useState<boolean>(false);
  const [creator, setCreator] = useState<Creator>();
  const [collection, setCollection] = useState<any>();
  const [assets, setAssets] = useState<any[]>([]);
  const [, setCount] = useState<number>(0);

  useEffect(() => {
    // アクセス時にNFTの価格を更新する
    collection && upsertNFTPrices(collection.slug);
  }, [collection]);

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
    if (collection && collection.creator_username) {
      const fetchData = async () => {
        const props = {
          username: collection.creator_username,
        };
        const { data } = await getCreators(props);
        if (data && data != creator) {
          setCreator(data as Creator);
        }
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

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
  // const title = collection && (
  //   <>
  //     {collection.name}
  //     {collection.safelist_request_status == "verified" && <MdVerified className="ml-2 inline text-xl text-gray-500" />}
  //   </>
  // );
  // const sub_title = collection && collection.creator && (
  //   <>
  //     <p className="text-xs text-gray-500">
  //       By{" "}
  //       <Link href={`/creator/${collection.creator_username}`} legacyBehavior>
  //         <a className="inline-flex items-center gap-1">
  //           {collection.creator.username}{" "}
  //           {collection.creator.verified == true && <MdVerified className="mt-[2px] text-gray-500" />}
  //         </a>
  //       </Link>
  //     </p>
  //   </>
  // );

  // let avatar_url = "" as string;
  // if (collection && collection.image_url) {
  //   avatar_url = collection.image_url;
  // }
  // const getBackground = () => {
  //   let data;
  //   if (collection && collection.banner_image_url) {
  //     data = collection.banner_image_url;
  //   }
  //   return data;
  // };
  // const background_url = getBackground() as string;

  // const links = {
  //   discord_url: collection?.discord_url,
  //   instagram_id: collection?.instagram_id,
  //   opensea_username: collection && "collection/" + collection.slug,
  //   twitter_id: collection?.twitter_id,
  //   website_url: collection?.website_url,
  // };

  // const stats = [
  //   {
  //     field: "Total Volume",
  //     value: collection && collection.total_volume && (
  //       <>
  //         {collection.symbols && collection.symbols[0] == "ETH" && <IconEth />}
  //         {abbreviateNumber(collection.total_volume)}
  //       </>
  //     ),
  //   },
  //   {
  //     field: "Floor Price",
  //     value: collection && collection.floor_price && (
  //       <>
  //         {collection.symbols && collection.symbols[0] == "ETH" && <IconEth />}
  //         {abbreviateNumber(collection.floor_price)}
  //       </>
  //     ),
  //   },
  //   {
  //     field: "Ave. Price",
  //     value: collection && collection.average_price && (
  //       <>
  //         {collection.symbols && collection.symbols[0] == "ETH" && <IconEth />}
  //         {abbreviateNumber(collection.average_price)}
  //       </>
  //     ),
  //   },
  //   {
  //     field: "Total Supply",
  //     value: collection && collection.total_supply,
  //   },
  //   {
  //     field: "Total Owneres",
  //     value: collection && collection.num_owners,
  //   },
  //   {
  //     field: "Total Sales",
  //     value: collection && collection.total_sales,
  //   },
  // ];
  return (
    <>
      {collection ? (
        <BasePageTemplate
          category="Collection"
          collections={[]}
          description={collection.description}
          image={collection.image_url}
          label=""
          liked_counts={collection.upvotes_count_function as number}
          creator={creator}
          nfts={assets}
          stars_counts={collection.bookmarks_count_function as number}
          tags={[]}
          title={collection.name}
          links={{
            discord_url: collection.discord_url,
            instagram_id: collection.instagram_id,
            opensea_url: `https://opensea.io/collection/${collection.slug}`,
            twitter_id: collection.twitter_id,
            website_url: collection.website_url,
          }}
        />
      ) : (
        <p className="lg:pl-[300px]">Loading...</p>
      )}
    </>
  );
};

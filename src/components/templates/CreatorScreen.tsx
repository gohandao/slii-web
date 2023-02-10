import { random } from "nanoid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { BasePageTemplate } from "@/components/templates/BasePageTemplate";
import { useGetCreators } from "@/hooks/useGetCreators";
import { getCollections, getNFTs } from "@/libs/supabase";
import type { Creator } from "@/types/creator";

export const CreatorScreen = () => {
  const { getCreators } = useGetCreators();
  const [creator, setCreator] = useState<Creator>();
  const [collections, setCollections] = useState<any[]>();
  const [assets, setAssets] = useState<any[]>([]);
  const [, setCount] = useState<number>(0);

  const router = useRouter();
  const { username } = router.query;

  console.log("creator");
  console.log(creator);

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

  return (
    <>
      {creator ? (
        <BasePageTemplate
          category="Creator"
          collections={collections}
          description=""
          image={creator.avatar}
          label="Artist"
          liked_counts={creator.upvotes_count_function as number}
          nfts={assets}
          stars_counts={creator.bookmarks_count_function as number}
          tags={[]}
          title={creator.username}
          links={{
            discord_url: creator.discord_url,
            instagram_id: creator.instagram_id,
            opensea_url: `https://opensea.io/${creator.username}`,
            twitter_id: creator.twitter_id,
            website_url: creator.website_url,
          }}
        />
      ) : (
        <p className="lg:pl-[300px]">Loading...</p>
      )}
    </>
  );
};

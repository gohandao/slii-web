/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@supabase/supabase-js";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";

import { useGetCollections } from "@/hooks/useGetCollections";
import { useGetCombinedList } from "@/hooks/useGetCombinedList";
import { useGetCreators } from "@/hooks/useGetCreators";
import { useGetSwipedList } from "@/hooks/useGetSwipedList";
import {
  collectionsFilterParamsAtom,
  combinedFilterParamsAtom,
  creatorsFilterParamsAtom,
} from "@/state/utilities.state";
import type { Creator } from "@/types/creator";
import type { TCard } from "@/types/tinder";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY;
if (!supabaseUrl) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
if (!supabaseAnonKey) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useGetIndexCards = () => {
  const router = useRouter();
  const current_path = router.pathname;
  const [indexCards, setIndexCards] = useState<TCard[]>([]);

  const [combinedFilterParams] = useAtom(combinedFilterParamsAtom);
  const [creatorsFilterParams] = useAtom(creatorsFilterParamsAtom);
  const [collectionsFilterParams] = useAtom(collectionsFilterParamsAtom);
  const { swipedCollectionsList, swipedCombinedList, swipedCreatorsList } = useGetSwipedList();
  const { getCreators } = useGetCreators();
  const { getCollections } = useGetCollections();
  const { getCombinedList } = useGetCombinedList();

  const getIndexCards = async () => {
    switch (current_path) {
      case "/":
        const fetchCombiledListData = async () => {
          const props = {
            order: combinedFilterParams.order as "desc" | "asc" | undefined,
            removeList: swipedCombinedList,
            search: combinedFilterParams.search as string | undefined,
            sort: combinedFilterParams.sort as string | undefined,
          };
          const { data } = await getCombinedList(props);
          if (data != indexCards) {
            const combined_list = data as TCard[];
            setIndexCards(combined_list);
          }
        };
        await fetchCombiledListData();
        break;
      case "/creators":
        const fetchCreatorsData = async () => {
          const props = {
            order: creatorsFilterParams.order as "desc" | "asc" | undefined,
            removeList: swipedCreatorsList,
            search: creatorsFilterParams.search as string | undefined,
            sort: creatorsFilterParams.sort as string | undefined,
            type: creatorsFilterParams.type as string | undefined,
          };
          const { data } = await getCreators(props);
          if ((data as Creator[]) && data != indexCards) {
            const creators = data as Creator[];
            const cards = creators?.map((creator, index) => {
              return {
                id: creator.username,
                above_tags: creator.tags,
                below_tags: creator.tags,
                bookmarks_count: creator.bookmarks_count_function,
                image: creator.avatar,
                label: "Creator",
                name: creator.username,
                order: index,
                path: `/creator/${creator.username}`,
                type: "creator",
                upvotes_count: creator.upvotes_count_function,
                verified: creator.verified,
              } as TCard;
            });
            setIndexCards(cards);
          }
        };
        await fetchCreatorsData();
        break;
      case "/collections":
        const fetchCollectionsData = async () => {
          const props = {
            order: collectionsFilterParams.order as "desc" | "asc" | undefined,
            removeList: swipedCollectionsList,
            search: collectionsFilterParams.search as string | undefined,
            sort: collectionsFilterParams.sort as string | undefined,
            type: collectionsFilterParams.type as string | undefined,
          };
          const { data } = await getCollections(props);
          if ((data as Creator[]) && data != indexCards) {
            const collections = data as any[];
            const cards = collections?.map((collection, index) => {
              return {
                id: collection.slug,
                above_tags: collection.tags,
                below_tags: collection.tags,
                bookmarks_count: collection.bookmarks_count_function,
                image: collection.image_url,
                label: "Collection",
                name: collection.name,
                order: index,
                path: `/collection/${collection.slug}`,
                type: "collection",
                upvotes_count: collection.upvotes_count_function,
                verified: collection.safelist_request_status == "verified" ? true : false,
              } as TCard;
            });
            setIndexCards(cards);
          }
        };
        await fetchCollectionsData();
        break;
    }
  };

  return { getIndexCards, indexCards };
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@supabase/supabase-js";
import { useAtom } from "jotai";
import { useState } from "react";

import { useGetCollections } from "@/hooks/useGetCollections";
import { useGetCombinedList } from "@/hooks/useGetCombinedList";
import { useGetCreators } from "@/hooks/useGetCreators";
import { userBookmarksAtom, userProfileCategoryAtom, userProfileTabAtom, userUpvotesAtom } from "@/state/user.state";
import type { Creator } from "@/types/creator";
import type { TCard } from "@/types/tinder";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY;
if (!supabaseUrl) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
if (!supabaseAnonKey) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useGetUserItems = () => {
  const [userItems, setUserItems] = useState<TCard[]>([]);
  const { getCreators } = useGetCreators();
  const { getCollections } = useGetCollections();
  const { getCombinedList } = useGetCombinedList();

  const [userUpvotes] = useAtom(userUpvotesAtom);
  const [userBookmarks] = useAtom(userBookmarksAtom);

  const [userProfileTab, setUserProfileTab] = useAtom(userProfileTabAtom);
  const [userProfileCategory, setUserProfileCategory] = useAtom(userProfileCategoryAtom);

  const upvoted_usernames = userUpvotes
    .filter((upvote) => {
      return upvote.creator_username;
    })
    .map((upvote) => {
      return upvote.creator_username;
    });
  const upvoted_slugs = userUpvotes
    .filter((upvote) => {
      return upvote.collection_slug;
    })
    .map((upvote) => {
      return upvote.collection_slug;
    });
  const bookmarked_usernames = userBookmarks
    .filter((bookmark) => {
      return bookmark.creator_username;
    })
    .map((bookmark) => {
      return bookmark.creator_username;
    });
  const bookmarked_slugs = userBookmarks
    .filter((bookmark) => {
      return bookmark.collection_slug;
    })
    .map((bookmark) => {
      return bookmark.collection_slug;
    });

  const liked_usernames = upvoted_usernames.length > 0 ? (upvoted_usernames as string[]) : [];
  const liked_slugs = upvoted_slugs.length > 0 ? (upvoted_slugs as string[]) : [];
  const stars_usernames = bookmarked_usernames.length > 0 ? (bookmarked_usernames as string[]) : [];
  const stars_slugs = bookmarked_slugs.length > 0 ? (bookmarked_slugs as string[]) : [];

  const liked_ids = [...liked_usernames, ...liked_slugs];
  const stars_ids = [...stars_usernames, ...stars_slugs];

  const ids = userProfileTab != "stars" ? liked_ids : stars_ids;
  const usernames = userProfileTab != "stars" ? liked_usernames : stars_usernames;
  const slugs = userProfileTab != "stars" ? liked_slugs : stars_slugs;

  const getUserItems = async () => {
    switch (userProfileCategory) {
      case "all":
      case undefined:
        const fetchCombiledListData = async () => {
          const props = {
            ids: ids,
          };
          const { data } = await getCombinedList(props);
          if (data != userItems) {
            const combined_list = data as TCard[];
            setUserItems(combined_list);
          }
        };
        await fetchCombiledListData();
        break;
      case "creators":
        const fetchCreatorsData = async () => {
          const props = {
            usernames: usernames,
          };
          const { data } = await getCreators(props);
          if ((data as Creator[]) && data != userItems) {
            const creators = data as Creator[];
            const items = creators?.map((creator, index) => {
              return {
                id: creator.username,
                above_tags: creator.tags,
                below_tags: creator.tags,
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
            setUserItems(items);
          }
        };
        await fetchCreatorsData();
        break;
      case "collections":
        const fetchCollectionsData = async () => {
          const props = {
            slugs: slugs,
          };
          const { data } = await getCollections(props);
          if ((data as any[]) && data != userItems) {
            const collections = data as any[];
            const items = collections?.map((collection, index) => {
              return {
                id: collection.slug,
                above_tags: collection.tags,
                below_tags: collection.tags,
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
            setUserItems(items);
          }
        };
        await fetchCollectionsData();
        break;
    }
  };

  return { getUserItems, userItems };
};

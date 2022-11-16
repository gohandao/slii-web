import { BaseContext } from "@/contexts/BaseContext";
import { useContext } from "react";
import { Creator } from "@/types/creator";
import creatorsJson from "@/json/creators.json";
import collectionsJson from "@/json/collections.json";

type Props = {
  upvotes_count: number;
  creator_username?: string;
  collection_slug?: string;
};
export const updateUpvotes = ({
  upvotes_count,
  creator_username,
  collection_slug,
}: Props) => {
  if (creator_username && creator_username.length > 0) {
    let new_creators = [] as Creator[];
    creatorsJson.map((creator, index) => {
      const new_creator =
        creator.username == creator_username
          ? ({ ...creator, upvotes_count: upvotes_count } as Creator)
          : creator;
      new_creators = [...new_creators, new_creator];
    });
    return new_creators;
  }
  if (collection_slug && collection_slug.length > 0) {
    let new_collections = [] as any[];
    collectionsJson.map((collection, index) => {
      const new_collection =
        collection.slug == collection_slug
          ? ({
              ...collection,
              upvotes_count: upvotes_count,
            } as unknown as any[])
          : collection;
      new_collections = [...new_collections, new_collection];
    });
    return new_collections;
  }
  return;
};

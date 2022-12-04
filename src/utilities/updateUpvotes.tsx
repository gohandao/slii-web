import collectionsJson from "@/json/collections.json";
import creatorsJson from "@/json/creators.json";
import type { Creator } from "@/types/creator";

const creators = JSON.parse(JSON.stringify(creatorsJson)) as Creator[];
const collections = JSON.parse(JSON.stringify(collectionsJson));

type Props = {
  collection_slug?: string;
  creator_username?: string;
  upvotes_count: number;
};
export const updateUpvotes = ({ collection_slug, creator_username, upvotes_count }: Props) => {
  if (creator_username && creator_username.length > 0) {
    let new_creators = [] as Creator[];
    creators.map((creator: Creator) => {
      const new_creator =
        creator.username == creator_username ? ({ ...creator, upvotes_count: upvotes_count } as Creator) : creator;
      new_creators = [...new_creators, new_creator];
    });
    return new_creators;
  }
  if (collection_slug && collection_slug.length > 0) {
    let new_collections = [] as any[];
    collections.map((collection: any) => {
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

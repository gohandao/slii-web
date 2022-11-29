import { createContext } from "react";
/*types*/
import { Collection } from "@/types/collection";

export const CollectionsContext = createContext<Collection[]>([
  {
    record_id: "",
    name: "",
    slug: "",
    creator_id: "",
    type: "",
    listed_at: null,
    updatedAt: null,
    category: "",
    verified: false,
    tags: [],
    twitter_followers: null,
    discord_members: null,
  },
]);

import { createContext } from "react";

import type { Collection } from "@/types/collection";

export const CollectionsContext = createContext<Collection[]>([
  {
    category: "",
    creator_id: "",
    discord_members: null,
    listed_at: null,
    name: "",
    record_id: "",
    slug: "",
    tags: [],
    twitter_followers: null,
    type: "",
    updatedAt: null,
    verified: false,
  },
]);

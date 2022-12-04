import { createContext } from "react";

import type { Creator } from "@/types/creator";

export const CreatorsContext = createContext<Creator[]>([
  {
    address: "",
    avatar: "",
    background: "",
    category: "",
    collections: [],
    description: "",
    discord_url: "",
    instagram_id: "",
    listed_at: null,
    tags: [],
    twitter_id: "",
    type: "",
    updatedAt: null,
    username: "",
    verified: false,
    website_url: "",
  },
]);

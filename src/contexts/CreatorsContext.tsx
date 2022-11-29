import { createContext } from "react";
/*types*/
import { Creator } from "@/types/creator";

export const CreatorsContext = createContext<Creator[]>([
  {
    username: "",
    description: "",
    avatar: "",
    background: "",
    address: "",
    website_url: "",
    twitter_id: "",
    instagram_id: "",
    discord_url: "",
    verified: false,
    type: "",
    listed_at: null,
    updatedAt: null,
    collections: [],
    category: "",
    tags: [],
  },
]);

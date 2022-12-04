import { createContext } from "react";

import type { Creator } from "@/types/creator";

type Props = {
  collections: any[];
  creators: Creator[];
  setCollections: React.Dispatch<React.SetStateAction<any[]>>;
  setCreators: React.Dispatch<React.SetStateAction<Creator[]>>;
  tags: any[];
};
export const BaseContext = createContext<Props>({
  collections: [],
  creators: [
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
  ],
  setCollections: () => {
    return;
  },
  setCreators: () => {
    return;
  },
  tags: [
    {
      collections: [],
      collections_count: 0,
      count: 0,
      createdAt: null,
      creators: [],
      creators_count: 0,
      name: "",
    },
  ],
});

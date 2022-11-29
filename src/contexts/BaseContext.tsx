import { createContext } from "react";
/*types*/
import { Creator } from "@/types/creator";

type Props = {
  setCreators: React.Dispatch<React.SetStateAction<Creator[]>>;
  setCollections: React.Dispatch<React.SetStateAction<any[]>>;
  creators: Creator[];
  collections: any[];
  tags: any[];
};
export const BaseContext = createContext<Props>({
  setCreators: () => {},
  setCollections: () => {},
  creators: [
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
  ],
  collections: [],
  tags: [
    {
      name: "",
      createdAt: null,
      creators: [],
      collections: [],
      creators_count: 0,
      collections_count: 0,
      count: 0,
    },
  ],
});

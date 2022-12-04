import { createContext } from "react";

import type { Social } from "@/types/social";

type Props = {
  setSocials: React.Dispatch<React.SetStateAction<Social[]>>;
  socials: Social[];
};
export const SocialsContext = createContext<Props>({
  setSocials: () => {
    return;
  },
  socials: [
    {
      collection_slug: "",
      creator_username: "",
      discord_members: null,
      record_id: "",
      twitter_followers: null,
    },
  ],
});

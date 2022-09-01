import React, { createContext, useState } from "react";

/*types*/
import { Social } from "@/types/social";

type Props = {
  socials: Social[];
  setSocials: React.Dispatch<React.SetStateAction<Social[]>>;
};
export const SocialsContext = createContext<Props>({
  socials: [
    {
      creator_username: "",
      collection_slug: "",
      twitter_followers: null,
      discord_members: null,
      record_id: "",
    },
  ],
  setSocials: () => {},
});

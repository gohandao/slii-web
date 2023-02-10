import type { LinksField } from "@/types/linksField";

export type Profile = {
  id: string /* primary key */;
  address?: string;
  avatar_url?: string;
  background_url?: string;
  description: string;
  discord_url?: string;
  instagram_id?: string;
  links: LinksField[];
  name: string;
  twitter_id?: string;
  updated_at?: Date;
  username: string;
  verified?: boolean;
};

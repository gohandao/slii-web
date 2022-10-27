import { Tag } from "./tag";

export type Profile = {
  username: string;
  sub_title: string;
  verified?: boolean;
  description: string;
  avatar_url?: string | Blob | MediaSource;
  background_url?: string;
  updated_at: Date;
  twitter_id?: string;
  instagram_id?: string;
  website_url?: string;
  discord_url?: string;
};

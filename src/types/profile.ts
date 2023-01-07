export type Profile = {
  id: string /* primary key */;
  address: string | undefined;
  avatar_url: string;
  background_url: string;
  description: string;
  discord_url?: string;
  instagram_id?: string;
  label: string;
  sub_title: string;
  twitter_id?: string;
  updated_at: Date;
  username: string;
  verified?: boolean;
  website_url?: string;
};

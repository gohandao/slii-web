export type Creator = {
  address: string;
  avatar: any;
  average_floor_price?: number | null;
  average_volume?: number | null;
  background: any;
  background_image?: string;
  category?: string;
  collections?: string[];
  description?: string;
  discord_members?: number | null;
  discord_url?: string;
  instagram_id?: string;
  listed_at: Date | null | string;
  tags?: string[];
  token_symbol?: string | false;
  total_collections?: number | null;
  total_sales?: number | null;
  total_supply?: number | null;
  total_volume?: number | null;
  twitter_followers?: number | null;
  twitter_id?: string;
  type?: string;
  updated_at?: Date | null | string;
  updatedAt?: Date | null | string;
  upvotes_count?: number | null;
  username: string;
  verified?: boolean;
  website_url?: string;
};

export type Creator = {
  address: string;
  avatar?: string;
  average_floor_price?: number | null;
  average_volume?: number | null;
  background?: string;
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
  updated_at?: Date | null | string | number;
  updatedAt?: Date | null | string | number;
  upvotes_count?: number | null;
  upvotes_count_function?: number | null;
  username: string;
  verified?: boolean;
  website_url?: string;
};

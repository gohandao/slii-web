export interface Creators {
  address: string;
  avatar?: string /* primary key */;
  average_floor_price?: any;
  average_volume?: any;
  background?: string;
  category?: string;
  collections?: any[];
  created_at?: string;
  description?: string;
  discord_members?: number;
  token_symbol?: string;
  total_collections?: number;
  total_sales?: number;
  total_supply?: number;
  total_volume?: any; // type unknown;
  twitter_followers?: number; // type unknown;
  twitter_id?: string; // type unknown;
  type?: string;
  updated_at?: string;
  username: string;
  verified?: boolean;
  website_url?: string;
}

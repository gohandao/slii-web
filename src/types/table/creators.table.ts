/* eslint-disable sort-keys-custom-order/type-keys */
export interface Creators {
  address: string;
  username: string /* primary key */;
  type?: string;
  category?: string;
  verified?: boolean;
  avatar?: string;
  background?: string;
  description?: string;
  website_url?: string;
  twitter_id?: string;
  twitter_followers?: number;
  discord_members?: number;
  collections?: any[];
  token_symbol?: string;
  total_volume?: any; // type unknown;
  average_volume?: any; // type unknown;
  average_floor_price?: any; // type unknown;
  total_collections?: number;
  total_supply?: number;
  total_sales?: number;
  created_at?: string;
  updated_at?: string;
}

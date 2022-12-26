/* eslint-disable sort-keys-custom-order/type-keys */
import type { Creators } from "./creators.table";

export interface Collections {
  id: string;
  creator_username?: string /* foreign key to creators.username */;
  address?: string;
  created_at?: string;
  symbols?: any[];
  one_hour_volume?: any; // type unknown;
  one_hour_change?: any; // type unknown;
  one_hour_sales?: number;
  one_hour_sales_change?: any; // type unknown;
  one_hour_average_price?: any; // type unknown;
  one_hour_difference?: any; // type unknown;
  six_hour_volume?: any; // type unknown;
  six_hour_change?: any; // type unknown;
  six_hour_sales?: number;
  six_hour_sales_change?: any; // type unknown;
  six_hour_average_price?: any; // type unknown;
  six_hour_difference?: any; // type unknown;
  one_day_volume?: any; // type unknown;
  one_day_change?: any; // type unknown;
  one_day_sales?: number;
  one_day_sales_change?: any; // type unknown;
  one_day_average_price?: any; // type unknown;
  one_day_difference?: any; // type unknown;
  seven_day_volume?: any; // type unknown;
  seven_day_change?: any; // type unknown;
  seven_day_sales?: number;
  seven_day_average_price?: any; // type unknown;
  seven_day_difference?: any; // type unknown;
  thirty_day_volume?: any; // type unknown;
  thirty_day_change?: any; // type unknown;
  thirty_day_sales?: number;
  thirty_day_average_price?: any; // type unknown;
  thirty_day_difference?: any; // type unknown;
  total_volume?: any; // type unknown;
  total_sales?: number;
  total_supply?: number;
  num_owners?: number;
  average_price?: any; // type unknown;
  market_cap?: any; // type unknown;
  floor_price?: any; // type unknown;
  banner_image_url?: string;
  created_date?: string;
  description?: string;
  discord_url?: string;
  external_url?: string;
  featured_image_url?: string;
  safelist_request_status?: string;
  large_image_url?: string;
  slug: string /* primary key */;
  telegram_url?: string;
  twitter_username?: string;
  instagram_username?: string;
  fees?: any;
  is_rarity_enabled?: boolean;
  tags?: any[];
  type?: string;
  category?: string;
  twitter_followers?: number;
  discord_members?: number;
  creators?: Creators;
}

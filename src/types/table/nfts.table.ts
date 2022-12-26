/* eslint-disable sort-keys-custom-order/type-keys */
export interface Nfts {
  id: number /* primary key */;
  collection_slug?: string;
  name?: string;
  description?: string;
  image_url?: string;
  image_original_url?: string;
  permalink?: string;
  last_sale_price?: number;
  last_sale_symbol?: string;
  token_id?: string;
  num_sales?: number;
  created_at?: string;
  image_thumbnail_url?: string;
  last_sale_created_date?: string;
}

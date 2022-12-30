export interface Nfts {
  id: number /* primary key */;
  collection_slug?: string;
  created_at?: string;
  description?: string;
  image_original_url?: string;
  image_thumbnail_url?: string;
  image_url?: string;
  last_sale_created_date?: string;
  last_sale_price?: number;
  last_sale_symbol?: string;
  name?: string;
  num_sales?: number;
  permalink?: string;
  token_id?: string;
}

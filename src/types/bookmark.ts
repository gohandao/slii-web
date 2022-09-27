export type Bookmark = {
  id: string;
  user_id: string;
  creator_id?: string;
  collection_slug?: string;
  created_at?: Date;
};
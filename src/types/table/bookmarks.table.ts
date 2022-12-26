import type { Profiles } from "./profiles.table";

export interface Bookmarks {
  id: string /* primary key */;
  collection_slug?: string /* foreign key to profiles.id */;
  created_at?: string;
  creator_id?: string;
  profiles?: Profiles;
  user_id?: string;
}

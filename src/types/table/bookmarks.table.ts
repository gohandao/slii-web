/* eslint-disable sort-keys-custom-order/type-keys */
import type { Profiles } from "./profiles.table";

export interface Bookmarks {
  id: string /* primary key */;
  user_id?: string /* foreign key to profiles.id */;
  created_at?: string;
  creator_id?: string;
  collection_slug?: string;
  profiles?: Profiles;
}

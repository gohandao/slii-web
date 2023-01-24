export type Profile = {
  id: string /* primary key */;
  avatar_url?: string;
  description?: string;
  instagram_id?: string;
  label?: string;
  liked_count?: number | null;
  links?: {
    label?: string;
    url: string;
  }[];
  name?: string;
  stars_count?: number | null;
  twitter_id?: string;
  username: string;
};

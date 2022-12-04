export type Collection = {
  category: string;
  creator_id: string;
  discord_members: number | null;
  listed_at: Date | null;
  name: string;
  record_id: string;
  slug: string;
  tags: string[];
  twitter_followers: number | null;
  type: string;
  updatedAt: Date | null;
  verified: boolean;
};

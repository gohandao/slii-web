export type Collection = {
  category: string;
  creator_username?: string;
  creator_address: string;
  discord_members: number | null;
  listed_at: Date | null;
  name: string;
  record_id: string;
  slug: string;
  tags: string[];
  twitter_followers: number | null;
  type: string;
  verified: boolean;
};

export type Collection = {
  category: string;
  creator_address: string;
  creator_username?: string;
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

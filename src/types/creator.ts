export type Creator = {
  username: string;
  description: string;
  avatar: string;
  background: string;
  address: string;
  website: string;
  twitter_id: string;
  instagram_id: string;
  discord_url: string;
  type: string;
  verified: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  collections: [];
  category: string;
  tags: [];
};

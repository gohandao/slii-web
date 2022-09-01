export type Collection = {
  record_id: string;
  name: string;
  slug: string;
  creator_id: string;
  type: string;
  category: string;
  verified: boolean;
  tags: [];
  createdAt: Date | null;
  updatedAt: Date | null;
};

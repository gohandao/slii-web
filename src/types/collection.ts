export type Collection = {
  name: string;
  slug: string;
  creator_id: string;
  type: string;
  category: string;
  tags: [];
  createdAt: Date | null;
  updatedAt: Date | null;
};

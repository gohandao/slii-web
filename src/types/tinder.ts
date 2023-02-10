export type TItem = {
  buttonHandlers?: TButtons;
  cards: TCard[];
};
export type TCard = {
  id: string;
  above_tags?: string[];
  below_tags?: string[];
  image?: string;
  name: string;
  order?: number;
  path: string;
  type: string;
  upvotes_count: number;
  verified?: boolean;
};
export type TButtons = {
  onClickDisllike?: () => void;
  onClickLike?: () => void;
  onClickStar?: () => void;
  onClickUndo?: () => void;
};

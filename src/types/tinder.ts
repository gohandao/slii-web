export type TItem = {
  buttonHandlers?: TButtons;
  cards: TCard[];
};
export type TCard = {
  above_tags?: string[];
  below_tags?: string[];
  image?: string;
  label?: string;
  name: string;
  order?: number;
  path: string;
  verified?: boolean;
};
export type TButtons = {
  onClickDisllike?: () => void;
  onClickLike?: () => void;
  onClickStar?: () => void;
  onClickUndo?: () => void;
};

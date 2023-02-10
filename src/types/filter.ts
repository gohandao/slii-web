/*eslint-disable*/
export type Filter = {
  type?: {
    param: string;
    title: string;
  }[];
  sort?: {
    param: string;
    title: string;
  }[];
  order?: {
    param: string;
    title: string;
  }[];
};

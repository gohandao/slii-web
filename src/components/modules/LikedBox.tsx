import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const LikedBox = ({ children }: Props) => {
  return <div className="grid w-full grid-cols-3 justify-center gap-3 lg:grid-cols-4">{children}</div>;
};

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const StatsBox = ({ children }: Props) => {
  return (
    <div className={`relative -mb-3`}>
      <dl className={`flex gap-5`}>{children}</dl>
    </div>
  );
};

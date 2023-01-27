import type { FC, ReactNode } from "react";

type Props = {
  addClass?: string;
  children: ReactNode;
};
export const NavButton: FC<Props> = ({ addClass, children }) => {
  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white text-sky-500 shadow-2xl ${addClass}`}
    >
      {children}
    </div>
  );
};

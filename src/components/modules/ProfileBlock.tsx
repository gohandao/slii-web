import type { FC, ReactNode } from "react";

type Props = {
  addClass?: string;
  children: ReactNode;
};
export const ProfileBlock: FC<Props> = ({ addClass, children }) => {
  return (
    <div
      className={`mx-auto flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl shadow-gray-200 ${addClass}`}
    >
      {children}
    </div>
  );
};

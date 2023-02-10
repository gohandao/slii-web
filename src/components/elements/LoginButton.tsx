import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  property?: boolean;
};
export const LoginButton: FC<Props> = ({ children, property }) => {
  const colorClass = !property
    ? "bg-gradient-to-r from-cyan-500 to-blue-500 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800"
    : "bg-gray-400 cursor-default";
  return (
    <div
      className={`inline-block min-w-[200px] rounded-lg px-5 py-3  text-center font-medium text-white transition-all duration-300 ${colorClass}`}
    >
      {children}
    </div>
  );
};

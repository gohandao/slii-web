import React, { ReactNode } from "react";
import Link from "next/link";

type Props = {
  href: string;
  children: ReactNode;
};
export const LinkButton = ({ href, children }: Props) => {
  return (
    <Link href={href}>
      <a className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2 transition">
        {children}
      </a>
    </Link>
  );
};

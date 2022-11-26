import React, { ReactNode } from "react";
import Link from "next/link";

type Props = {
  href: string;
  children: ReactNode;
};
export const LinkButton = ({ href, children }: Props) => {
  return (
    <Link href={href} legacyBehavior>
      <a className="mr-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 text-center font-medium text-white transition hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800">
        {children}
      </a>
    </Link>
  );
};

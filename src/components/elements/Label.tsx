import Link from "next/link";
import type { FC } from "react";

type Props = {
  name: string;
  type: "creator" | "collection";
};
export const Label: FC<Props> = ({ name, type }) => {
  const typeClass = " border-gray-500 text-gray-600";
  return (
    <object>
      <Link href={`/tags/${name}?type=${type}`} legacyBehavior>
        <a className={`rounded py-1 text-xs md:text-sm ${typeClass}`}>#{name}</a>
      </Link>
    </object>
  );
};

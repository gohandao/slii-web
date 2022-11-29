import Link from "next/link";
import React from "react";

type Props = {
  name: string;
  type: "creator" | "collection";
};
export const Label = ({ name, type }: Props) => {
  let typeClass = " border-gray-500 text-gray-600";
  return (
    <object>
      <Link href={`/tags/${name}?type=${type}`} legacyBehavior>
        <a className={`rounded py-1 text-xs md:text-sm ${typeClass}`}>
          #{name}
        </a>
      </Link>
    </object>
  );
};

/*
    <button
      onClick={() => {
        router.push(`/tags/${name}`);
      }}
        className={`bg-blue-50 text-blue-400 rounded px-3 py-1 text-sm ${typeClass}`}
      >
        #{name}
      </button>
      */

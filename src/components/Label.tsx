import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  name: string;
  type: "creator" | "collection";
};
export const Label = ({ name, type }: Props) => {
  const router = useRouter();

  let typeClass = "bg-gray-500 text-gray-100";
  if (type == "creator") {
    typeClass = "bg-blue-900 text-blue-100";
  } else if (type == "collection") {
    typeClass = "bg-green-900 text-green-100";
  }

  return (
    <object>
      <Link href={`/tags/${name}?type=${type}`}>
        <a className={`rounded px-2 py-1 text-xs md:text-sm ${typeClass}`}>
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

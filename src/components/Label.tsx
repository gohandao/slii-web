import React from 'react'
import Link from "next/link"
import {useRouter} from "next/router"

type Props = {
  name: string;
  type: "creator" | "collection";
}
export const Label = ({ name, type }: Props) => {
    const router = useRouter();

  let typeClass = "bg-gray-50 text-gray-400";
  if (type == "creator") {
    typeClass = "bg-blue-50 text-blue-400";
  } else if (type == "collection") {
    typeClass = "bg-green-50 text-green-400";
  }
  return (
    <object>
      <Link href={`/tags/${name}`}>
        <a
          className={`bg-blue-50 text-blue-400 rounded px-3 py-1 text-sm ${typeClass}`}
        >
          #{name}
        </a>
      </Link>
    </object>
  );
}

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
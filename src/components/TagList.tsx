import React from "react";
import Link from "next/link";

import { Tag } from "@/types/tag";

type Props = {
  tags: Tag[];
  type: "creator" | "collection",
};
export const TagList = ({ tags, type }: Props) => {
  let typeClass = "bg-gray-50 text-gray-400";
  if (type == "creator") {
    typeClass = "bg-blue-50 text-blue-400";
  } else if (type == "collection") {
    typeClass = "bg-green-50 text-green-400";
  }
  return (
    <div className="flex flex-wrap gap-3">
      {tags &&
        tags.map((tag, index) => (
          <div key={index}>
            {tag && tag.name && (
              <Link href={`/tags/${tag.name}`}>
                <a className={`inline-block rounded px-4 py-3 ${typeClass}`}>#{tag.name} ({tag.count})</a>
              </Link>
            )}
          </div>
        ))}
    </div>
  );
};

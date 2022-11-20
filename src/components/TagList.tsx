import React from "react";
import Link from "next/link";

import { Tag } from "@/types/tag";

type Props = {
  tags: Tag[];
  type: "creator" | "collection";
};
export const TagList = ({ tags, type }: Props) => {
  let typeClass = "bg-gray-500 text-gray-100";
  if (type == "creator") {
    typeClass = "bg-indigo-900 text-indigo-100";
  } else if (type == "collection") {
    typeClass = "bg-teal-900 text-teal-100";
  }
  return (
    <div className="flex flex-wrap gap-2">
      {tags &&
        tags.map((tag, index) => {
          let path;
          if (type == "collection") {
            path = `/tags/${tag.name}?tab=${type}`;
          } else {
            path = `/tags/${tag.name}`;
          }
          return (
            <div key={index}>
              {tag && tag.name && (
                <Link href={path} legacyBehavior>
                  <a
                    className={`inline-block rounded px-3 py-2 text-sm ${typeClass}`}
                  >
                    #{tag.name} ({tag.count})
                  </a>
                </Link>
              )}
            </div>
          );
        })}
    </div>
  );
};

import Link from "next/link";
import type { FC } from "react";

import type { Tag } from "@/types/tag";

type Props = {
  tags: Tag[];
  type: "creator" | "collection";
};
export const TagList: FC<Props> = ({ tags, type }) => {
  const typeClassMap = {
    collection: "bg-teal-900 text-teal-100",
    creator: "bg-indigo-900 text-indigo-100",
    default: "bg-gray-500 text-gray-100",
  };
  const typeClass = typeClassMap[type] || typeClassMap.default;

  return (
    <div className="flex flex-wrap gap-2">
      {tags &&
        tags.map((tag, index) => {
          const path = type === "collection" ? `/tags/${tag.name}?tab=${type}` : `/tags/${tag.name}`;
          return (
            <div key={index}>
              {tag && tag.name && (
                <Link href={path} legacyBehavior>
                  <a className={`inline-block rounded px-3 py-2 text-sm ${typeClass}`}>
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

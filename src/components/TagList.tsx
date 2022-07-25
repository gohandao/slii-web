import React from "react";
import Link from "next/link";

import { Tag } from "@/types/tag";

type Props = {
  tags: Tag[];
};
export const TagList = ({ tags }: Props) => {
  return (
    <div className="flex flex-wrap gap-5">
      {tags &&
        tags.map((tag, index) => (
          <div key={index}>
            {tag && tag.name && (
              <Link href={`/tags/${tag.name}`} key={index}>
                <a className="rounded-full border-2 border-gray-900 px-3 py-1">
                  {tag.name} ({tag.count})
                </a>
              </Link>
            )}
          </div>
        ))}
    </div>
  );
};

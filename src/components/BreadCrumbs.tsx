import React from "react";
import Link from "next/link";

type Props = {
  list: {
    name: string;
    path?: string;
  }[];
};

export const BreadCrumbs = ({ list }: Props) => {
  return (
    <ol
      className="flex items-center justify-center gap-3 pt-3 pb-3"
      aria-label="breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {list.map(({ name = "Home", path = "/" }, index) => (
        <li
          className="flex items-center"
          key={index}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          {list.length - 1 !== index ? (
            <div className="flex items-center gap-3 text-blue-500">
              <Link href={path}>
                <a className="" itemProp="item">
                  <span itemProp="name">{name}</span>
                </a>
              </Link>
              <meta itemProp="position" content={`${list.length}`} />
              <span className="text-gray-900">/</span>
            </div>
          ) : (
            <div className="" itemProp="item">
              <span aria-current="page" itemProp="name">
                {name}
              </span>
              <meta itemProp="position" content={`${list.length}`} />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
};

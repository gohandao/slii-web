import { useRouter } from "next/router";
import type { FC } from "react";
import { Link } from "react-scroll";

import { collection_categories, creators_categories } from "@/data/categories";

type Props = {
  path: string;
  type: "creator" | "collection";
};
export const CategorySearch: FC<Props> = ({ path, type }) => {
  const router = useRouter();
  const { category } = router.query;
  const categories = type == "creator" ? creators_categories : collection_categories;
  return (
    <>
      {categories.map((item, index) => {
        <Link to={`${path}/c/${item}`} key={index}>
          <a
            className={`rounded-full bg-gray-400 px-4 py-2 text-sm text-gray-600 ${
              item == category && "!bg-gray-800 !text-gray-300"
            }`}
          >
            {category}
          </a>
        </Link>;
      })}
    </>
  );
};

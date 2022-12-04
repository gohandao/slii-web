import { useRouter } from "next/router";
import type { FC } from "react";

import { setParams } from "@/utilities/setParams";

type Props = {
  currentPage: number;
  length: number;
  limit: number;
};
type ItemProps = {
  count: number;
};
export const Pagination: FC<Props> = ({ currentPage, length, limit }) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const lastPage = Math.floor(length / limit) + 1;
  const router = useRouter();
  const { order, screen, search, sort, term, type } = router.query;

  const PaginationItem = ({ count }: ItemProps) => {
    let activeClass;
    if (count == currentPage) {
      activeClass = "bg-gray-700 border-gray-600 cursor-default";
    } else {
      activeClass = "bg-gray-800 border-gray-700 hover:bg-gray-700 ";
    }
    return (
      <button
        className={`flex h-9 w-9 items-center justify-center rounded border text-gray-300 ${activeClass}`}
        onClick={() => {
          setParams({
            order: order && (order as string),
            page: count,
            screen: screen && (screen as string),
            search: search && (search as string),
            sort: sort && (sort as string),
            term: term && (term as string),
            type: type && (type as string),
          });
        }}
      >
        {count}
      </button>
    );
  };
  return (
    <div className="flex gap-2">
      {currentPage != 1 && <PaginationItem count={1} />}
      {prevPage > 1 && <PaginationItem count={prevPage} />}
      <PaginationItem count={currentPage} />
      {nextPage < lastPage && <PaginationItem count={nextPage} />}
      {nextPage + 1 < lastPage && <PaginationItem count={nextPage + 1} />}
      {currentPage != lastPage && <PaginationItem count={lastPage} />}
    </div>
  );
};

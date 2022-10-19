import React from "react";
import router, { useRouter } from "next/router";

import Router from "next/router";
import Link from "next/link";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";
import { setParams } from "@/utilities/setParams";

type Props = {
  currentPage: number;
  length: number;
  limit: number;
};
type ItemProps = {
  count: number;
};

export const Pagination = ({ currentPage, length, limit }: Props) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const lastPage = Math.floor(length / limit) + 1;
  const router = useRouter();
  const { order, sort, term, page, type, search } = router.query;

  const PaginationItem = ({ count }: ItemProps) => {
    let activeClass;
    if (count == currentPage) {
      activeClass = "bg-gray-700 border-gray-600 cursor-default";
    } else {
      activeClass = "bg-gray-800 border-gray-700 hover:bg-gray-700 ";
    }
    return (
      <button
        className={`w-9 h-9 border rounded flex items-center justify-center text-gray-300 ${activeClass}`}
        onClick={() => {
          setParams({
            type: type && (type as string),
            sort: sort && (sort as string),
            order: order && (order as string),
            term: term && (term as string),
            page: count,
            search: search && (search as string),
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

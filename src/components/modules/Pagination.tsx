import { useAtom } from "jotai";
import type { FC } from "react";

import { items_per_page } from "@/constant/settings.const";
import { currentPageAtom } from "@/state/utilities.state";

type Props = {
  length: number;
};
type ItemProps = {
  count: number;
};
export const Pagination: FC<Props> = ({ length }) => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const lastPage = Math.floor(length / items_per_page) + 1;

  const PaginationItem = ({ count }: ItemProps) => {
    const activeClass =
      count === currentPage
        ? "bg-sky-500 border-sky-500 cursor-default text-white"
        : "bg-white border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white";
    return (
      <button
        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-medium transition-all duration-300 ${activeClass}`}
        onClick={() => {
          setCurrentPage(count);
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

import React, { useContext } from "react";
import { useRouter } from "next/router";

import Router from "next/router";
import Link from "next/link";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";

type Props = {
  currentPage: number;
};
type ItemProps = {
  count: number;
};

export const ShowMore = ({ currentPage }: Props) => {
  const nextPage = currentPage + 1;
  const { page, setPage } = useContext(UtilitiesContext);
  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          page && setPage(page + 1);
        }}
        type="button"
        className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-gray-800 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
      >
        Show more ...
      </button>
    </div>
  );
};

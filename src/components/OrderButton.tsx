import { setParams } from "@/utilities/setParams";
import { useRouter } from "next/router";
import React from "react";
import { TbArrowBigDownLine, TbArrowBigUpLine } from "react-icons/tb";

export const OrderButton = () => {
  const router = useRouter();
  const { order, sortBy, term, page, type } = router.query;
  const currentPage = page ? Number(page) : 1;
  return (
    <button
      onClick={() => {
        let new_order = "";
        let new_page;
        if (currentPage && currentPage != 1) {
          new_page = currentPage;
        }
        if (order == "desc") {
          new_order = "asc";
        } else if (order == "asc") {
          new_order = "desc";
        }
        if (!order) {
          new_order = "asc";
        }
        setParams({
          type: type && (type as string),
          sortBy: sortBy && (sortBy as string),
          order: new_order,
          page: new_page,
        });
      }}
    >
      {!order || order == "desc" ? (
        <TbArrowBigDownLine className="text-gray-400 " />
      ) : (
        <TbArrowBigUpLine className="text-gray-400 " />
      )}
    </button>
  );
};

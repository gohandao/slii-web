import { useRouter } from "next/router";
import { TbArrowBigDownLine, TbArrowBigUpLine } from "react-icons/tb";

import { setParams } from "@/utilities/setParams";

export const OrderButton = () => {
  const router = useRouter();
  const { order, page, screen, search, sort, term, type } = router.query;
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
          order: new_order,
          page: new_page,
          screen: screen && (screen as string),
          search: search && (search as string),
          sort: sort && (sort as string),
          term: term && (term as string),
          type: type && (type as string),
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

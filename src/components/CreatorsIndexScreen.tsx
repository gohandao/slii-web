import { useEffect, useState } from "react";
import { IoMdSync } from "react-icons/io";

import { CreatorList } from "@/components/CreatorList";
import { Dropdown } from "@/components/Dropdown";
import { OrderButton } from "@/components/OrderButton";
import { Pagination } from "@/components/Pagination";
import { Searchbox } from "@/components/Searchbox";
import { TabIndex } from "@/components/TabIndex";
import { getCreators } from "@/libs/supabase";
import type { Creator } from "@/types/creator";
import type { Params } from "@/types/params";

type Props = {
  params: Params;
};
export const CreatorsIndexScreen = ({ params }: Props) => {
  const { order, page, search, sort, term, type } = params;
  const currentPage = page ? Number(page) : 1;
  const limit = 100;
  // const { hiddenParams } = useContext(UtilitiesContext);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const props = {
      order: order as "desc" | "asc" | undefined,
      page: currentPage,
      sort: sort as string | undefined,
      type: type as string | undefined,
    };
    const fetchData = async () => {
      const { count, data } = await getCreators(props);
      data && setCreators(data);
      count && setCount(count);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, page, search, order, sort, term]);

  return (
    <>
      <section className="mx-auto px-5 lg:px-8">
        <div className="">
          <TabIndex />
        </div>
        <div className="mb-2 flex gap-3">
          <div className="flex w-full items-baseline justify-between gap-3">
            <p className="text-sm text-gray-500">{count} Creators</p>
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <IoMdSync />
              every 24h
            </p>
          </div>
        </div>
        <div className="relative z-20 mb-3 flex justify-between gap-3 sm:gap-5">
          <Dropdown position="left" property="creatorType" />
          <Searchbox id="creator" />
          <div className="flex items-center gap-3">
            <Dropdown position="right" property="creatorSort" />
            <OrderButton />
          </div>
        </div>
        <div className="mb-10">{count > 0 && <CreatorList creators={creators} limit={limit} />}</div>
        <div className="flex justify-center">
          <Pagination currentPage={currentPage} length={count} limit={limit} />
        </div>
      </section>
    </>
  );
};

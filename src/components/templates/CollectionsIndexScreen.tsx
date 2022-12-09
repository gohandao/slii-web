import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdSync } from "react-icons/io";

import { OrderButton } from "@/components/elements/OrderButton";
import { Searchbox } from "@/components/elements/Searchbox";
import { TabIndex } from "@/components/elements/TabIndex";
import { CollectionList } from "@/components/modules/CollectionList";
import { Dropdown } from "@/components/modules/Dropdown";
import { Pagination } from "@/components/modules/Pagination";
import { getCollections } from "@/libs/supabase";

export const CollectionsIndexScreen = () => {
  const router = useRouter();
  const { order, page, search, sort, term, type } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 20;
  const [collections, setCollections] = useState([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const props = {
      order: order as "desc" | "asc" | undefined,
      page: currentPage as number,
      search: search as string | undefined,
      sort: sort as string | undefined,
      term: term as string | undefined,
      type: type as string | undefined,
    };
    const fetchData = async () => {
      const { count, data } = await getCollections(props);
      data && setCollections(data);
      count && setCount(count);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collections, order, sort, term, page, type]);

  return (
    <section className="mx-auto px-5 lg:px-8">
      <div className="">
        <TabIndex />
      </div>
      <div className="mb-2 flex gap-3">
        <div className="flex w-full items-baseline justify-between gap-3">
          <p className="text-sm text-gray-500">{count} Collections</p>
          <p className="flex items-center gap-2 text-sm text-gray-500">
            <IoMdSync />
            every 24h
          </p>
        </div>
      </div>
      <div className="relative z-20 mb-3 flex justify-between gap-3 sm:gap-5">
        <Dropdown position="left" property="collectionType" />
        <Searchbox id="collection" />
        <div className="flex items-center gap-3">
          <Dropdown position="right" property="collectionSort" />
          <OrderButton />
        </div>
      </div>
      <div className="mb-10">
        {collections.length > 0 && <CollectionList collections={collections} limit={limit} />}
      </div>
      {count / limit > 1 && (
        <div className="flex justify-center">
          <Pagination currentPage={currentPage} length={count} limit={limit} />
        </div>
      )}
    </section>
  );
};

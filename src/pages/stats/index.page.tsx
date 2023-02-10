import type { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { IoMdSync } from "react-icons/io";

import { Searchbox } from "@/components/elements/Searchbox";
import { SplitLayout } from "@/components/layouts/SplitLayout";
import { Dropdown } from "@/components/modules/Dropdown";
import { site_name } from "@/constant/seo.const";
import { getCollections } from "@/libs/supabase";
import { CollectionTable } from "@/pages/stats/components/CollectionTable";
import { TermSort } from "@/pages/stats/components/TermSort";

const StatsPage: NextPage = () => {
  return <></>;
  const router = useRouter();
  const { page, search, sort, term, type } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 20;
  const [collections, setCollections] = useState([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const props = {
        page: currentPage as number,
        search: search as string,
        sort: sort as string,
        term: term as string,
        type: type as string,
      };
      const { count, data } = await getCollections(props);
      data &&
        setCollections(() => {
          return data;
        });
      count && setCount(count);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, search, page, term, sort]);

  return (
    <div>
      <NextSeo
        title={`NFT Collection Stats in Japan | ${site_name}`}
        description="Search and analize various Japanese NFT collections."
        openGraph={{
          description: "Search and analize various Japanese NFT collections.",
          title: `NFT Collection Stats in Japan | ${site_name}`,
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/stats",
        }}
      />
      <SplitLayout>
        <section className="mx-auto mt-3 w-full px-5 md:px-8">
          <h1 className="mb-3 text-sm tracking-[0.2em] text-gray-500">Japanese awesome NFT collections stats.</h1>
          {collections && (
            <div className="mb-2 flex w-full items-baseline justify-between gap-3">
              <p className="text-sm text-gray-500">{count} collections</p>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <IoMdSync />
                every 24h
              </p>
            </div>
          )}
          <div className="mb-4 flex items-center justify-between gap-3 sm:gap-5">
            <Dropdown position="left" property="collectionType" />
            <Searchbox id="collection" />
            <div className="hidden md:flex">
              <TermSort term={term as string} />
            </div>
            <div className="flex md:hidden">
              <Dropdown position="right" property="term" />
            </div>
          </div>
          <div className="mb-10">{collections && <CollectionTable collections={collections} limit={limit} />}</div>
          {/* <div className="flex justify-center">
            <Pagination currentPage={currentPage} length={count} limit={limit} />
          </div> */}
        </section>
      </SplitLayout>
    </div>
  );
};
export default StatsPage;

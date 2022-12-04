import type { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useContext, useEffect } from "react";
import { IoMdSync } from "react-icons/io";
import { TbDiamond } from "react-icons/tb";

import { BaseLayout } from "@/components/BaseLayout";
import { CollectionTable } from "@/components/CollectionTable";
import { Dropdown } from "@/components/Dropdown";
import { Pagination } from "@/components/Pagination";
import { Searchbox } from "@/components/Searchbox";
import { TermSort } from "@/components/TermSort";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import type { Collection } from "@/types/collection";

const StatsPage: NextPage = () => {
  const router = useRouter();
  const { page, search, term, type } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 100;

  const { setHeaderIcon } = useContext(UtilitiesContext);
  useEffect(() => {
    setHeaderIcon({
      avatar: "",
      element: <TbDiamond />,
      emoji: "",
      path: "/stats",
      title: "Collection stats",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { collections } = useContext(BaseContext);

  const filteredCollections =
    type && type != "all"
      ? collections.filter((collection) => {
          return collection.type === type;
        })
      : collections;

  const uppperKeyword = typeof search == "string" && search.toUpperCase();
  //1.match username
  const searchedCollections01 = filteredCollections.filter((collection) => {
    return (
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      collection.name.toUpperCase().includes(uppperKeyword) == true
    );
  });
  const origin_searchedCollections = [...searchedCollections01];
  //重複削除
  let searchedCollections = [] as Collection[];
  if (search && search.length > 0) {
    searchedCollections = Array.from(new Set(origin_searchedCollections));
  } else {
    searchedCollections = filteredCollections;
  }

  return (
    <div>
      <NextSeo
        title="NFT Collection Stats in Japan | NFT OTAKU"
        description="Search and analize various Japanese NFT collections."
        openGraph={{
          description: "Search and analize various Japanese NFT collections.",
          title: "NFT Collection Stats in Japan | NFT OTAKU",
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/stats",
        }}
      />
      <BaseLayout>
        <section className="mx-auto mt-3 px-5 md:px-8">
          <h1 className="mb-3 text-sm tracking-[0.2em] text-gray-500">Japanese awesome NFT collections stats.</h1>
          {collections && (
            <div className="mb-2 flex w-full items-baseline justify-between gap-3">
              <p className="text-sm text-gray-500">{collections.length} collections</p>
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
          <div className="mb-10">
            {searchedCollections && <CollectionTable collections={searchedCollections} limit={limit} />}
          </div>
          <div className="flex justify-center">
            <Pagination currentPage={currentPage} length={searchedCollections.length} limit={limit} />
          </div>
        </section>
      </BaseLayout>
    </div>
  );
};
export default StatsPage;

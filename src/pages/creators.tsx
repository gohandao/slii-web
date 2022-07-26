import type { NextPage } from "next";
import { NextSeo } from "next-seo";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";

import { CreatorList } from "@/components/CreatorList";
import { CollectionTable } from "@/components/CollectionTable";
import { SearchArea } from "@/components/SearchArea";

import { Mainvisual } from "@/components/Mainvisual";
import { ShowMore } from "@/components/ShowMore";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { IndexTab } from "@/components/IndexTab";
import { Hr } from "@/components/Hr";
import { Title } from "@/components/Title";
import { LinkButton } from "@/components/LinkButton";

import { CreatorsContext } from "@/contexts/CreatorsContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";

import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";

const CreatorsPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;

  const creators = useContext(CreatorsContext);
  const collections = useContext(CollectionsContext);

  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);

  useEffect(() => {
    setFilteredCreators(creators);
  }, [creators]);

  const filterCreatorsHandler = (key: string) => {
    if (key == "all") {
      setFilteredCreators(creators);
    } else {
      const new_filteredCreators = creators.filter(
        (item) =>
          //@ts-ignore
          item.type.includes(key) == true
      );
      setFilteredCreators(new_filteredCreators);
    }
  };

  const title = "Awesome NFT Creators List by Gachi";
  const description = "Check these awesome NFT creators now.";
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: "article",
          title: title,
          description: description,
          url: process.env.NEXT_PUBLIC_SITE_URL + `/creators`,
          images: [
            {
              url: process.env.NEXT_PUBLIC_SITE_URL + "/default-ogp.jpg",
              width: 1200,
              height: 630,
              alt: title,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <BaseLayout>
        <section className="mx-auto max-w-7xl mt-12">
          <Title property="h2" addClass="mb-5">
            Creators
          </Title>
          <div className="flex gap-5">
            <button
              onClick={() => {
                filterCreatorsHandler("all");
              }}
            >
              All
            </button>
            <button
              onClick={() => {
                filterCreatorsHandler("creator");
              }}
            >
              Creator
            </button>
            <button
              onClick={() => {
                filterCreatorsHandler("project");
              }}
            >
              Project
            </button>
          </div>
          <div className="mb-10">
            <CreatorList creators={filteredCreators} />
          </div>
          <div className="flex justify-center mb-20">
            <ShowMore currentPage={page ? Number(page) : 1} />
          </div>
        </section>
      </BaseLayout>
    </>
  );
};

export default CreatorsPage;

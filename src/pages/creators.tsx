import type { NextPage } from "next";
import { NextSeo } from "next-seo";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";

import { CreatorList } from "@/components/CreatorList";
import { CollectionTable } from "@/components/CollectionTable";
import { SearchArea } from "@/components/SearchArea";

import { Headline } from "@/components/Headline";
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
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { BreadCrumbs } from "@/components/BreadCrumbs";
import { Dropdown } from "@/components/Dropdown";

const CreatorsPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;

  const creators = useContext(CreatorsContext);
  const collections = useContext(CollectionsContext);
  const { creatorType } = useContext(UtilitiesContext);

  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);

  const creatorsLength = creators.length;

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

  useEffect(() => {
    filterCreatorsHandler(creatorType);
  }, [creatorType]);

  const title = "Japanese NFT creators list by Gachi";
  const description = "Check these japanese NFT creators now.";

  const Button = ({ filter }: any) => {
    return (
      <button
        onClick={() => {
          filterCreatorsHandler(filter);
        }}
        className="capitalize inline-flex justify-center px-6 py-1 rounded-full border border-gyay-500"
      >
        {filter}
      </button>
    );
  };
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
              url: process.env.NEXT_PUBLIC_SITE_URL + "/ogp-default.jpg",
              width: 1200,
              height: 630,
              alt: title,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <BaseLayout>
        <section className="mx-auto mt-5 lg:mt-12 px-5 md:px-8">
          <div className="mb-5">
            <Headline
              pageTitle="Creators"
              title="Japanese awesome NFT creatores List."
              length={creatorsLength}
              label="Creators"
            />
          </div>
          <div className="relative flex gap-5 z-20 justify-between">
            <Dropdown position="left" type="creatorType" />
            {/*<Button filter="all" />
            <Button filter="creator" />
      <Button filter="project" />*/}
          </div>
          <div className="mb-10">
            <CreatorList creators={filteredCreators} />
          </div>
          <div className="flex justify-center mb-20">
            <ShowMore currentPage={page ? Number(page) : 1} />
          </div>
        </section>
        <BreadCrumbs
          list={[
            {
              name: "Home",
              path: "/",
            },
            {
              name: "Creators",
              path: "/creators",
            },
          ]}
        />
      </BaseLayout>
    </>
  );
};

export default CreatorsPage;

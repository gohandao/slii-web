import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { base } from "@/libs/airtable";

import React, { useState, useEffect, useContext } from "react";

import { TagList } from "@/components/TagList";
import { CreatorList } from "@/components/CreatorList";
import { CollectionTable } from "@/components/CollectionTable";
import { BaseLayout } from "@/components/BaseLayout";
import { Title } from "@/components/Title";

import { Tag } from "@/types/tag";
import { Headline } from "@/components/Headline";
import { BreadCrumbs } from "@/components/BreadCrumbs";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { BiPurchaseTagAlt } from "react-icons/bi";

type GetAllTags = {
  baseName: string;
  currentTags: [];
  setState: React.Dispatch<React.SetStateAction<Tag[]>>;
};
const TagsPage: NextPage = () => {
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const router = useRouter();
  const { page } = router.query;

  const { setHeaderIcon } = useContext(UtilitiesContext);
  useEffect(() => {
    setHeaderIcon({
      title: "Tags",
      emoji: "",
      avatar: "",
      element: <BiPurchaseTagAlt />,
      path: `/tags`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const { setBreadcrumbList } = useContext(UtilitiesContext);
  // const breadcrumbList = [
  //   {
  //     name: "Home",
  //     path: "/",
  //   },
  //   {
  //     name: "Tags",
  //     path: "/tags",
  //   },
  // ];
  // useEffect(() => {
  //   setBreadcrumbList(breadcrumbList);
  // }, []);

  const { tags } = useContext(BaseContext);
  // const  = useContext(CollectionTagsContext);

  return (
    <div>
      <Head>
        <title>
          Search Japanese NFT creators and collections with tags | NFT OTAKU
        </title>
        <meta
          name="description"
          content="You can search Japanese NFT creators and collections with tags."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout>
        {/*<div className="mx-auto px-5 md:px-8 mt-5 lg:mt-10 mb-5">
          <Headline
            pageTitle="Tags"
            emoji="📌"
            title="Search Japanese creators and collections with tags."
          />
  </div>*/}
        <div className="">
          <div className="mx-auto px-5 md:px-8 mt-3">
            <h1 className="text-gray-500 text-sm tracking-[0.2em] mb-3">
              Tags for search.
            </h1>
          </div>
          <section className="mx-auto px-5 md:px-8 mt-5">
            {/* <div className="mb-2">
              <TagList tags={creatorTags} type="creator" />
            </div>
            <div className="mb-10">
              <TagList tags={collectionTags} type="collection" />
            </div> */}
            <div className="mb-10">
              <TagList tags={tags} type="creator" />
            </div>
          </section>
        </div>
      </BaseLayout>
    </div>
  );
};

export default TagsPage;

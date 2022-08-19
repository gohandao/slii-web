import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { base } from "@/libs/airtable";

import React, { useState, useEffect, useContext } from "react";

import {
  CreatorTagsContext,
  CollectionTagsContext,
} from "@/contexts/TagsContext";

import { TagList } from "@/components/TagList";
import { CreatorList } from "@/components/CreatorList";
import { CollectionTable } from "@/components/CollectionTable";
import { BaseLayout } from "@/components/BaseLayout";
import { Title } from "@/components/Title";

import { Tag } from "@/types/tag";
import { Headline } from "@/components/Headline";

type GetAllTags = {
  baseName: string;
  currentTags: [];
  setState: React.Dispatch<React.SetStateAction<Tag[]>>;
};
const TagsPage: NextPage = () => {
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const router = useRouter();
  const { page } = router.query;
  const CreatorTags = useContext(CreatorTagsContext);
  const CollectionTags = useContext(CollectionTagsContext);

  return (
    <div>
      <Head>
        <title>
          Search Japanese NFT creators and collections with tags | Gachi
        </title>
        <meta
          name="description"
          content="You can search Japanese NFT creators and collections with tags."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout>
        <div className="mx-auto px-5 md:px-8 mt-5 lg:mt-12 mb-5">
          <Headline
            pageTitle="Tags"
            title="Search Japanese creators and collections with tags."
          />
        </div>
        <section className="mx-auto px-5 md:px-8 mt-5 lg:mt-12">
          <Title property="h3" addClass="mb-5">
            Creator Tags
          </Title>
          <div className="mb-10">
            <TagList tags={CreatorTags} type="creator" />
          </div>
        </section>
        <section className="mx-auto px-5 md:px-8 mt-5 lg:mt-12">
          <Title property="h3" addClass="mb-5">
            Collection Tags
          </Title>
          <div className="mb-10">
            <TagList tags={CollectionTags} type="collection" />
          </div>
        </section>
      </BaseLayout>
    </div>
  );
};

export default TagsPage;

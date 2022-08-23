import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useState, useEffect, useContext } from "react";

import { CreatorList } from "@/components/CreatorList";
import { CollectionTable } from "@/components/CollectionTable";
import { SearchArea } from "@/components/SearchArea";

import { BreadCrumbs } from "@/components/BreadCrumbs";

import { Mainvisual } from "@/components/Mainvisual";
import { ShowMore } from "@/components/ShowMore";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { IndexTab } from "@/components/IndexTab";
import { Hr } from "@/components/Hr";
import { Title } from "@/components/Title";
import { LinkButton } from "@/components/LinkButton";

import { TagList } from "@/components/TagList";

import {
  CreatorTagsContext,
  CollectionTagsContext,
} from "@/contexts/TagsContext";
import { CreatorsContext } from "@/contexts/CreatorsContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";

import { Tag } from "@/types/tag";

const Home: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;

  const creators = useContext(CreatorsContext);
  const collections = useContext(CollectionsContext);

  const CreatorTags = useContext(CreatorTagsContext);
  const CollectionTags = useContext(CollectionTagsContext);

  const creatorsLength = creators.length;
  const collectionsLength = collections.length;
  const creatorTagsLength = CreatorTags.length;
  const collectionTagsLength = CollectionTags.length;
  //const [filteredCreatorTags, setFilteredCreatorTags] = useState<Tag[]>([]);
  //const [filteredCollectionTags, setFilteredCollectionTags] = useState<Tag[]>([]);

  let origin_filteredCreatorTags: Tag[] = [];
  for (let i = 0; i < 2; i++) {
    origin_filteredCreatorTags = [
      ...origin_filteredCreatorTags,
      CreatorTags[i],
    ];
  }
  const filteredCreatorTags = Array.from(new Set(origin_filteredCreatorTags));

  let origin_filteredCollectionTags: Tag[] = [];
  for (let i = 0; i < 2; i++) {
    origin_filteredCollectionTags = [
      ...origin_filteredCollectionTags,
      CollectionTags[i],
    ];
  }
  const filteredCollectionTags = Array.from(
    new Set(origin_filteredCollectionTags)
  );

  //const collectionTagLength = CreatorTags.length;

  //const filteredCreatorTags = CreatorTags.splice(0, 2);
  //const filteredCollectionTags = CreatorTags && CreatorTags.splice(0, 2);

  /*useEffect(() => {
    for (let i = 0; i < 2; i++) {
      setFilteredCreatorTags([...filteredCreatorTags, CreatorTags[i]]);
    }
  }, []);*/

  return (
    <div>
      <Head>
        <title>Gachi | Search your favorite anime op and ed animation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout>
        <Mainvisual />
        <section className="mx-auto px-5 md:px-8">
          <div className="flex gap-3 mb-4">
            <div className="flex items-center">
              <div className="animated-dot"></div>
            </div>
            <div className="flex gap-3 items-baseline">
              <Title property="h2" addClass="">
                Creators
              </Title>
              <p className="text-gray-400 text-sm">{creatorsLength} Creators</p>
            </div>
          </div>
          <div className="mb-10">
            {creators.length > 0 && (
              <CreatorList creators={creators} limit={10} />
            )}
          </div>
          {/*<div className="mb-10 flex gap-5 items-baseline">
            {filteredCreatorTags && (
              <TagList tags={filteredCreatorTags} type="creator" />
            )}
            <Link href="/tags">
              <a className="mb-2">
                <span className="text-gray-900">+ {creatorTagsLength - 2}</span>
                <span className="text-gray-400 ml-2 ">Creator Tags</span>
              </a>
            </Link>
            </div>*/}
          <div className="flex justify-center">
            <LinkButton href="/creators">Check creators</LinkButton>
          </div>
        </section>
        <div className="pb-16"></div>
        <section className="mx-auto px-5 md:px-8">
          <div className="flex gap-3 mb-4">
            <div className="flex items-center">
              <div className="animated-dot"></div>
            </div>
            <div className="flex gap-3 items-baseline">
              <Title property="h2" addClass="">
                Collections
              </Title>
              <p className="text-gray-400 text-sm">
                {collectionsLength} Collections
              </p>
            </div>
          </div>
          <div className="mb-10">
            {collections.length > 0 && (
              <CollectionTable collections={collections} limit={10} />
            )}
          </div>
          {/*<div className="mb-10 flex gap-5 items-baseline">
            {filteredCollectionTags && (
              <TagList tags={filteredCollectionTags} type="collection" />
            )}
            <Link href="/tags">
              <a className="mb-2">
                <span className="text-gray-900">
                  + {collectionTagsLength - 2}
                </span>
                <span className="text-gray-400 ml-2 ">Collection Tags</span>
              </a>
            </Link>
            </div>*/}
          <div className="flex justify-center">
            <LinkButton href="/collections">Check collections</LinkButton>
          </div>
        </section>
        {/*<div className="flex flex-col gap-10 px-5 mx-auto max-w-7xl">
          <div className="mx-auto">
            <ShowMore currentPage={page ? Number(page) : 1} />
          </div>
  </div>*/}
      </BaseLayout>
    </div>
  );
};

export default Home;

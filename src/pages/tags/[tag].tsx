import type { ParsedUrlQuery } from "node:querystring";

import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useContext, useEffect, useState } from "react";

import { BaseLayout } from "@/components/BaseLayout";
import { CollectionList } from "@/components/CollectionList";
import { CreatorList } from "@/components/CreatorList";
import { Dropdown } from "@/components/Dropdown";
import { OrderButton } from "@/components/OrderButton";
import { Searchbox } from "@/components/Searchbox";
import { TabIndex } from "@/components/TabIndex";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import tagsJson from "@/json/tags.json";
import { sortList } from "@/libs/sortList";
import type { Collection } from "@/types/collection";
import type { Creator } from "@/types/creator";
import type { Tag } from "@/types/tag";

type Props = {
  description: string;
  title: string;
};
const TagPage: NextPage<Props> = (props) => {
  const { description, title } = props;
  const router = useRouter();
  const { order, page, search, sort, tab, tag, term, type } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 100;

  const { collections, creators } = useContext(BaseContext);
  const [sortedCreators, setSortedCreators] = useState<Creator[]>([]);
  const [sortedCollections, setSortedCollections] = useState<Collection[]>([]);

  const { setHeaderIcon } = useContext(UtilitiesContext);
  useEffect(() => {
    setHeaderIcon({
      avatar: "",
      emoji: "",
      path: `/tags`,
      title: "Tags",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1.filtered creators
  const uppperKeyword = typeof search == "string" && search.toUpperCase();

  const filteredCreators01 = creators.filter((item) => {
    return item.tags && item.tags.includes(tag as string) == true;
  });
  const filteredCreators02 =
    type && type != "all"
      ? filteredCreators01.filter((creator) => {
          return creator.type === type;
        })
      : filteredCreators01;

  const filteredCreators = filteredCreators02;

  //1.match username
  const searchedCreators01 = filteredCreators.filter((creator) => {
    return (
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      creator.username.toUpperCase().includes(uppperKeyword as string) == true
    );
  });
  const origin_searchedCreators = [
    ...searchedCreators01,
    // ...searchedCreators02,
  ];
  //重複削除
  let searchedCreators = [] as Creator[];
  if (search && search.length > 0) {
    searchedCreators = Array.from(new Set(origin_searchedCreators));
  } else {
    searchedCreators = filteredCreators;
  }

  const creators_args = {
    limit: limit,
    list: searchedCreators,
    order: order as "desc" | "asc" | undefined,
    page: currentPage,
    property: "creators" as "creators" | "collections",
    sort: sort as string | undefined,
    term: term as "24h" | "7d" | "30d" | "all" | undefined,
  };

  // 2.filtered collections
  const filteredCollections01 = collections.filter((item) => {
    return item.tags && item.tags.includes(tag) == true;
  });
  const filteredCollections02 =
    type && type != "all"
      ? filteredCollections01.filter((collection) => {
          return collection.type === type;
        })
      : filteredCollections01;
  const filteredCollections = filteredCollections02;

  //1.match name
  const searchedCollections01 = filteredCollections.filter((collection) => {
    return (
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      collection.name.toUpperCase().includes(uppperKeyword) == true
    );
  });
  //1.match creator username
  const searchedCollections02 = filteredCollections.filter((collection) => {
    return (
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      collection.creator_id.toUpperCase().includes(uppperKeyword) == true
    );
  });
  const origin_searchedCollections = [...searchedCollections01, ...searchedCollections02];
  //重複削除
  let searchedCollections = [] as Collection[];
  if (search && search.length > 0) {
    searchedCollections = Array.from(new Set(origin_searchedCollections));
  } else {
    searchedCollections = filteredCollections;
  }

  const collections_args = {
    //category: collectionsSort,
    limit: limit,
    list: searchedCollections,
    order: order as "desc" | "asc" | undefined,
    page: currentPage,
    property: "collections" as "creators" | "collections",
    sort: sort as string | undefined,
    term: term as "24h" | "7d" | "30d" | "all" | undefined,
  };

  useEffect(() => {
    if (tab != "collection") {
      const data = sortList(creators_args);
      setSortedCreators(() => {
        return data;
      });
    } else {
      const data = sortList(collections_args);
      setSortedCollections(() => {
        return data;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collections, creators, order, sort, term, page, type, search, tab]);

  return (
    <div>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          description: description,
          title: title,
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/tags/" + tag,
        }}
      />
      <BaseLayout>
        <section className="mx-auto mt-5 px-5 md:px-8">
          <h1 className="mb-3 text-sm tracking-[0.2em] text-gray-500">
            Resulut of <span className="text-bold ml-1 text-3xl">#{tag}</span>
          </h1>
          <div className="mb- flex gap-3">
            <div className="flex items-baseline gap-3">
              <p className="text-sm text-gray-400">
                {searchedCreators.length} Creators, {searchedCollections.length} Collections
              </p>
            </div>
          </div>
          <div className="mb-2">
            <TabIndex property="tag" />
          </div>
          {tab != "collection" && (
            <div className="">
              <div className="relative z-20 mb-3 flex justify-between gap-3 sm:gap-5">
                <Dropdown position="left" property="collectionType" />
                <Searchbox id="creator" />
                <div className="flex items-center gap-3">
                  <Dropdown position="right" property="collectionSort" />
                  <OrderButton />
                </div>
              </div>
              <div className="mb-10">
                {sortedCreators && sortedCreators.length > 0 ? (
                  <CreatorList creators={sortedCreators} />
                ) : (
                  <p className="text-gray-100">Not found.</p>
                )}
              </div>
            </div>
          )}
          {tab == "collection" && (
            <div>
              {sortedCollections && sortedCollections.length > 0 ? (
                <CollectionList collections={sortedCollections} />
              ) : (
                <p className="text-gray-100">Not found.</p>
              )}
            </div>
          )}
        </section>
      </BaseLayout>
    </div>
  );
};

export default TagPage;

export const getStaticPaths = async () => {
  const tags = JSON.parse(JSON.stringify(tagsJson)) as Tag[];

  return {
    fallback: "blocking",
    paths: tags.map((tag: any) => {
      return `/tags/${tag.name}`;
    }),
  };
};

type PathProps = {
  ogImageUrl: string;
};
type Params = ParsedUrlQuery & {
  slug: string;
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({ params }) => {
  const tags = JSON.parse(JSON.stringify(tagsJson)) as Tag[];
  const tag_name = params && params.tag;
  const filtered_tags = tags.filter((tag: any) => {
    return tag.name === tag_name;
  });
  const tag = filtered_tags[0];
  if (!tag) {
    return {
      notFound: true,
    };
  }
  let baseUrl;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      development: "http://localhost:3000",
      production: "https://nftotaku.xyz",
    }[process.env.NODE_ENV];
  }
  return {
    props: {
      description: `Check ${tag.name}'s NFT creators and collections in Japan now.`,
      ogImageUrl: `${baseUrl}/api/ogp?title=${tag}&label=Tags`,
      revalidate: 600,
      // OGP画像は絶対URLで記述する必要があります
      title: `${tag.name}'s NFT creators and collections in Japan | NFT OTAKU`,
    },
  };
};

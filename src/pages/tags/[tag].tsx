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
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { getTags } from "@/libs/airtable";
import { supabase } from "@/libs/supabase";
import type { Collection } from "@/types/collection";
import type { Creator } from "@/types/creator";

type Props = {
  description: string;
  title: string;
};
const TagPage: NextPage<Props> = (props) => {
  const { description, title } = props;
  const router = useRouter();
  const { order, page, search, sort, tab, tag, term, type } = router.query;

  const [creators, setCreators] = useState<Creator[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      if (supabase) {
        if (tab != "collection") {
          const { data, error } = await supabase.from("creators").select().contains("tags", [tag]);
          if (error) {
            console.log("error");
            console.log(error);
          }
          const new_data = data ? data : [];
          console.log("creators data");
          console.log(data);

          setCreators(() => {
            return new_data;
          });
        } else {
          const { data, error } = await supabase.from("collections").select().contains("tags", [tag]);
          if (error) {
            console.log("error");
            console.log(error);
          }
          const new_data = data ? data : [];
          console.log("collections data");
          console.log(data);
          setCollections(() => {
            return new_data;
          });
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, sort, term, page, type, search, tab, tag]);

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
                {creators.length} Creators, {collections.length} Collections
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
                {creators && creators.length > 0 ? (
                  <CreatorList creators={creators} />
                ) : (
                  <p className="text-gray-100">Not found.</p>
                )}
              </div>
            </div>
          )}
          {tab == "collection" && (
            <div>
              {collections && collections.length > 0 ? (
                <CollectionList collections={collections} />
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
  const tags = await getTags("tags");
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
  const tags = await getTags("tags");
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

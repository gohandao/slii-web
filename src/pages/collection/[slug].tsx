import type { ParsedUrlQuery } from "node:querystring";

import type { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";

import { BaseLayout } from "@/components/BaseLayout";
import { CollectionScreen } from "@/components/CollectionScreen";
import { getCollections, supabase } from "@/libs/supabase";

type Props = {
  description: string;
  ogImageUrl: string;
  slug: string;
  title: string;
};
const CollectionIndex: NextPage<Props> = (props) => {
  const { description, ogImageUrl, slug, title } = props;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          description: description,
          images: [
            {
              alt: title,
              height: 630,
              type: "image/jpeg",
              url: ogImageUrl,
              width: 1200,
            },
          ],
          title: title,
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + `/${slug}`,
        }}
      />
      <BaseLayout>
        <CollectionScreen />
      </BaseLayout>
    </>
  );
};
export default CollectionIndex;

type PathProps = {
  description: string;
  ogImageUrl: string;
  slug: string;
  title: string;
};
type Params = ParsedUrlQuery & {
  slug: string;
};
export const getStaticPaths = async () => {
  const { data } = await getCollections();
  const collections = data;
  return {
    fallback: "blocking",
    paths:
      collections &&
      collections.map((colelction: any) => {
        return `/collection/${colelction.slug}`;
      }),
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({ params }) => {
  const slug = params && params.slug;
  let collection;
  if (supabase) {
    const { data, error } = await supabase.from("collections").select().eq("slug", slug).single();
    if (error) {
      console.log("error");
      console.log(error);
    }
    collection = data as any;
  }
  if (!collection) {
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

  const avatar = collection.image_url ? collection.image_url : "";
  const background = collection.banner_image_url ? collection.banner_image_url : "";
  const verified = collection.safelist_request_status == "verified" ? "true" : "";

  return {
    props: {
      description: `${collection.name} is a NFT collection created by ${collection.creator_username}.`,
      // OGP画像は絶対URLで記述する必要があります
      ogImageUrl: `${baseUrl}/api/ogp?title=${slug}&page=collections&type=user&avatar=${avatar}&background=${background}&verified=${verified}`,
      revalidate: 600,
      slug: collection.slug,
      title: `${collection.name} collection by ${collection.creator_username} | NFT OTAKU`,
    },
  };
};

import type { ParsedUrlQuery } from "node:querystring";

import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useContext, useEffect, useState } from "react";

import { BaseLayout } from "@/components/BaseLayout";
import { CollectionScreen } from "@/components/CollectionScreen";
import { CollectionsIndexScreen } from "@/components/CollectionsIndexScreen";
import { ScreenModal } from "@/components/ScreenModal";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import collectionsJson from "@/json/collections.json";

type Props = {
  description: string;
  ogImageUrl: string;
  slug: string;
  title: string;
};
const CollectionIndex: NextPage<Props> = ({ description, ogImageUrl, slug, title }) => {
  const router = useRouter();
  const { screen } = router.query;
  const { scrollY } = useContext(UtilitiesContext);
  const [collectionModal, setCollectionModal] = useState<boolean>(screen ? true : false);

  useEffect(() => {
    setCollectionModal(screen ? true : false);
  }, [screen]);
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
      {screen == "modal" ? (
        <>
          <ScreenModal modalIsOpen={collectionModal} setModalIsOpen={setCollectionModal} path="/collections">
            <CollectionScreen />
          </ScreenModal>
          <div
            className={`fixed left-0 w-full`}
            style={{
              top: `-${scrollY}px`,
            }}
          >
            <BaseLayout>
              <CollectionsIndexScreen />
            </BaseLayout>
          </div>
        </>
      ) : (
        <BaseLayout>
          <CollectionScreen />
        </BaseLayout>
      )}
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
  const collections = JSON.parse(JSON.stringify(collectionsJson));
  return {
    fallback: "blocking",
    paths: collections.map((colelction: any) => {
      return `/collection/${colelction.slug}`;
    }),
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({ params }) => {
  const collections = JSON.parse(JSON.stringify(collectionsJson));
  const slug = params && params.slug;
  const filtered_collections = collections.filter((collection: any) => {
    return collection.slug === slug;
  });
  const collection = filtered_collections[0];
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
      description: `${collection.name} is a NFT collection created by ${collection.creator_id}.`,
      // OGP画像は絶対URLで記述する必要があります
      ogImageUrl: `${baseUrl}/api/ogp?title=${slug}&page=collections&type=user&avatar=${avatar}&background=${background}&verified=${verified}`,
      revalidate: 600,
      slug: collection.slug,
      title: `${collection.name} collection by ${collection.creator_id} | NFT OTAKU`,
    },
  };
};

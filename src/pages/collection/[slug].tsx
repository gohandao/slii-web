import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { ParsedUrlQuery } from "node:querystring";

// json
import collectionsJson from "@/json/collections.json";
// contexts
import { BaseLayout } from "@/components/BaseLayout";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

// components
import { CollectionScreen } from "@/components/CollectionScreen";
import { ScreenModal } from "@/components/ScreenModal";
import { CollectionsIndexScreen } from "@/components/CollectionsIndexScreen";

const CollectionIndex: NextPage = (props: any) => {
  const router = useRouter();
  const { username, order, sort, term, page, type, search, slug, screen } =
    router.query;
  const { hiddenParams, scrollY } = useContext(UtilitiesContext);
  const [collectionModal, setCollectionModal] = useState<boolean>(
    screen ? true : false
  );

  useEffect(() => {
    setCollectionModal(screen ? true : false);
  }, [screen]);
  return (
    <>
      <NextSeo
        title={props.title}
        description={props.description}
        openGraph={{
          type: "article",
          title: props.title,
          description: props.description,
          url: process.env.NEXT_PUBLIC_SITE_URL + `/${props.slug}`,
          images: [
            {
              url: props.ogImageUrl,
              width: 1200,
              height: 630,
              alt: props.title,
              type: "image/jpeg",
            },
          ],
        }}
      />
      {screen == "modal" ? (
        <>
          <ScreenModal
            modalIsOpen={collectionModal}
            setModalIsOpen={setCollectionModal}
            path="/collections"
          >
            <CollectionScreen property="modal" />
          </ScreenModal>
          <div
            className={`fixed left-0 w-full`}
            style={{
              top: `-${scrollY}px`,
            }}
          >
            <BaseLayout>
              <CollectionsIndexScreen params={hiddenParams} />
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
  slug: string;
  title: string;
  description: string;
  ogImageUrl: string;
};
type Params = ParsedUrlQuery & {
  slug: string;
};

export const getStaticPaths = async () => {
  // const fs = require("fs");
  // const collections = JSON.parse(
  //   fs.readFileSync("@/json/collections.json", "utf8")
  // );
  const collections = JSON.parse(JSON.stringify(collectionsJson));
  return {
    paths: collections.map(
      (colelction: any) => `/collection/${colelction.slug}`
    ),
    //fallback: true,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({
  params,
}) => {
  // const fs = require("fs");
  // const collections = JSON.parse(
  //   fs.readFileSync("@/json/collections.json", "utf8")
  // );
  const collections = JSON.parse(JSON.stringify(collectionsJson));
  const slug = params && params.slug;
  const filtered_collections = collections.filter(
    (collection: any) => collection.slug === slug
  );
  const collection = filtered_collections[0];

  let baseUrl;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }

  const avatar = collection.image_url ? collection.image_url : "";
  const background = collection.banner_image_url
    ? collection.banner_image_url
    : "";
  //@ts-ignore
  const varified =
    collection.safelist_request_status == "verified" ? "true" : "";

  return {
    props: {
      slug: collection.slug,
      title: `${collection.name} collection by ${collection.creator_id} | NFT OTAKU`,
      description: `${collection.name} is a NFT collection created by ${collection.creator_id}.`,
      // OGP画像は絶対URLで記述する必要があります
      ogImageUrl: `${baseUrl}/api/ogp?title=${slug}&page=collections&type=user&avatar=${avatar}&background=${background}&verified=${varified}`,
      revalidate: 600,
    },
  };
};

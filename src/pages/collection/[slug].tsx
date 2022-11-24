import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import CollectionsJson from "@/json/collections.json";

import { ParsedUrlQuery } from "node:querystring";
import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { base } from "@/libs/airtable";

import { useRouter } from "next/router";

import { BaseContext } from "@/contexts/BaseContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";

import { List } from "@/components/List";
import { Title } from "@/components/Title";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { CreatorProfile } from "@/components/CreatorProfile";
import { CollectionAssets } from "@/components/CollectionAssets";

import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { Dropdown } from "@/components/Dropdown";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { JP } from "country-flag-icons/react/3x2";
import { ProfileHeader } from "@/components/ProfileHeader";
import { MdVerified } from "react-icons/md";
import { RandomButton } from "@/components/RandomButton";
import { Searchbox } from "@/components/Searchbox";
import { OrderButton } from "@/components/OrderButton";
import { sortNFTs } from "@/libs/sortNFTs";
import { randomize } from "@/utilities/randomize";
import { NFTList } from "@/components/NFTList";
import { getNFTs } from "@/utilities/getNFTs";
import { CollectionScreen } from "@/components/CollectionScreen";
import { ScreenModal } from "@/components/ScreenModal";
import { CollectionsIndexScreen } from "@/components/CollectionsIndexScreen";

const CollectionIndex: NextPage = (props: any) => {
  const router = useRouter();
  const { username, order, sort, term, page, type, search, slug, screen } =
    router.query;
  const { setHeaderIcon, hiddenParams, scrollY } = useContext(UtilitiesContext);
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
  // const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  // const response = await fetch(
  //   `https://api.airtable.com/v0/appFYknMhbtkUTFgt/collections?api_key=${AIRTABLE_API_KEY}`
  // );
  // const { records } = await response.json();
  const collections = CollectionsJson;
  //console.log("testrecords");
  //console.log(records);
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
  const slug = params && params.slug;
  const collections = CollectionsJson;
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

/*
export const getStaticProps: GetStaticProps<PathProps, Params> = ({
  params,
}) => {
  const slug = params && params.slug;
  const collections = useContext(CollectionsContext);
  const collection = collections.filter(
    (collection) => collection.slug === slug
  );
  let baseUrl;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }
  return {
    props: {
      // OGP画像は絶対URLで記述する必要があります
      ogImageUrl: `${baseUrl}/api/ogp?key=${slug}&page=creators`,
      revalidate: 10,
    },
  };
};
*/

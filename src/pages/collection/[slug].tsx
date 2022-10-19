import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";

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
import { ShowMore } from "@/components/ShowMore";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { IndexTab } from "@/components/IndexTab";
import { CreatorProfile } from "@/components/CreatorProfile";
import { CollectionProfile } from "@/components/CollectionProfile";
import { CollectionAssets } from "@/components/CollectionAssets";

import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { Dropdown } from "@/components/Dropdown";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { SocialCount } from "@/components/SocialCount";

const CollectionIndex: NextPage = (props: any) => {
  const OPENSEA_API_KEY = process.env.NEXT_PUBLIC_OPENSEA_API_KEY as string;

  const router = useRouter();
  const { username, slug } = router.query;
  const [loading, setLoading] = useState<boolean>(false);
  const [collection, setCollection] = useState<any>();
  const [airtableCollection, setAirtableCollection] = useState<Collection>();
  const { creators, collections, OSCollections } = useContext(BaseContext);

  const [existence, setExistence] = useState<boolean>(false);
  const [creator, setCreator] = useState<Creator>();
  const [collectionAssets, setCollectionAssets] = useState<[]>([]);

  const { setBreadcrumbList } = useContext(UtilitiesContext);

  console.log("collection");
  console.log(collection);

  const { setHeaderIcon } = useContext(UtilitiesContext);
  let avatar_url = "" as string;
  if (creator && creator.avatar) {
    avatar_url =
      creator.avatar.length > 0
        ? //@ts-ignore
          creator.avatar[0].thumbnails.large.url
        : //@ts-ignore
          creator.avatar[0].url;
  }
  useEffect(() => {
    {
      creator &&
        setHeaderIcon({
          title: creator.username,
          emoji: "",
          avatar: "",
          path: `/creator/${collection.creator_id}`,
        });
    }
  }, [collection]);

  const breadcrumbList = collection &&
    username && [
      {
        name: "Home",
        path: "/",
      },
      {
        name: "Collections",
        path: "/collections",
      },
      {
        //@ts-ignore
        name: collection.name as string,
        //@ts-ignore
        path: `/collection/${collection.slug as string}`,
      },
    ];
  useEffect(() => {
    breadcrumbList && setBreadcrumbList(breadcrumbList);
  }, [collection]);

  if (!creator && creators && collection && creators.length > 0) {
    //set creator
    const creator_filter = creators.filter(
      (creator) => creator.username === collection.creator_id
    );
    if (creator_filter[0]) {
      setCreator(creator_filter[0]);
    }
  }
  if (!collection && OSCollections && OSCollections.length > 0) {
    //set collection
    const collection_filter = OSCollections.filter(
      (collection) => collection.slug === slug
    );
    collection_filter.length > 0 && setCollection(collection_filter[0]);
  }
  useEffect(() => {
    if (collection && creators && creators.length > 0) {
      //set creator
      const creator_filter = creators.filter(
        (creator) => creator.username === collection.slug
      );
      if (creator_filter[0]) {
        setCreator(creator_filter[0]);
      }
    }
    if (!collection && OSCollections && OSCollections.length > 0) {
      //set collection
      const collection_filter = OSCollections.filter(
        (collection) => collection.slug === slug
      );
      collection_filter.length > 0 && setCollection(collection_filter[0]);
    }
  }, [username, OSCollections, collection]);

  const updateCollectionAssets = (assets: any) => {
    setCollectionAssets(assets);
  };

  const getCollectionAssets = () => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        //"X-API-KEY": OPENSEA_API_KEY,
      },
    };
    /*fetch(
      `https://api.opensea.io/api/v1/events?collection_slug=${slug}`,
      options
    );*/
    fetch(
      "https://testnets-api.opensea.io/api/v1/events?asset_contract_address=0xdb394e8dd1b17ffb3cde41a099fc96dd6e37b42a&only_opensea=false&limit=20",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setCollectionAssets(response.asset_events);
        //updateCollectionAssets(response.assets);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // if (slug) {
    //   collection && getCollection();
    // }
    if (collection) {
      collectionAssets.length == 0 && getCollectionAssets();
    }
  }, [slug, collection]);

  /*useEffect(() => {
    const test = async () => {
      const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;

      const response = await fetch(
        `https://api.airtable.com/v0/appFYknMhbtkUTFgt/collections?api_key=${AIRTABLE_API_KEY}`
      );
      const { records } = await response.json();
      console.log("testrecords");
      console.log(records);
    };
    test();
  }, []);*/

  return (
    <>
      {collection ? (
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
          <BaseLayout>
            <div className="">
              <div className="flex justify-center w-full mb-6">
                {collection && <CollectionProfile collection={collection} />}
              </div>
              {collectionAssets && (
                <section className="mx-auto px-5 md:px-8">
                  <div className="flex gap-3 mb-4">
                    <div className="flex items-center">
                      <div className="animated-dot"></div>
                    </div>
                    <div className="flex gap-3 items-baseline">
                      <Title property="h2" addClass="">
                        Items
                      </Title>
                      <p className="text-gray-400 text-sm">
                        {collectionAssets.length} Items
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-5 justify-between mb-4">
                    <Dropdown position="left" type="assetsDropdown" />
                  </div>
                  {/*<div className="flex gap-5 mb-4">
                    <p className="rounded-full border border-gray-100 px-5 py-2 text-gray-100 text-sm font-bold">
                      All
                    </p>
                    <p className="rounded-full border border-gray-100 px-5 py-2 text-gray-100 text-sm font-bold">
                      Buy now
                    </p>
                    <p className="rounded-full border border-gray-100 px-5 py-2 text-gray-100 text-sm font-bold">
                      On auction
                    </p>
                    <p className="rounded-full border border-gray-100 px-5 py-2 text-gray-100 text-sm font-bold">
                      Price low to high
                    </p>
              </div>*/}
                  <CollectionAssets collectionAssets={collectionAssets} />
                </section>
              )}
            </div>
          </BaseLayout>
        </>
      ) : (
        <p>faga</p>
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
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const response = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/collections?api_key=${AIRTABLE_API_KEY}`
  );
  const { records } = await response.json();
  const collections = records;
  //console.log("testrecords");
  //console.log(records);
  return {
    paths: collections.map(
      (colelction: any) => `/collection/${colelction.fields.slug}`
    ),
    //fallback: true,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({
  params,
}) => {
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const slug = params && params.slug;
  const response = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/collections?api_key=${AIRTABLE_API_KEY}&filterByFormula=%7Bslug%7D+%3D+%22${slug}%22`
  );
  const { records } = await response.json();
  /*const collections = records;
  const collection = collections.filter(
    (collection: any) => collection.fields.slug === slug
  );*/
  //console.log("records");
  //console.log(records);
  let baseUrl;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }

  return {
    props: {
      slug: records[0].fields.slug,
      title: `${records[0].fields.name} collection by ${records[0].fields.creator_id[0]}`,
      description: `${records[0].fields.name} is a NFT OTAKU featured NFT collection created by ${records[0].fields.creator_id[0]}.`,
      // OGP画像は絶対URLで記述する必要があります
      ogImageUrl: `${baseUrl}/api/ogp?title=${slug}&page=collections`,
      revalidate: 10,
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

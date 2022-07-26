import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";

import { ParsedUrlQuery } from "node:querystring";
import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { base } from "@/libs/airtable";

import { useRouter } from "next/router";

import { CreatorsContext } from "@/contexts/CreatorsContext";
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

const CollectionIndex: NextPage = (props: any) => {
  const OPENSEA_API_KEY = process.env.NEXT_PUBLIC_OPENSEA_API_KEY as string;

  const router = useRouter();
  const creators = useContext(CreatorsContext);
  const collections = useContext(CollectionsContext);

  const [creator, setCreator] = useState<Creator>();
  const [collectionAssets, setCollectionAssets] = useState<[]>([]);
  const { slug } = router.query;
  const [loading, setLoading] = useState<boolean>(false);

  const [collection, setCollection] = useState([]);
  const options = { method: "GET" };

  const updateCollectionAssets = (assets: any) => {
    setCollectionAssets(assets);
  };

  const getCollection = () => {
    fetch(`https://api.opensea.io/api/v1/collection/${slug}`, options)
      .then((response) => response.json())
      .then((response) => {
        setCollection(response.collection);
      })
      .catch((err) => console.error(err));
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
        console.log("assets");
        console.log(response.asset_events);
        setCollectionAssets(response.asset_events);
        //updateCollectionAssets(response.assets);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (slug) {
      collection.length == 0 && getCollection();
    }
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
            <section className="mx-auto max-w-7xl">
              <Title property="h2" addClass="mb-5">
                NFTs
              </Title>
              <div className="flex gap-5">
                <p>All</p>
                <p>Buy now</p>
                <p>On auction</p>
                <p>Price low to high</p>
              </div>
              <CollectionAssets collectionAssets={collectionAssets} />
            </section>
          )}
        </div>
      </BaseLayout>
    </>
  );
};

export default CollectionIndex;

type PathProps = {
  title: string;
  name: string;
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
      (colelction: any) =>
        `/${colelction.fields.creator_id}/${colelction.fields.slug}`
    ),
    //fallback: false,
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
  let baseUrl;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }
  return {
    props: {
      slug: slug,
      title: `${records[0].fields.name} collection by ${records[0].fields.creator_id}`,
      description: `${records[0].fields.name} is a Gachi featured NFT collection created by ${records[0].fields.creator_id}.`,
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
      production: "https://gachi.vercel.app",
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

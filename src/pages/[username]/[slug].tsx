import type { NextPage } from "next";
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

const CollectionIndex: NextPage = () => {
  const router = useRouter();
  const creators = useContext(CreatorsContext);
  const collections = useContext(CollectionsContext);

  const [creator, setCreator] = useState<Creator>();
  const [collectionAssets, setCollectionAssets] = useState<string>();
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
        console.log("response.collection");
        console.log(response.collection);
        setCollection(response.collection);
      })
      .catch((err) => console.error(err));
  };

  const getCollectionAssets = () => {
    const options = { method: "GET" };
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
      getCollectionAssets();
    }
  }, [slug, collection]);
  useEffect(() => {
    slug && getCollection();
  }, [slug]);

  useEffect(() => {
    console.log("uuuuucollectionAssets");
    console.log(collectionAssets);
  }, [collectionAssets]);

  return (
    <div>
      <Head>
        <title>Anisonar | Search your favorite anime op and ed animation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
              <CollectionAssets collectionAssets={collectionAssets} />
            </section>
          )}
        </div>
      </BaseLayout>
    </div>
  );
};

export default CollectionIndex;

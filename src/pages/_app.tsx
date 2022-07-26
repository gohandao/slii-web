import "@/styles/style.scss";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";

import { base } from "@/libs/airtable";

import { CreatorsContext } from "@/contexts/CreatorsContext";
import {
  CreatorTagsContext,
  CollectionTagsContext,
} from "@/contexts/TagsContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { List } from "@/components/List";
import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { Tag } from "@/types/tag";
import { Utilities } from "@/types/utilities";

function MyApp({ Component, pageProps }: AppProps) {
  const [search, setSearch] = useState<string | undefined>();
  const [indexTab, setIndexTab] = useState<"all" | "op" | "ed" | undefined>(
    "all"
  );
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  /*const [utilities, setUtilities] = useState<Utilities>({
    search: search,
    setSearch: setSearch,
    indexTab: indexTab,
    setIndexTab: setIndexTab,
  })*/

  const [creators, setCreators] = useState<Creator[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [creatorTags, setCreatorTags] = useState<Tag[]>([]);
  const [collectionTags, setCollectionTags] = useState<Tag[]>([]);

  const router = useRouter();
  //const { page } = router.query
  const [page, setPage] = useState<number | undefined>(1);
  const limit = 10;

  const [loading, setLoading] = useState<boolean>(false);

  const getCreators = () => {
    let new_records: Creator[] = [...creators];
    base("creators")
      .select({
        // Selecting the first 3 records in All:
        maxRecords: 10,
        view: "All",
      })
      .eachPage(
        //@ts-ignore
        function page(records: any[], fetchNextPage: () => void) {
          records.forEach(function (record) {
            const fields = record.fields;
            new_records = [
              ...new_records,
              {
                username: fields.username,
                description: fields.description,
                avatar: fields.avatar,
                background: fields.background,
                address: fields.address,
                website: fields.website,
                twitter_id: fields.twitter_id,
                instagram_id: fields.instagram_id,
                type: fields.type,
                createdAt: fields.createdAt,
                updatedAt: fields.updatedAt,
                tags: fields.tags,
              } as Creator,
            ];
            //console.log("creators", new_records);
            //console.log("Retrieved", record.fields);
          });
          setCreators(new_records);
          fetchNextPage();
          return new_records as Creator[];
        },
        function done(err: any) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  };
  const getCollections = () => {
    let new_records: Collection[] = [...collections];
    base("collections")
      .select({
        maxRecords: 10,
        view: "All",
      })
      .eachPage(
        //@ts-ignore
        function page(records: any[], fetchNextPage: () => void) {
          records.forEach(function (record) {
            const fields = record.fields;
            new_records = [
              ...new_records,
              {
                slug: fields.slug,
                creator_id: fields.creator_id[0],
                type: fields.type,
                createdAt: fields.createdAt,
                updatedAt: fields.updatedAt,
                tags: fields.tags,
              } as Collection,
            ];
            //console.log("collections", new_records);
            //console.log("Retrieved", record.fields);
          });
          setCollections(new_records);
          fetchNextPage();
        },
        function done(err: any) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  };
  const getAllTags = (
    baseName: string,
    setState: React.Dispatch<React.SetStateAction<Tag[]>>
  ) => {
    let new_records = [...creatorTags];
    base(baseName)
      .select({
        // Selecting the first 3 records in All:
        maxRecords: 10,
        view: "All",
      })
      .eachPage(
        //@ts-ignore
        function page(records: any[], fetchNextPage: () => void) {
          records.forEach(function (record) {
            const fields = record.fields;
            new_records = [
              ...new_records,
              {
                name: fields.name,
                createdAt: fields.createdAt,
                collections_slug: fields.collections_slug,
                count: fields.count,
              } as Tag,
            ];
            //console.log("creators", new_records);
            //console.log("Retrieved", record.fields);
          });
          setState(new_records);
          fetchNextPage();
        },
        function done(err: any) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  };

  useEffect(() => {
    //getCreators();
    creators.length == 0 && getCreators();
    collections.length == 0 && getCollections();
    creatorTags.length == 0 && getAllTags("creator_tags", setCreatorTags);
    collectionTags.length == 0 &&
      getAllTags("collection_tags", setCollectionTags);
  }, []);

  /*
  useEffect(() => {
    console.log("data.records");
    fetch(
      `https://api.airtable.com/v0/appFYknMhbtkUTFgt/creators?api_key=${AIRTABLE_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data.records");
        console.log(data.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);*/

  const site_name = "Gachi";
  const title = "Gachi | Awesome NFT Creators / Collections Database";
  const description =
    "Search creators, collections and NFTs with Gachi. We are creating special database and collaboration platform.";
  const twitter_id = "gachi";

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <DefaultSeo
        defaultTitle={title}
        description={description}
        openGraph={{
          type: "website",
          title: title,
          description: description,
          site_name: site_name,
          url: process.env.NEXT_PUBLIC_SITE_URL,
          images: [
            {
              url: process.env.NEXT_PUBLIC_SITE_URL + "/default-ogp.jpg",
              width: 1200,
              height: 630,
              alt: title,
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          handle: "@ik_takagishi",
          //site: "@ik_takagishi",
          cardType: "summary_large_image",
        }}
      />
      <UtilitiesContext.Provider
        value={{
          search: search,
          setSearch: setSearch,
          indexTab: indexTab,
          setIndexTab: setIndexTab,
          page: page,
          setPage: setPage,
          //collectionsMenu: collectionsMenu,
          //setCollectionsMenu: setCollectionsMenu,
        }}
      >
        <CreatorsContext.Provider value={creators}>
          <CollectionsContext.Provider value={collections}>
            <CreatorTagsContext.Provider value={creatorTags}>
              <CollectionTagsContext.Provider value={collectionTags}>
                <div className="font-outfit">
                  <Component {...pageProps} />
                </div>
              </CollectionTagsContext.Provider>
            </CreatorTagsContext.Provider>
          </CollectionsContext.Provider>
        </CreatorsContext.Provider>
      </UtilitiesContext.Provider>
    </>
  );
}

export default MyApp;

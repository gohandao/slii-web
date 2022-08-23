import "@/styles/style.scss";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

import { MoralisProvider } from "react-moralis";

import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";

import { supabase } from "@/libs/supabase";
import { base } from "@/libs/airtable";

import { AuthContext } from "@/contexts/AuthContext";

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
import { Footer } from "@/components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>();

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
  const [sortAction, setSortAction] = useState<boolean>(false);
  const [creatorType, setCreatorType] = useState<string>("all");
  const [creatorsSort, setCreatorsSort] = useState<string>();
  const [creatorCategory, setCreatorCategory] = useState<string>("All");
  const [collectionCategory, setCollectionCategory] = useState<string>("All");
  const [collectionsSort, setCollectionsSort] =
    useState<string>("Total Volume");
  const [totalVolumeOrder, setTotalVolumeOrder] = useState<"desc" | "asc">(
    "desc"
  );
  const [oneDayChangeOrder, setOneDayChangeOrder] = useState<"desc" | "asc">(
    "desc"
  );
  const [thirtyDayChangeOrder, setThirtyDayChangeOrder] = useState<
    "desc" | "asc"
  >("desc");
  const [sevenDayChangeOrder, setSevenDayChangeOrder] = useState<
    "desc" | "asc"
  >("desc");
  const [ownersOrder, setOwnersOrder] = useState<"desc" | "asc">("desc");
  const [itemsOrder, setItemsOrder] = useState<"desc" | "asc">("desc");
  const [collectionNameOrder, setCollectionNameOrder] = useState<
    "desc" | "asc"
  >("asc");

  const router = useRouter();
  //const { page } = router.query
  const MORALIS_APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID as string;
  const MORALIS_SERVER_URL = process.env
    .NEXT_PUBLIC_MORALIS_SERVER_URL as string;

  const [page, setPage] = useState<number | undefined>(1);
  const limit = 10;

  const [loading, setLoading] = useState<boolean>(false);

  const getCreators = () => {
    let new_records: Creator[] = [...creators];
    base("creators")
      .select({
        // Selecting the first 3 records in All:
        maxRecords: 100,
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
                website_url: fields.website_url,
                twitter_id: fields.twitter_id,
                instagram_id: fields.instagram_id,
                discord_url: fields.discord_url,
                type: fields.type,
                verified: fields.verified,
                createdAt: fields.createdAt,
                updatedAt: fields.updatedAt,
                collections: fields.collections,
                category: fields.category,
                tags: fields.tags,
              } as Creator,
            ];
            //console.log("creators", new_records);
            //console.log("Retrieved", record.fields);
          });
          setCreators(new_records);
          try {
            fetchNextPage();
          } catch (error) {
            console.log(error);
            return;
          }
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
        maxRecords: 100,
        view: "All",
      })
      .eachPage(
        //@ts-ignore
        function page(records: any[], fetchNextPage: () => void) {
          records.forEach(function (record) {
            try {
              const fields = record.fields;
              new_records = [
                ...new_records,
                {
                  name: fields.name,
                  slug: fields.slug,
                  creator_id: fields.creator_id[0],
                  type: fields.type,
                  createdAt: fields.createdAt,
                  updatedAt: fields.updatedAt,
                  category: fields.category,
                  verified: fields.verified,
                  tags: fields.tags,
                } as Collection,
              ];
            } catch (error) {
              console.log(error);
              return;
            }
            //console.log("collections", new_records);
            //console.log("Retrieved", record.fields);
          });
          setCollections(new_records);
          try {
            fetchNextPage();
          } catch (error) {
            console.log(error);
            return;
          }
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
        maxRecords: 100,
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
          //sort
          new_records = new_records.sort(function (a, b) {
            if (a.count < b.count) return 1;
            if (a.count > b.count) return -1;
            return 0;
          });
          new_records = Array.from(new Set(new_records));

          setState(new_records);
          try {
            fetchNextPage();
          } catch (error) {
            console.log(error);
            return;
          }
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
    const data = supabase.auth.user();
    setUser(data);
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
  const title = "Gachi | Japanese NFT Creators / Collections Database";
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
              url: process.env.NEXT_PUBLIC_SITE_URL + "/ogp-default.jpg",
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
      <AuthContext.Provider value={user}>
        <UtilitiesContext.Provider
          value={{
            search: search,
            setSearch: setSearch,
            indexTab: indexTab,
            setIndexTab: setIndexTab,
            page: page,
            setPage: setPage,
            sortAction: sortAction,
            setSortAction: setSortAction,
            creatorType: creatorType,
            setCreatorType: setCreatorType,
            creatorsSort: creatorsSort,
            setCreatorsSort: setCreatorsSort,
            collectionsSort: collectionsSort,
            setCollectionsSort: setCollectionsSort,
            creatorCategory: creatorCategory,
            setCreatorCategory: setCreatorCategory,
            collectionCategory: collectionCategory,
            setCollectionCategory: setCollectionCategory,
            totalVolumeOrder: totalVolumeOrder,
            setTotalVolumeOrder: setTotalVolumeOrder,
            oneDayChangeOrder: oneDayChangeOrder,
            setOneDayChangeOrder: setOneDayChangeOrder,
            thirtyDayChangeOrder: thirtyDayChangeOrder,
            setThirtyDayChangeOrder: setThirtyDayChangeOrder,
            sevenDayChangeOrder: sevenDayChangeOrder,
            setSevenDayChangeOrder: setSevenDayChangeOrder,
            ownersOrder: ownersOrder,
            setOwnersOrder: setOwnersOrder,
            itemsOrder: itemsOrder,
            setItemsOrder: setItemsOrder,
            collectionNameOrder: collectionNameOrder,
            setCollectionNameOrder: setCollectionNameOrder,
            //collectionsMenu: collectionsMenu,
            //setCollectionsMenu: setCollectionsMenu,
          }}
        >
          <CreatorsContext.Provider value={creators}>
            <CollectionsContext.Provider value={collections}>
              <CreatorTagsContext.Provider value={creatorTags}>
                <CollectionTagsContext.Provider value={collectionTags}>
                  <div className="flex flex-col min-h-screen font-outfit bg-stripe overflow-hidden">
                    <Component {...pageProps} />
                    <div className="mt-auto">
                      <Footer />
                    </div>
                  </div>
                </CollectionTagsContext.Provider>
              </CreatorTagsContext.Provider>
            </CollectionsContext.Provider>
          </CreatorsContext.Provider>
        </UtilitiesContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default MyApp;

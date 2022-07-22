import "@/styles/style.scss";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";

import { base } from "@/libs/airtable";

import { CreatorsContext } from "@/contexts/CreatorsContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { List } from "@/components/List";
import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
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

  useEffect(() => {
    getCreators();
    getCollections();
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

  return (
    <UtilitiesContext.Provider
      value={{
        search: search,
        setSearch: setSearch,
        indexTab: indexTab,
        setIndexTab: setIndexTab,
        page: page,
        setPage: setPage,
      }}
    >
      <CreatorsContext.Provider value={creators}>
        <CollectionsContext.Provider value={collections}>
          <div className="font-outfit">
            <Component {...pageProps} />
          </div>
        </CollectionsContext.Provider>
      </CreatorsContext.Provider>
    </UtilitiesContext.Provider>
  );
}

export default MyApp;

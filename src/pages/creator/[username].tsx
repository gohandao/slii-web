import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";

import { ParsedUrlQuery } from "node:querystring";

import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/legacy/image";
import Link from "next/link";

import { base } from "@/libs/airtable";

import { useRouter } from "next/router";

import { BaseContext } from "@/contexts/BaseContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";

import { CollectionCard } from "@/components/CollectionCard";
import { List } from "@/components/List";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { CreatorProfile } from "@/components/CreatorProfile";
import { Title } from "@/components/Title";
import { Custom404 } from "@/pages/404";

import { Creator } from "@/types/creator";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { JP } from "country-flag-icons/react/3x2";
import { CreatorScreen } from "@/components/CreatorScreen";
import { ScreenModal } from "@/components/ScreenModal";
import { CreatorsIndexScreen } from "@/components/CreatorsIndexScreen";

const CreatorIndex: NextPage = (props: any) => {
  const router = useRouter();
  const { username, order, sort, term, page, type, search, slug, ref } =
    router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 50;
  const [checkAssets, setCheckAssets] = useState(false);
  const [sortedAssets, setSortedAssets] = useState<any[]>([]);
  const [random, setRandom] = useState<boolean>(false);

  const [creator, setCreator] = useState<Creator>();

  const [creatorCollections, setCreatorCollections] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [assets, setAssets] = useState<any[]>([]);
  const [currentAssets, setCurrentAssets] = useState<any[]>([]);

  const { creators, collections } = useContext(BaseContext);
  // const collections = useContext(CollectionsContext);
  const { setHeaderIcon, hiddenParams, scrollY } = useContext(UtilitiesContext);
  const [creatorModal, setCreatorModal] = useState<boolean>(ref ? true : false);

  // const [first, setfirst] = useState(false);
  // useEffect(() => {
  //   if (!first && scrollY) {
  //     window.scrollTo(0, scrollY);
  //     setfirst(true);
  //   }
  // }, []);
  useEffect(() => {
    setCreatorModal(ref ? true : false);
  }, [ref]);

  useEffect(() => {
    {
      creator &&
        setHeaderIcon({
          title: creator.username,
          subTitle: (
            <div className="flex gap-1 text-[10px] items-center text-gray-400 leading-none">
              <JP title="Japan" className="h-[10px] rounded-sm" />
              Creator
            </div>
          ),
          emoji: "",
          avatar: "",
          path: `/creator/${creator.username}`,
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creator]);

  // console.log("crs scrollY");
  // console.log(scrollY);

  return (
    <>
      <NextSeo
        title={props.title}
        description={props.description}
        openGraph={{
          type: "article",
          title: props.title,
          description: props.description,
          url: process.env.NEXT_PUBLIC_SITE_URL + `/${username}`,
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
      {ref == "index" ? (
        <>
          <ScreenModal
            modalIsOpen={creatorModal}
            setModalIsOpen={setCreatorModal}
            path="/"
          >
            <CreatorScreen property="modal" />
          </ScreenModal>
          {/* <iframe
            src="http://localhost:3000/?search=oh"
            id="iframe"
            className="fixed top-0 left-0 w-screen h-screen"
          ></iframe> */}
          <div
            className={`fixed left-0 w-full`}
            style={{
              top: `-${scrollY}px`,
            }}
          >
            <BaseLayout>
              <CreatorsIndexScreen params={hiddenParams} />
            </BaseLayout>
          </div>
        </>
      ) : (
        <BaseLayout>
          <CreatorScreen />
        </BaseLayout>
      )}
    </>
  );
};
export default CreatorIndex;

type PathProps = {
  title: string;
  description: string;
  ogImageUrl: string;
};
type Params = ParsedUrlQuery & {
  username: string;
};

export const getStaticPaths = async () => {
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const response = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/creators?api_key=${AIRTABLE_API_KEY}`
  );
  const { records } = await response.json();
  const creators = records;
  return {
    paths: creators.map(
      (creator: any) => `/creator/${creator.fields.username}`
    ),
    //fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({
  params,
}) => {
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  /*const response = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/creators?api_key=${AIRTABLE_API_KEY}`
  );*/
  const username = params && params.username;
  const response = await fetch(
    `https://api.airtable.com/v0/appFYknMhbtkUTFgt/creators?api_key=${AIRTABLE_API_KEY}&filterByFormula=%7Busername%7D+%3D+%22${username}%22`
  );
  const { records } = await response.json();
  //const creators = records;
  //const creator = creators[0];
  //console.log("static creator");
  //console.log(creator);
  /*const creator = creators.filter(
    (creator: any) => creator.fields.username === username
  );*/
  const description =
    records.length > 0 && records[0].fields.description
      ? records[0].fields.description
      : "";
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
      //ogImageUrl: `${baseUrl}/api/ogp?title=${creator.username}&page=creators`,
      title: `${username}'s NFT collections`,
      description: description,
      //description: `${records[0].fields.description}`,
      ogImageUrl: `${baseUrl}/api/ogp?title=${username}&subTitle=Creator`,
      revalidate: 10,
    },
  };
};
/*
export const getStaticPaths = async () => {
  const creators = useContext(CreatorsContext);
  return {
    paths: creators.map((creator) => `/${creator.username}`),
    //fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = ({
  params,
}) => {
  const username = params && params.username;
  const creators = useContext(CreatorsContext);
  const creator = creators.filter((creator) => creator.username === username);
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
      ogImageUrl: `${baseUrl}/api/ogp?key=${username}&page=creators`,
      revalidate: 10,
    },
  };
};

*/

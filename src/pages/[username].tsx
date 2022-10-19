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

import { CollectionCard } from "@/components/CollectionCard";
import { List } from "@/components/List";
import { ShowMore } from "@/components/ShowMore";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { IndexTab } from "@/components/IndexTab";
import { CreatorProfile } from "@/components/CreatorProfile";
import { Title } from "@/components/Title";
import { Custom404 } from "@/pages/404";

import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/libs/supabase";
import { UserProfile } from "@/components/UserProfile";
import { Profile } from "@/types/profile";
import { CreatorList } from "@/components/CreatorList";
import { Dropdown } from "@/components/Dropdown";
import { OrderButton } from "@/components/OrderButton";
import { Tab } from "@/components/Tab";

const UserPage: NextPage = (props: any) => {
  const router = useRouter();
  const { username, order, sort, term, page, type, search } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 10;
  const [userProfile, setUserProfile] = useState<Profile>();
  const [creator, setCreator] = useState<Creator>();

  const [collection, setCollection] = useState([]);

  const [loading, setLoading] = useState<boolean>(false);

  const { user, profile, avatar } = useContext(AuthContext);

  const { creators, collections, OSCollections } = useContext(BaseContext);
  // const collections = useContext(CollectionsContext);
  const { setHeaderIcon } = useContext(UtilitiesContext);
  let avatar_url = "" as string;
  if (userProfile && userProfile.avatar_url) {
    avatar_url =
      userProfile.avatar_url.length > 0 ? userProfile.avatar_url : "";
  }
  useEffect(() => {
    {
      userProfile &&
        setHeaderIcon({
          title: userProfile.username,
          emoji: "",
          avatar: avatar,
          path: `/${userProfile.username}`,
        });
    }
  }, [userProfile]);

  const { setBreadcrumbList } = useContext(UtilitiesContext);
  const breadcrumbList = userProfile && [
    {
      name: "Home",
      path: "/",
    },
    {
      name: userProfile.username,
      path: `/${userProfile.username}`,
    },
  ];
  useEffect(() => {
    breadcrumbList && setBreadcrumbList(breadcrumbList);
  }, []);

  const getUserProfile = async (username: string) => {
    try {
      if (user) {
        const { data, error, status } = await supabase
          .from("profiles")
          .select("*", {
            count: "exact",
            head: false,
          })
          .eq("username", `${username}`)
          .single();
        if (error && status !== 406) {
          throw error;
        }
        data && setUserProfile(data);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      //setLoading(false)
    }
  };

  useEffect(() => {
    username && getUserProfile(username as string);
  }, [username]);

  if (!creator && userProfile && creators && creators.length > 0) {
    //set creator
    const creator_filter = creators.filter(
      (creator) => creator.username === userProfile.username
    );
    if (creator_filter[0]) {
      setCreator(creator_filter[0]);
    }
  }
  if (!collection && userProfile && OSCollections && OSCollections.length > 0) {
    //set collection
    const collection_filter = OSCollections.filter(
      (collection) => collection.creator_id === userProfile.username
    );
    collection_filter.length > 0 && setCollection(collection_filter[0]);
  }
  useEffect(() => {
    if (userProfile && creators && creators.length > 0) {
      //set creator
      const creator_filter = creators.filter(
        (creator) => creator.username === userProfile.username
      );
      if (creator_filter[0]) {
        setCreator(creator_filter[0]);
      }
      console.log("creator_filter");
      console.log(creator_filter);
    }
    if (userProfile && OSCollections && OSCollections.length > 0) {
      //set collection
      const collection_filter = OSCollections.filter(
        (collection) => collection.creator_id === userProfile
      );
      collection_filter.length > 0 && setCollection(collection_filter[0]);
      console.log("collection_filter");
      console.log(collection_filter);
    }
    console.log("userProfile");
    console.log(userProfile);
  }, [userProfile, OSCollections]);

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
      <BaseLayout>
        <div className="flex flex-col gap-10 pb-20">
          {userProfile && <UserProfile profile={userProfile} />}
          <section className="mx-auto w-full max-w-4xl">
            <div className="flex gap-3 mb-3 overscroll-x-auto">
              <Tab title="Creators" path="/" emoji="🎨" />
              <Tab title="Collections" path="/collections" emoji="🗂" />
              {/* <Tab title="Users" path="/users" emoji="😎" /> */}
            </div>
            <div className="relative flex gap-5 z-20 justify-between mb-3">
              <Dropdown position="left" property="creatorType" />
              <div className="flex items-center gap-3">
                <Dropdown position="right" property="creatorSort" />
                <OrderButton />
              </div>
            </div>
            <div className="mb-6">
              {creators.length > 0 && (
                <CreatorList creators={creators} limit={limit} />
              )}
            </div>
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                length={creators.length}
                limit={limit}
              />
            </div>
          </section>
        </div>
      </BaseLayout>
    </>
  );
};
export default UserPage;

type PathProps = {
  title: string;
  description: string;
  ogImageUrl: string;
};
type Params = ParsedUrlQuery & {
  username: string;
};

export const getStaticPaths = async () => {
  const { data, error, status } = await supabase.from("profiles").select("*", {
    count: "exact",
    head: false,
  });
  return {
    paths: data && data.map((user: any) => `/${user.username}`),
    //fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({
  params,
}) => {
  const username = params && params.username;
  const { data, error, status } = await supabase
    .from("profiles")
    .select("*", {
      count: "exact",
      head: false,
    })
    .eq("username", username)
    .single();
  //const creators = records;
  //const creator = creators[0];
  //console.log("static creator");
  //console.log(creator);
  /*const creator = creators.filter(
    (creator: any) => creator.fields.username === username
  );*/
  const description = data.description
    ? data.description
    : `This is ${username}'s profile page.`;
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
      title: `${username}'s profile`,
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

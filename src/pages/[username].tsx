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
import { getImageUrl, supabase } from "@/libs/supabase";
import { UserProfile } from "@/components/UserProfile";
import { Profile } from "@/types/profile";
import { CreatorList } from "@/components/CreatorList";
import { Dropdown } from "@/components/Dropdown";
import { OrderButton } from "@/components/OrderButton";
import { Tab } from "@/components/Tab";
import { ProfileHeader } from "@/components/ProfileHeader";
import { MdVerified } from "react-icons/md";
import { CopyText } from "@/components/CopyText";
import { Searchbox } from "@/components/Searchbox";
import { CollectionList } from "@/components/CollectionList";
import { sortList } from "@/libs/sortList";
import { TabIndex } from "@/components/TabIndex";
import { Like } from "@/types/like";
import { Upvote } from "@/types/upvote";
import { getUserId } from "@/utilities/getUserId";

const UserPage: NextPage = (props: any) => {
  const router = useRouter();
  const { username, order, sort, term, page, type, search, tab } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 10;

  const [userAvatar, setUserAvatar] = useState<Blob>();
  const [userProfile, setUserProfile] = useState<Profile>();

  let avatar_url;
  let avatar_blob;
  const getAvatarBlob = async () => {
    avatar_blob =
      userProfile &&
      userProfile.avatar_url &&
      (await getImageUrl(userProfile.avatar_url));
    avatar_blob && setUserAvatar(avatar_blob);
  };
  userProfile && !userAvatar && getAvatarBlob;
  useEffect(() => {
    !avatar && getAvatarBlob();
  }, [userProfile]);

  const [userUpvotes, setUserUpvotes] = useState<Upvote[] | undefined>([]);
  // const [userId, setUserId] = useState<string>();

  const getUserUpvotes = async (username: string) => {
    const userId =
      username && ((await getUserId(username as string)) as string);
    let new_upvotes;
    try {
      const { data, error, status } = await supabase
        .from("upvotes")
        .select("*, profiles(*)", {
          count: "exact",
          head: false,
        })
        .eq("user_id", `${userId}`);
      if (error && status !== 406) {
        throw error;
      }
      new_upvotes = data as Upvote[];
      console.log("new_upvotes");
      console.log(new_upvotes);
    } catch (error: any) {
      alert(error.message);
    } finally {
      //setLoading(false)
    }
    return new_upvotes;
  };

  useEffect(() => {
    const fetchData = async () => {
      const new_userUpvotes = await getUserUpvotes(username as string);
      console.log("new_userUpvotes");
      console.log(new_userUpvotes);

      if (new_userUpvotes) {
        setUserUpvotes(new_userUpvotes);
      }
    };
    if (username) {
      fetchData();
    }
  }, [username]);

  const { user, profile, avatar, upvotes } = useContext(AuthContext);

  const creator_upvotes =
    userUpvotes &&
    userUpvotes.filter(
      (upvote) => upvote.creator_id && upvote.creator_id.length > 0
    );
  const collection_upvotes =
    userUpvotes &&
    userUpvotes.filter(
      (upvote) => upvote.collection_slug && upvote.collection_slug.length > 0
    );
  console.log("upvotesupvotes");
  console.log(upvotes);
  console.log(creator_upvotes);
  console.log(collection_upvotes);

  const { creators, collections, OSCollections } = useContext(BaseContext);

  const [sortedCreators, setSortedCreators] = useState<Creator[]>([]);
  const [sortedCollections, setSortedCollections] = useState<Collection[]>([]);

  // const collections = useContext(CollectionsContext);
  const { setHeaderIcon } = useContext(UtilitiesContext);
  useEffect(() => {
    {
      userProfile &&
        setHeaderIcon({
          title: userProfile.username,
          subTitle: "User",
          emoji: "",
          avatar: "",
          path: `/${userProfile.username}`,
        });
    }
  }, [userProfile]);

  // const { setBreadcrumbList } = useContext(UtilitiesContext);
  // const breadcrumbList = userProfile && [
  //   {
  //     name: "Home",
  //     path: "/",
  //   },
  //   {
  //     name: userProfile.username,
  //     path: `/${userProfile.username}`,
  //   },
  // ];
  // useEffect(() => {
  //   breadcrumbList && setBreadcrumbList(breadcrumbList);
  // }, []);

  const getUserProfile = async (username: string) => {
    let new_userProfile;
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select("*", {
          count: "exact",
          head: false,
        })
        .eq("username", `${username}`)
        .single()
        .then((response) => {
          return response;
        });
      if (error && status !== 406) {
        throw error;
      }
      new_userProfile = data;
    } catch (error: any) {
      alert(error.message);
    } finally {
      //setLoading(false)
    }
    return new_userProfile;
  };
  username && !userProfile && getUserProfile(username as string);

  useEffect(() => {
    console.log("start");

    const fetchData = async () => {
      const data = await getUserProfile(username as string);
      setUserProfile(data);
    };
    if (username && !userProfile) {
      fetchData();
    }
  }, [username]);

  console.log("userprofileeee");
  console.log(userProfile);

  // 1.filtered creators
  const uppperKeyword = typeof search == "string" && search.toUpperCase();

  // const filteredCreators = creators.filter(
  //   //@ts-ignore
  //   (creator) => creator.username && creator_upvotes.creator_id
  // );
  const filteredCreators = creators.filter(
    (creator) =>
      creator_upvotes &&
      creator_upvotes.some((upvote) => upvote.creator_id == creator.username) &&
      creator
  );

  //1.match username
  const searchedCreators01 = filteredCreators.filter(
    (creator) =>
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      //@ts-ignore
      creator.username.toUpperCase().includes(uppperKeyword) == true
  );
  const origin_searchedCreators = [
    ...searchedCreators01,
    // ...searchedCreators02,
  ];
  //重複削除
  let searchedCreators = [] as Creator[];
  if (search && search.length > 0) {
    searchedCreators = Array.from(new Set(origin_searchedCreators));
  } else {
    searchedCreators = filteredCreators;
  }

  const creators_args = {
    property: "creators" as "creators" | "collections",
    list: searchedCreators,
    page: currentPage,
    order: order as "desc" | "asc" | undefined,
    sort: sort as string | undefined,
    term: term as "24h" | "7d" | "30d" | "all" | undefined,
    //category: collectionsSort,
    limit: limit,
  };

  // 2.filtered collections
  // const notSameAges = objB.filter(
  //   (obj) => objA.some((objAinner) => objAinner.age == obj.age) && obj
  // );
  // console.log(notSameAges);

  const filteredCollections01 = OSCollections.filter(
    (collection) =>
      collection_upvotes &&
      collection_upvotes.some(
        (upvote) => upvote.collection_slug == collection.slug
      ) &&
      collection
  );

  // const filteredCollections01 = OSCollections.filter(
  //   //@ts-ignore
  //   (collection) =>
  //     collection.slug.includes(uppperKeyword) == true
  // );
  const filteredCollections02 =
    type && type != "all"
      ? filteredCollections01.filter((collection) => collection.type === type)
      : filteredCollections01;
  const filteredCollections = filteredCollections02;

  //1.match name
  const searchedCollections01 = filteredCollections.filter(
    (collection) =>
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      //@ts-ignore
      collection.name.toUpperCase().includes(uppperKeyword) == true
  );
  //1.match creator username
  const searchedCollections02 = filteredCollections.filter(
    (collection) =>
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      //@ts-ignore
      collection.creator_id.toUpperCase().includes(uppperKeyword) == true
  );
  const origin_searchedCollections = [
    ...searchedCollections01,
    ...searchedCollections02,
  ];
  //重複削除
  let searchedCollections = [] as Collection[];
  if (search && search.length > 0) {
    searchedCollections = Array.from(new Set(origin_searchedCollections));
  } else {
    searchedCollections = filteredCollections;
  }

  const collections_args = {
    property: "collections" as "creators" | "collections",
    list: searchedCollections,
    page: currentPage,
    order: order as "desc" | "asc" | undefined,
    sort: sort as string | undefined,
    term: term as "24h" | "7d" | "30d" | "all" | undefined,
    //category: collectionsSort,
    limit: limit,
  };
  useEffect(() => {
    if (tab != "collection") {
      const data = sortList(creators_args);
      setSortedCreators((sortedCreators) => data);
    } else {
      const data = sortList(collections_args);
      setSortedCollections((sortedCollections) => data);
    }
  }, [OSCollections, creators, order, sort, term, page, type, search, tab]);

  //props
  const title = userProfile && (
    <>
      {userProfile.username}{" "}
      {userProfile.verified == true && (
        <MdVerified className="text-gray-500 text-xl inline ml-1" />
      )}
    </>
  );
  const sub_title = userProfile?.sub_title ? userProfile : "NFT Collector";

  const links = {
    twitter_id: userProfile?.twitter_id,
    instagram_id: userProfile?.instagram_id,
    website_url: userProfile?.website_url,
  };

  // const stats = [
  //   {
  //     field: "twitter",
  //     value: "twitter",
  //   },
  // ];

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
          {/* {userProfile && <UserProfile profile={userProfile} />} */}
          {userProfile && (
            <ProfileHeader
              page="user"
              id={userProfile.username}
              title={title}
              sub_title={sub_title}
              avatar_url={userAvatar && URL.createObjectURL(userAvatar)}
              background_url={userProfile.background_url}
              description={userProfile.description}
              links={links}
              // tags={userProfile.tags}
              // stats={stats}
              twitter_id={userProfile.twitter_id}
              instagram_id={userProfile.instagram_id}
              discord_url={userProfile.discord_url}
            />
          )}
          <section className="mx-auto w-full px-5 lg:px-8">
            <div className="flex gap-2">
              <button className="text-gray-100 rounded-full px-5 py-1 bg-gray-800 text-xs">
                Upvotes
              </button>
              <button className="text-gray-400 rounded-full px-5 py-1 text-xs">
                Bookmark
              </button>
            </div>
            <div className="mb-2">
              <TabIndex property="user" />
            </div>
            {tab != "collection" && (
              <div className="">
                <div className="relative flex gap-3 sm:gap-5 z-20 justify-between mb-3">
                  <Dropdown position="left" property="collectionType" />
                  <Searchbox />
                  <div className="flex items-center gap-3">
                    <Dropdown position="right" property="collectionSort" />
                    <OrderButton />
                  </div>
                </div>
                <div className="mb-10">
                  {sortedCreators && sortedCreators.length > 0 ? (
                    <CreatorList creators={sortedCreators} />
                  ) : (
                    <p className="text-gray-100">Not found.</p>
                  )}
                </div>
              </div>
            )}
            {tab == "collection" && (
              <div className="">
                <div className="relative flex gap-3 sm:gap-5 z-20 justify-between mb-3">
                  <Dropdown position="left" property="collectionType" />
                  <Searchbox />
                  <div className="flex items-center gap-3">
                    <Dropdown position="right" property="collectionSort" />
                    <OrderButton />
                  </div>
                </div>
                <div className="mb-10">
                  {sortedCollections && sortedCollections.length > 0 ? (
                    <CollectionList collections={sortedCollections} />
                  ) : (
                    <p className="text-gray-100">Not found.</p>
                  )}
                </div>
              </div>
            )}
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

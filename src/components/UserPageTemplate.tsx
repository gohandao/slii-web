import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import { ParsedUrlQuery } from "node:querystring";
import React, { useState, useEffect, useContext } from "react";

import { useRouter } from "next/router";

import { BaseContext } from "@/contexts/BaseContext";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { getImageUrl, supabase } from "@/libs/supabase";
import { Profile } from "@/types/profile";
import { CreatorList } from "@/components/CreatorList";
import { Dropdown } from "@/components/Dropdown";
import { OrderButton } from "@/components/OrderButton";
import { ProfileHeader } from "@/components/ProfileHeader";
import { MdVerified } from "react-icons/md";
import { Searchbox } from "@/components/Searchbox";
import { CollectionList } from "@/components/CollectionList";
import { sortList } from "@/libs/sortList";
import { TabIndex } from "@/components/TabIndex";
import { Upvote } from "@/types/upvote";
import { Bookmark } from "@/types/bookmark";
import { getUserId } from "@/utilities/getUserId";
import { getNFTs } from "@/utilities/getNFTs";
import { SmallTab } from "./SmallTab";

type Props = {
  creatorList: Upvote[] | Bookmark[] | undefined;
  collectionList: Upvote[] | Bookmark[] | undefined;
  property: "upvoted" | "bookmarks";
};
export const UserPageTemplate = ({
  creatorList,
  collectionList,
  property,
}: Props) => {
  const router = useRouter();
  const { username, order, sort, term, page, type, search, tab } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 10;
  const { creators, collections } = useContext(BaseContext);
  const { userProfile, setUserProfile } = useContext(UtilitiesContext);
  if (userProfile && username != userProfile.username) {
    setUserProfile(undefined);
  }
  const [userAvatar, setUserAvatar] = useState<Blob>();
  const [userBackground, setUserBackground] = useState<Blob>();

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
  !userAvatar && getAvatarBlob();

  let background_url;
  let background_blob;
  const getBackgroundBlob = async () => {
    background_blob =
      userProfile &&
      userProfile.background_url &&
      (await getImageUrl(userProfile.background_url));
    background_blob && setUserBackground(background_blob);
  };
  userProfile && !userBackground && getBackgroundBlob;
  !userBackground && getBackgroundBlob();

  const [userUpvotes, setUserUpvotes] = useState<Upvote[] | undefined>([]);
  const [userBookmarks, setUserBookmarks] = useState<Upvote[] | undefined>([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

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
      setUserProfile(new_userProfile);
    } catch (error: any) {
      alert(error.message);
    } finally {
      //setLoading(false)
    }
    return new_userProfile;
  };
  username && !userProfile && getUserProfile(username as string);

  // 1.filtered creators
  const uppperKeyword = typeof search == "string" && search.toUpperCase();

  const filteredCreators = creators.filter(
    (creator) =>
      creatorList &&
      creatorList.some((item) => item.creator_id == creator.username) &&
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
    // term: term as "24h" | "7d" | "30d" | "all" | undefined,
    //category: collectionsSort,
    limit: limit,
  };

  // 2.filtered collections
  const filteredCollections01 = collections.filter(
    (collection) =>
      collectionList &&
      collectionList.some((item) => item.collection_slug == collection.slug) &&
      collection
  );

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

  const default_creators =
    sortedCreators.length == 0 ? sortList(creators_args) : sortedCreators;

  const default_collections =
    sortedCollections.length == 0
      ? sortList(collections_args)
      : sortedCollections;

  useEffect(() => {
    const data_creators = sortList(creators_args);
    setSortedCreators((sortedCreators) => data_creators);
    const data_collections = sortList(collections_args);
    setSortedCollections((sortedCollections) => data_collections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, sort, term, page, type, search]);

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
              background_url={
                userBackground && URL.createObjectURL(userBackground)
              }
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
              <SmallTab title="Upvoted" path="upvotes" />
              <SmallTab title="Bookmarks" path="bookmarks" />
              {/* <button className="text-gray-100 rounded-full px-5 py-1 bg-gray-800 text-xs">
                Upvotes
              </button>
              <button className="text-gray-400 rounded-full px-5 py-1 text-xs">
                Bookmark
              </button> */}
            </div>
            <div className="mb-2">
              <TabIndex property="user" />
            </div>
            {tab != "collection" && (
              <div className="">
                <div className="relative flex gap-3 sm:gap-5 z-20 justify-between mb-3">
                  <Dropdown position="left" property="collectionType" />
                  <Searchbox id="creator" />
                  <div className="flex items-center gap-3">
                    <Dropdown position="right" property="collectionSort" />
                    <OrderButton />
                  </div>
                </div>
                <div className="mb-10">
                  {default_creators && default_creators.length > 0 ? (
                    <CreatorList creators={default_creators} />
                  ) : (
                    <p className="text-gray-100">Not found.</p>
                  )}
                </div>
                <div className="flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    length={default_creators.length}
                    limit={limit}
                  />
                </div>
              </div>
            )}
            {tab == "collection" && (
              <div className="">
                <div className="relative flex gap-3 sm:gap-5 z-20 justify-between mb-3">
                  <Dropdown position="left" property="collectionType" />
                  <Searchbox id="collection" />
                  <div className="flex items-center gap-3">
                    <Dropdown position="right" property="collectionSort" />
                    <OrderButton />
                  </div>
                </div>
                <div className="mb-10">
                  {default_collections && default_collections.length > 0 ? (
                    <CollectionList collections={default_collections} />
                  ) : (
                    <p className="text-gray-100">Not found.</p>
                  )}
                </div>
                <div className="flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    length={default_collections.length}
                    limit={limit}
                  />
                </div>
              </div>
            )}
          </section>
        </div>
      </BaseLayout>
    </>
  );
};

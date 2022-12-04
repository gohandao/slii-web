import { useRouter } from "next/router";
import type { FC } from "react";
import { useContext, useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";

import { BaseLayout } from "@/components/BaseLayout";
import { CollectionList } from "@/components/CollectionList";
import { CreatorList } from "@/components/CreatorList";
import { Dropdown } from "@/components/Dropdown";
import { OrderButton } from "@/components/OrderButton";
import { Pagination } from "@/components/Pagination";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Searchbox } from "@/components/Searchbox";
import { SmallTab } from "@/components/SmallTab";
import { TabIndex } from "@/components/TabIndex";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { sortList } from "@/libs/sortList";
import { getImageUrl, supabase } from "@/libs/supabase";
import type { Bookmark } from "@/types/bookmark";
import type { Collection } from "@/types/collection";
import type { Creator } from "@/types/creator";
import type { Upvote } from "@/types/upvote";

type Props = {
  collectionList: Upvote[] | Bookmark[] | undefined;
  creatorList: Upvote[] | Bookmark[] | undefined;
  property: "upvoted" | "bookmarks";
};
export const UserPageTemplate: FC<Props> = ({ collectionList, creatorList }) => {
  const router = useRouter();
  const { order, page, search, sort, tab, term, type, username } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 100;
  const { collections, creators } = useContext(BaseContext);
  const { setUserProfile, userProfile } = useContext(UtilitiesContext);
  if (userProfile && username != userProfile.username) {
    setUserProfile(undefined);
  }
  const [userAvatar, setUserAvatar] = useState<Blob>();
  const [userBackground, setUserBackground] = useState<Blob>();

  let avatar_blob;
  const getAvatarBlob = async () => {
    avatar_blob = userProfile && userProfile.avatar_url && (await getImageUrl(userProfile.avatar_url));
    avatar_blob && setUserAvatar(avatar_blob);
    console.log("avatar_blob");
    console.log(avatar_blob);
  };

  userProfile && !userAvatar && getAvatarBlob;
  !userAvatar && getAvatarBlob();

  let background_blob;
  const getBackgroundBlob = async () => {
    background_blob = userProfile && userProfile.background_url && (await getImageUrl(userProfile.background_url));
    background_blob && setUserBackground(background_blob);
  };
  userProfile && !userBackground && getBackgroundBlob;
  !userBackground && getBackgroundBlob();

  const [sortedCreators, setSortedCreators] = useState<Creator[]>([]);
  const [sortedCollections, setSortedCollections] = useState<Collection[]>([]);

  const { setHeaderIcon } = useContext(UtilitiesContext);
  useEffect(() => {
    {
      userProfile &&
        setHeaderIcon({
          avatar: "",
          emoji: "",
          path: `/${userProfile.username}`,
          subTitle: "User",
          title: userProfile.username,
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
    }
    return new_userProfile;
  };
  username && !userProfile && getUserProfile(username as string);

  // 1.filtered creators
  const uppperKeyword = typeof search == "string" && search.toUpperCase();

  const filteredCreators = creators.filter((creator) => {
    return (
      creatorList &&
      creatorList.some((item) => {
        return item.creator_id == creator.username;
      }) &&
      creator
    );
  });

  //1.match username
  const searchedCreators01 = filteredCreators.filter((creator) => {
    return (
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      creator.username.toUpperCase().includes(uppperKeyword as string) == true
    );
  });
  const origin_searchedCreators = [...searchedCreators01];
  //重複削除
  let searchedCreators = [] as Creator[];
  if (search && search.length > 0) {
    searchedCreators = Array.from(new Set(origin_searchedCreators));
  } else {
    searchedCreators = filteredCreators;
  }

  const creators_args = {
    limit: limit,
    list: searchedCreators,
    order: order as "desc" | "asc" | undefined,
    page: currentPage,
    property: "creators" as "creators" | "collections",
    sort: sort as string | undefined,
  };

  // 2.filtered collections
  const filteredCollections01 = collections.filter((collection) => {
    return (
      collectionList &&
      collectionList.some((item) => {
        return item.collection_slug == collection.slug;
      }) &&
      collection
    );
  });

  const filteredCollections02 =
    type && type != "all"
      ? filteredCollections01.filter((collection) => {
          return collection.type === type;
        })
      : filteredCollections01;
  const filteredCollections = filteredCollections02;

  //1.match name
  const searchedCollections01 = filteredCollections.filter((collection) => {
    return (
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      collection.name.toUpperCase().includes(uppperKeyword) == true
    );
  });
  //1.match creator username
  const searchedCollections02 = filteredCollections.filter((collection) => {
    return (
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      collection.creator_id.toUpperCase().includes(uppperKeyword) == true
    );
  });
  const origin_searchedCollections = [...searchedCollections01, ...searchedCollections02];
  //重複削除
  let searchedCollections = [] as Collection[];
  if (search && search.length > 0) {
    searchedCollections = Array.from(new Set(origin_searchedCollections));
  } else {
    searchedCollections = filteredCollections;
  }

  const collections_args = {
    //category: collectionsSort,
    limit: limit,
    list: searchedCollections,
    order: order as "desc" | "asc" | undefined,
    page: currentPage,
    property: "collections" as "creators" | "collections",
    sort: sort as string | undefined,
    term: term as "24h" | "7d" | "30d" | "all" | undefined,
  };

  const default_creators = sortedCreators.length == 0 ? sortList(creators_args) : sortedCreators;

  const default_collections = sortedCollections.length == 0 ? sortList(collections_args) : sortedCollections;

  useEffect(() => {
    const data_creators = sortList(creators_args);
    setSortedCreators(() => {
      return data_creators;
    });
    const data_collections = sortList(collections_args);
    setSortedCollections(() => {
      return data_collections;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, sort, term, page, type, search]);

  const title = userProfile && (
    <>
      {userProfile.username}{" "}
      {userProfile.verified == true && <MdVerified className="ml-1 inline text-xl text-gray-500" />}
    </>
  );
  const sub_title = userProfile?.sub_title ? userProfile : "NFT Collector";
  const links = {
    instagram_id: userProfile?.instagram_id,
    twitter_id: userProfile?.twitter_id,
    website_url: userProfile?.website_url,
  };

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
              background_url={userBackground && URL.createObjectURL(userBackground)}
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
            </div>
            <div className="mb-2">
              <TabIndex property="user" />
            </div>
            {tab != "collection" && (
              <div className="">
                <div className="relative z-20 mb-3 flex justify-between gap-3 sm:gap-5">
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
                  <Pagination currentPage={currentPage} length={default_creators.length} limit={limit} />
                </div>
              </div>
            )}
            {tab == "collection" && (
              <div className="">
                <div className="relative z-20 mb-3 flex justify-between gap-3 sm:gap-5">
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
                  <Pagination currentPage={currentPage} length={default_collections.length} limit={limit} />
                </div>
              </div>
            )}
          </section>
        </div>
      </BaseLayout>
    </>
  );
};

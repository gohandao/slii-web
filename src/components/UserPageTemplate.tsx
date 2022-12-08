import { useRouter } from "next/router";
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
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { getCollections, getCreators, getImageUrl, supabase } from "@/libs/supabase";
import type { Bookmark } from "@/types/bookmark";
import type { Creator } from "@/types/creator";
import type { Upvote } from "@/types/upvote";

type Props = {
  collectionList: Upvote[] | Bookmark[] | undefined;
  creatorList: Upvote[] | Bookmark[] | undefined;
  property: "upvoted" | "bookmarks";
};
export const UserPageTemplate = ({ collectionList, creatorList }: Props) => {
  const router = useRouter();
  const { order, page, search, sort, tab, term, type, username } = router.query;
  const currentPage = page ? Number(page) : 1;
  const limit = 100;
  const [creators, setCreators] = useState<Creator[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [creatorsCount, setCreatorsCount] = useState(0);
  const [collectionsCount, setCollectionsCount] = useState(0);
  const { setUserProfile, userProfile } = useContext(UtilitiesContext);
  if (userProfile && username != userProfile.username) {
    setUserProfile(undefined);
  }
  const [userAvatar, setUserAvatar] = useState<Blob>();
  const [userBackground, setUserBackground] = useState<Blob>();

  let avatar_blob;
  const getAvatarBlob = async () => {
    avatar_blob = userProfile && userProfile.avatar_url && (await getImageUrl(userProfile.avatar_url as string));
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

  const { setHeaderIcon } = useContext(UtilitiesContext);
  useEffect(() => {
    {
      username && !userProfile && getUserProfile(username as string);
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

  useEffect(() => {
    const fetchData = async () => {
      if (creatorList) {
        const usernames = creatorList?.map((item) => {
          return item.creator_username as string;
        });
        const props = {
          order: order as string,
          page: currentPage as number,
          search: search as string,
          sort: sort as string,
          type: type as string,
          usernames: usernames,
        };
        const { count, data } = await getCreators(props);
        data && setCreators(data);
        count && setCreatorsCount(count);
      }
      if (collectionList) {
        const slugs = collectionList?.map((item) => {
          return item.collection_slug as string;
        });
        const props = {
          order: order as string,
          page: currentPage as number,
          search: search as string,
          slugs: slugs,
          sort: sort as string,
          term: term as string,
          type: type as string,
        };
        const { count, data } = await getCollections(props);
        data && setCollections(data);
        count && setCollectionsCount(count);
      }
    };
    fetchData();
  }, [creatorList, collectionList, order, sort, term, page, type, search, currentPage]);

  const getUserProfile = async (username: string) => {
    let new_userProfile;
    try {
      if (supabase) {
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
      }
    } catch (error: any) {
      alert(error.message);
    }
    return new_userProfile;
  };

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
                  {creators && creators.length > 0 ? (
                    <CreatorList creators={creators} />
                  ) : (
                    <p className="text-gray-100">Not found.</p>
                  )}
                </div>
                <div className="flex justify-center">
                  <Pagination currentPage={currentPage} length={creatorsCount} limit={limit} />
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
                  {collections && collections.length > 0 ? (
                    <CollectionList collections={collections} />
                  ) : (
                    <p className="text-gray-100">Not found.</p>
                  )}
                </div>
                <div className="flex justify-center">
                  <Pagination currentPage={currentPage} length={collectionsCount} limit={limit} />
                </div>
              </div>
            )}
          </section>
        </div>
      </BaseLayout>
    </>
  );
};

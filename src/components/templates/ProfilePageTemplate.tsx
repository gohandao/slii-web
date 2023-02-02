import { useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ArticleArea } from "@/components/layouts/ArticleArea";
import { CategoryTabs } from "@/components/modules/CategoryTabs";
import { LikedBox } from "@/components/modules/LikedBox";
import { LikedItem } from "@/components/modules/LikedItem";
import { ProfileHeader } from "@/components/modules/ProfileHeader";
import { ProfileTabs } from "@/components/modules/ProfileTabs";
import { useGetCombinedList } from "@/hooks/useGetCombinedTable";
import { useGetCreators } from "@/hooks/useGetCreators";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import { useGetUserUpvotes } from "@/hooks/useGetUserUpvotes";
import { userProfileAtom } from "@/state/utilities.state";
import type { Creator } from "@/types/creator";

type Props = {
  // username: string;
};
export const ProfilePageTemplate = ({}: Props) => {
  const { getCreators } = useGetCreators();
  const { getCombinedList } = useGetCombinedList();
  const router = useRouter();
  const { tab, username } = router.query;
  const [creators, setCreators] = useState<Creator[]>([]);
  const setUserProfile = useSetAtom(userProfileAtom);
  const { userProfile } = useGetUserProfile();
  if (userProfile && username !== userProfile.username) {
    setUserProfile(undefined);
  }
  const { userUpvotes } = useGetUserUpvotes();

  console.log("userUpvotes");
  console.log(userUpvotes);
  console.log(getCombinedList);

  const upvotes_creators = userUpvotes.filter((upvote) => {
    return upvote.creator_username;
  });
  const upvotes_collections = userUpvotes.filter((upvote) => {
    return upvote.collection_slug;
  });
  console.log(upvotes_collections);

  useEffect(() => {
    const fetchData = async () => {
      const usernames = upvotes_creators.map((creator) => {
        return creator.creator_username;
      }) as string[];
      const props = {
        usernames: usernames,
      };
      const { data } = await getCreators(props);
      console.log(data);
      data && setCreators(data as Creator[]);
    };
    upvotes_creators.length > 0 && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUpvotes]);

  return (
    <>
      <ArticleArea>
        <div className="flex flex-col gap-8 pb-10">
          {userProfile && <ProfileHeader />}
          <section className="mx-auto flex w-full flex-col gap-5">
            <ProfileTabs />
            <CategoryTabs />
            {tab != "collection" && (
              <div className="">
                <div className="mb-10">
                  {creators && creators.length > 0 ? (
                    <>
                      <LikedBox>
                        {creators.map((creator, index) => {
                          return (
                            <div className="flex" key={index}>
                              <LikedItem
                                image={creator.avatar}
                                label="Creator"
                                likeHandler={() => {
                                  return;
                                }}
                                path={`/creator/${creator.username}`}
                                starHandler={() => {
                                  return;
                                }}
                              />
                            </div>
                          );
                        })}
                      </LikedBox>
                    </>
                  ) : (
                    <p className="">Not found.</p>
                  )}
                </div>
                {/* {creatorsCount / limit > 1 && (
                  <div className="flex justify-center">
                    <Pagination currentPage={currentPage} length={creatorsCount} limit={limit} />
                  </div>
                )} */}
              </div>
            )}
          </section>
        </div>
      </ArticleArea>
    </>
  );
};

import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { ArticleArea } from "@/components/layouts/ArticleArea";
import { CategoryTabs } from "@/components/modules/CategoryTabs";
import { LikedBox } from "@/components/modules/LikedBox";
import { LikedItem } from "@/components/modules/LikedItem";
import { ProfileHeader } from "@/components/modules/ProfileHeader";
import { ProfileTabs } from "@/components/modules/ProfileTabs";
import { useGetUserItems } from "@/hooks/useGetUserItems";
import {
  userBookmarksAtom,
  userProfileAtom,
  userProfileCategoryAtom,
  userProfileTabAtom,
  userUpvotesAtom,
} from "@/state/user.state";
import type { TCard } from "@/types/tinder";

type Props = {
  // username: string;
};
export const ProfilePageTemplate = ({}: Props) => {
  const [items, setItems] = useState<TCard[]>([]);
  const { getUserItems, userItems } = useGetUserItems();
  const [userProfile] = useAtom(userProfileAtom);
  const [userUpvotes] = useAtom(userUpvotesAtom);
  const [userBookmarks] = useAtom(userBookmarksAtom);
  const [userProfileTab] = useAtom(userProfileTabAtom);
  const [userProfileCategory] = useAtom(userProfileCategoryAtom);

  useEffect(() => {
    setItems(userItems);
  }, [userItems]);

  useEffect(() => {
    getUserItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfileTab, userProfileCategory, userUpvotes, userBookmarks]);

  return (
    <>
      <ArticleArea>
        <div className="flex flex-col gap-8 pb-10">
          {userProfile && <ProfileHeader />}
          <section className="mx-auto flex w-full flex-col gap-5">
            <ProfileTabs />
            <CategoryTabs />
            <div className="">
              <div className="mb-10">
                {items && items.length > 0 ? (
                  <>
                    <LikedBox>
                      {items.map((item, index) => {
                        return (
                          <div className="flex" key={index}>
                            <LikedItem
                              id={item.id}
                              type={item.type}
                              image={item.image}
                              label={item.type}
                              path={`${item.path}`}
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
          </section>
        </div>
      </ArticleArea>
    </>
  );
};

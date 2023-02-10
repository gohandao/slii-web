import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ArticleArea } from "@/components/layouts/ArticleArea";
import { CategoryTabs } from "@/components/modules/CategoryTabs";
import { LikedBox } from "@/components/modules/LikedBox";
import { LikedItem } from "@/components/modules/LikedItem";
import { Pagination } from "@/components/modules/Pagination";
import { ProfileHeader } from "@/components/modules/ProfileHeader";
import { ProfileTabs } from "@/components/modules/ProfileTabs";
import { items_per_page } from "@/constant/settings.const";
import { useGetGuestItems } from "@/hooks/useGetGuestItems";
import { useGetUserItems } from "@/hooks/useGetUserItems";
import { guestBookmarksAtom, guestUpvotesAtom } from "@/state/guest.state";
import { userBookmarksAtom, userProfileAtom, userUpvotesAtom } from "@/state/user.state";
import { currentPageAtom, profileCategoryAtom, profileTabAtom } from "@/state/utilities.state";
import type { TCard } from "@/types/tinder";

type Props = {
  // username: string;
};
export const ProfilePageTemplate = ({}: Props) => {
  const [items, setItems] = useState<TCard[]>([]);
  const { getUserItems, userItems } = useGetUserItems();
  const { getGuestItems, guestItems } = useGetGuestItems();
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [profileTab] = useAtom(profileTabAtom);
  const [profileCategory] = useAtom(profileCategoryAtom);
  const [userProfile] = useAtom(userProfileAtom);
  const [userUpvotes] = useAtom(userUpvotesAtom);
  const [userBookmarks] = useAtom(userBookmarksAtom);
  const [guestUpvotes] = useAtom(guestUpvotesAtom);
  const [guestBookmarks] = useAtom(guestBookmarksAtom);

  const allItems = items;
  const creatorsItems = items.filter((item) => {
    return item.type == "creator";
  });
  const collectionsItems = items.filter((item) => {
    return item.type == "collection";
  });

  const currentItems =
    !profileCategory || profileCategory == "all"
      ? allItems
      : profileCategory == "creators"
      ? creatorsItems
      : profileCategory == "collections"
      ? collectionsItems
      : [];

  const startIndex = (currentPage - 1) * items_per_page;
  const endIndex = startIndex + items_per_page;
  const displayItems = currentItems.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    userProfile && setItems(userItems);
    !userProfile && setItems(guestItems);
  }, [userItems, guestItems, userProfile]);

  useEffect(() => {
    userProfile && getUserItems();
    !userProfile && getGuestItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileTab, profileCategory, userUpvotes, userBookmarks, userProfile, guestUpvotes, guestBookmarks]);

  return (
    <>
      <ArticleArea>
        <div className="flex flex-col gap-8 pb-10">
          <ProfileHeader />
          <section className="mx-auto flex w-full flex-col gap-5">
            <ProfileTabs />
            <CategoryTabs />
            <div className="">
              <div className="mb-10">
                {displayItems && items.length > 0 ? (
                  <>
                    <LikedBox>
                      {displayItems.map((item, index) => {
                        return (
                          <Link href={item.path} key={index}>
                            <LikedItem id={item.id} type={item.type} image={item.image} label={item.type} />
                          </Link>
                        );
                      })}
                    </LikedBox>
                  </>
                ) : (
                  <p className="">Not found.</p>
                )}
              </div>
              {currentItems.length / items_per_page > 1 && (
                <div className="flex justify-center">
                  <Pagination length={currentItems.length} />
                </div>
              )}
            </div>
          </section>
        </div>
      </ArticleArea>
    </>
  );
};

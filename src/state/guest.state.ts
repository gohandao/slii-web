import { atomWithStorage } from "jotai/utils";

import type { Bookmark } from "@/types/bookmark";
import type { Profile } from "@/types/profile";
import type { Upvote } from "@/types/upvote";

const guestProfile = {
  id: "guest",
  description:
    "You are a guest user. Now your data is saved on your device. So if you want to save your data on our database, please login. You can login only with email.",
  // instagram_id: "gohan_dao"
  links: [
    // {
    //   id: "001",
    //   label: "How to use.",
    //   url: "https://google.com",
    // },
    // {
    //   id: "discord",
    //   label: "Join our discord.",
    //   url: "https://google.com",
    // },
    // {
    //   id: "zenn",
    //   label: "Tech blog",
    //   url: "https://google.com",
    // },
  ],
  name: "Guest",
  // twitter_id: "gohan_dao",
  username: "guest",
};
export const guestProfileAtom = atomWithStorage<Profile>("guestProfile", guestProfile);
export const guestBookmarksAtom = atomWithStorage<Bookmark[]>("guestBookmarks", []);
export const guestUpvotesAtom = atomWithStorage<Upvote[]>("guestUpvotes", []);
export const guestHiddensAtom = atomWithStorage<Upvote[]>("guestHiddens", []);

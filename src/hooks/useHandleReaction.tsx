import { useAtom } from "jotai";
import { useCallback } from "react";

import { supabase } from "@/libs/supabase";
import { authBookmarksAtom, authUpvotesAtom, authUserAtom } from "@/state/auth.state";
import { guestBookmarksAtom, guestHiddensAtom, guestUpvotesAtom } from "@/state/guest.state";
import type { Table } from "@/types/reaction";
import type { Upvote } from "@/types/upvote";

export const useHandleReaction = () => {
  const [authUser] = useAtom(authUserAtom);
  const [authUpvotes, setAuthUpvotes] = useAtom(authUpvotesAtom);
  const [authBookmarks, setAuthBookmarks] = useAtom(authBookmarksAtom);
  const [authHiddens, setAuthHiddens] = useAtom(authBookmarksAtom);

  const [guestUpvotes, setGuestUpvotes] = useAtom(guestUpvotesAtom);
  const [guestBookmarks, setGuestBookmarks] = useAtom(guestBookmarksAtom);
  const [guestHiddens, setGuestHiddens] = useAtom(guestHiddensAtom);

  const getTargetList = useCallback(
    (table: Table) => {
      const target_list = authUser
        ? table == "upvotes"
          ? authUpvotes
          : table == "bookmarks"
          ? authBookmarks
          : table == "hiddens"
          ? authHiddens
          : []
        : !authUser
        ? table == "upvotes"
          ? guestUpvotes
          : table == "bookmarks"
          ? guestBookmarks
          : table == "hiddens"
          ? guestHiddens
          : []
        : [];
      return target_list;
    },
    [authUser, authUpvotes, authBookmarks, authHiddens, guestUpvotes, guestBookmarks, guestHiddens]
  );

  const setAddHandler = useCallback(
    (data: Upvote[], table: Table) => {
      switch (table) {
        case "upvotes":
          authUser && setAuthUpvotes([...authUpvotes, ...data]);
          !authUser && setGuestUpvotes([...guestUpvotes, ...data]);
          break;
        case "bookmarks":
          authUser && setAuthBookmarks([...authBookmarks, ...data]);
          !authUser && setGuestBookmarks([...guestBookmarks, ...data]);
          break;
        case "hiddens":
          authUser && setAuthHiddens([...authHiddens, ...data]);
          !authUser && setGuestHiddens([...guestHiddens, ...data]);
          break;
      }
    },
    [
      authBookmarks,
      authHiddens,
      authUpvotes,
      authUser,
      guestBookmarks,
      guestHiddens,
      guestUpvotes,
      setAuthBookmarks,
      setAuthHiddens,
      setAuthUpvotes,
      setGuestBookmarks,
      setGuestHiddens,
      setGuestUpvotes,
    ]
  );

  const setRemoveHandler = useCallback(
    (data: Upvote[], table: Table) => {
      switch (table) {
        case "upvotes":
          authUser && setAuthUpvotes(data);
          !authUser && setGuestUpvotes(data);
          break;
        case "bookmarks":
          authUser && setAuthBookmarks(data);
          !authUser && setGuestBookmarks(data);
          break;
        case "hiddens":
          authUser && setAuthHiddens(data);
          !authUser && setGuestHiddens(data);
          break;
      }
    },
    [authUser, setAuthBookmarks, setAuthHiddens, setAuthUpvotes, setGuestBookmarks, setGuestHiddens, setGuestUpvotes]
  );

  type AddReaction = {
    collection_slug?: string;
    creator_username?: string;
    table: Table;
  };
  const addReaction = useCallback(
    async ({ collection_slug, creator_username, table }: AddReaction) => {
      const target_list = getTargetList(table);
      const checkLiked_username =
        creator_username &&
        target_list.filter((item) => {
          return item.creator_username == creator_username;
        });
      const checkLiked_slug =
        collection_slug &&
        target_list.filter((item) => {
          return item.collection_slug == collection_slug;
        });
      const checkLiked =
        (checkLiked_username && checkLiked_username.length > 0) || (checkLiked_slug && checkLiked_slug.length > 0);
      if (!checkLiked) {
        if (authUser && table) {
          // save database
          const fetchData = async () => {
            const { data, error } = await supabase
              .from(table)
              .insert([
                {
                  collection_slug: collection_slug,
                  created_at: new Date(),
                  creator_username: creator_username,
                  user_id: authUser.id,
                },
              ])
              .select();
            if (error) {
              console.log(error);
            }
            return data as Upvote[];
          };
          const data = await fetchData();
          data && setAddHandler(data, table);
        }
        if (!authUser) {
          // save localstorage
          const data = [
            {
              collection_slug: collection_slug,
              created_at: new Date(),
              creator_username: creator_username,
              user_id: "guest",
            },
          ] as Upvote[];
          data && setAddHandler(data, table);
        }
      }
    },
    [authUser, getTargetList, setAddHandler]
  );

  type RemoveReaction = {
    collection_slug?: string;
    creator_username?: string;
    table: Table;
  };
  const removeReaction = useCallback(
    async ({ collection_slug, creator_username, table }: RemoveReaction) => {
      const target_list = getTargetList(table);
      if (authUser && table) {
        const fetchData = async () => {
          const { data } = await supabase
            .from(table)
            .delete()
            .match({
              [creator_username ? "creator_username" : "collection_slug"]: creator_username
                ? creator_username
                : collection_slug,
              user_id: authUser.id,
            })
            .select();
          return data as Upvote[];
        };
        const data = await fetchData();
        if (data) {
          if (creator_username) {
            const removedUpvotes = target_list.filter((item) => {
              return item.creator_username !== creator_username;
            });
            setRemoveHandler(removedUpvotes, table);
          }
          if (collection_slug) {
            const removedUpvotes = target_list.filter((item) => {
              return item.collection_slug !== collection_slug;
            });
            setRemoveHandler(removedUpvotes, table);
          }
        }
      }
      if (!authUser) {
        if (creator_username) {
          const removedUpvotes = target_list.filter((item) => {
            return item.creator_username !== creator_username;
          });
          setRemoveHandler(removedUpvotes, table);
        }
        if (collection_slug) {
          const removedUpvotes = target_list.filter((item) => {
            return item.collection_slug !== collection_slug;
          });
          setRemoveHandler(removedUpvotes, table);
        }
      }
    },
    [authUser, getTargetList, setRemoveHandler]
  );

  type CheckReaction = {
    collection_slug?: string;
    creator_username?: string;
    table: Table;
  };
  const checkReaction = useCallback(
    ({ collection_slug, creator_username, table }: CheckReaction) => {
      const target_list = getTargetList(table);
      let filterdUpvotes = [];
      if (creator_username) {
        filterdUpvotes = target_list.filter((upvote) => {
          return upvote.creator_username === creator_username;
        });
        if (filterdUpvotes.length > 0) {
          return true;
        } else {
          return false;
        }
      }
      if (collection_slug) {
        filterdUpvotes = target_list.filter((upvote) => {
          return upvote.collection_slug === collection_slug;
        });
        if (filterdUpvotes.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    [getTargetList]
  );

  return { addReaction, checkReaction, removeReaction };
};

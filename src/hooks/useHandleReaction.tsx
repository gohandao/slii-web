import { useAtom } from "jotai";
import { useCallback } from "react";

import { supabase } from "@/libs/supabase";
import { authBookmarksAtom, authUpvotesAtom, authUserAtom } from "@/state/auth.state";
import type { Table } from "@/types/reaction";

import type { Upvote } from "../types/upvote";

export const useHandleReaction = () => {
  const [authUser] = useAtom(authUserAtom);
  const [authUpvotes, setAuthUpvotes] = useAtom(authUpvotesAtom);
  const [authBookmarks, setAuthBookmarks] = useAtom(authBookmarksAtom);
  const [authHiddens, setAuthHiddens] = useAtom(authBookmarksAtom);

  const getTargetList = useCallback(
    (table: Table) => {
      const target_list =
        table == "upvotes" ? authUpvotes : table == "bookmarks" ? authBookmarks : table == "hiddens" ? authHiddens : [];
      return target_list;
    },
    [authUpvotes, authBookmarks, authHiddens]
  );

  const setAddHandler = useCallback(
    (data: Upvote[], table: Table) => {
      switch (table) {
        case "upvotes":
          setAuthUpvotes([...authUpvotes, ...data]);
          break;
        case "bookmarks":
          setAuthBookmarks([...authBookmarks, ...data]);
          break;
        case "hiddens":
          setAuthHiddens([...authHiddens, ...data]);
          break;
      }
    },
    [authBookmarks, authHiddens, authUpvotes, setAuthBookmarks, setAuthHiddens, setAuthUpvotes]
  );

  const setRemoveHandler = useCallback(
    (data: Upvote[], table: Table) => {
      switch (table) {
        case "upvotes":
          setAuthUpvotes(data);
          break;
        case "bookmarks":
          setAuthBookmarks(data);
          break;
        case "hiddens":
          setAuthHiddens(data);
          break;
      }
    },
    [setAuthBookmarks, setAuthHiddens, setAuthUpvotes]
  );

  type AddReaction = {
    collection_slug?: string;
    creator_username?: string;
    table: Table;
  };
  const addReaction = useCallback(
    async ({ collection_slug, creator_username, table }: AddReaction) => {
      const target_list = getTargetList(table);
      if (authUser) {
        // save database
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

        if (!checkLiked && table) {
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
              console.log("error");
              console.log(error);
            }
            return data as Upvote[];
          };
          const data = await fetchData();
          data && setAddHandler(data, table);
        }
      } else {
        // save localstorage
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

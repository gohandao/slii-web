import { useAtom } from "jotai";
import { useCallback } from "react";

import { supabase } from "@/libs/supabase";
import { authUpvotesAtom, authUserAtom } from "@/state/auth.state";
import type { Upvote } from "@/types/upvote";

export const useHandleUpvote = () => {
  const [authUser] = useAtom(authUserAtom);
  const [authUpvotes, setAuthUpvotes] = useAtom(authUpvotesAtom);

  type AddLike = {
    id: string;
    collection_slug?: string;
    creator_username?: string;
  };
  const addLike = useCallback(
    async ({ id, collection_slug, creator_username }: AddLike) => {
      if (authUser) {
        // save database
        const checkLiked = authUpvotes.filter((upvote) => {
          return upvote.creator_username == id;
        });
        if (checkLiked.length === 0) {
          const fetchData = async () => {
            const { data, error } = await supabase
              .from("upvotes")
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
          data && setAuthUpvotes([...authUpvotes, ...data]);
        }
      } else {
        // save localstorage
      }
    },
    [authUser, authUpvotes, setAuthUpvotes]
  );

  type RemoveLike = {
    collection_slug?: string;
    creator_username?: string;
  };
  const removeLike = useCallback(
    async ({ collection_slug, creator_username }: RemoveLike) => {
      if (authUser) {
        const fetchData = async () => {
          const { data } = await supabase
            .from("upvotes")
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
          const removedUpvotes = authUpvotes.filter((upvote) => {
            return upvote.creator_username !== creator_username;
          });
          setAuthUpvotes(removedUpvotes);
        }
      }
    },
    [authUpvotes, authUser, setAuthUpvotes]
  );

  type CheckLike = {
    collection_slug?: string;
    creator_username?: string;
  };
  const checkUpvoted = useCallback(
    ({ collection_slug, creator_username }: CheckLike) => {
      let filterdUpvotes = [];
      if (creator_username) {
        filterdUpvotes = authUpvotes.filter((upvote) => {
          return upvote.creator_username === creator_username;
        });
        if (filterdUpvotes.length > 0) {
          return true;
        } else {
          return false;
        }
      }
      if (collection_slug) {
        filterdUpvotes = authUpvotes.filter((upvote) => {
          return upvote.collection_slug === collection_slug;
        });
        if (filterdUpvotes.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    [authUpvotes]
  );

  return { addLike, checkUpvoted, removeLike };
};

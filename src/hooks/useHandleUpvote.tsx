import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "@/contexts/AuthContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { supabase } from "@/libs/supabase";

import type { Upvote } from "../types/upvote";

export const useHandleUpvote = (count: number, type: string, id: string) => {
  const { setUpvotes, upvotes, user } = useContext(AuthContext);
  const { setLoginModal } = useContext(UtilitiesContext);
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  const [removed, setRemoved] = useState<boolean>(false);
  const [currentCount, setCurrentCount] = useState<number>(count);

  useEffect(() => {
    let new_count = count;
    if (added) new_count = count ? count + 1 : 1;
    if (removed) new_count = count ? count - 1 : 0;
    setCurrentCount(new_count);
  }, [count, added, removed]);

  const creator_username = type === "creator" ? id : "";
  const collection_slug = type === "collection" ? id : "";

  const addLike = useCallback(async () => {
    if (user) {
      const checkLiked = upvotes.filter((upvote) => {
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
                user_id: user.id,
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
        data && setUpvotes([...upvotes, ...data]);
        setUpvoted(true);
        setRemoved(false);
        setAdded(true);
      }
    } else {
      setLoginModal(true);
    }
  }, [user, upvotes, id, collection_slug, creator_username, setUpvotes, setLoginModal]);

  const removeLike = useCallback(async () => {
    if (user) {
      const fetchData = async () => {
        const { data } = await supabase
          .from("upvotes")
          .delete()
          .match({
            [type === "creator" ? "creator_username" : "collection_slug"]:
              type === "creator" ? creator_username : collection_slug,
            user_id: user.id,
          })
          .select();
        return data as Upvote[];
      };
      const data = await fetchData();
      if (data) {
        const removedUpvotes = upvotes.filter((upvote) => {
          return upvote.creator_username !== creator_username;
        });
        setUpvotes(removedUpvotes);
        setUpvoted(false);
        setRemoved(true);
        setAdded(false);
      }
    }
  }, [upvotes, user, type, creator_username, collection_slug, setUpvotes]);

  const checkUpvoted = useCallback(() => {
    let filterdUpvotes = [];
    if (type == "creator") {
      filterdUpvotes = upvotes.filter((upvote) => {
        return upvote.creator_username === id;
      });
    }
    if (type == "collection") {
      filterdUpvotes = upvotes.filter((upvote) => {
        return upvote.collection_slug === id;
      });
    }

    setUpvoted(filterdUpvotes.length > 0);
  }, [upvotes, id, type]);

  useEffect(() => {
    checkUpvoted();
  }, [upvotes, id, checkUpvoted]);

  return { addLike, currentCount, removeLike, upvoted };
};

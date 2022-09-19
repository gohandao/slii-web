import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/libs/supabase";
import React, { useContext, useEffect, useState } from "react";

import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";

type Props = {
  id: string;
  property?: string;
  type: string;
};
export const LikeButton = ({ id, property = "default", type }: Props) => {
  const { user, likes, setLikes, upvotes } = useContext(AuthContext);

  const [followers, setFollowers] = useState<number>();
  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }

  const [liked, setLiked] = useState<boolean>(false);

  const creator_id = type == "creator" && id;
  const collection_slug = type == "collection" && id;

  const addLikeHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (user) {
      const checkLiked = likes.filter((like) => like.creator_id == id);
      if (checkLiked.length == 0) {
        const { data, error } = await supabase.from("likes").insert([
          {
            user_id: user.id,
            creator_id: creator_id,
            collection_slug: collection_slug,
            created_at: new Date(),
          },
        ]);
        //@ts-ignore
        setLikes([...likes, ...data]);
        setLiked(true);
      }
    } else {
      alert("Please login.");
    }
  };
  const removeLikeHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (user) {
      if (type == "creator") {
        const { data, error } = await supabase
          .from("likes")
          .delete()
          .match({ user_id: user.id, creator_id: creator_id });
        const removedLikes = likes.filter(
          (like) => like.creator_id != creator_id
        );
        setLikes(removedLikes);
        setLiked(false);
      }
      if (type == "collection") {
        const { data, error } = await supabase
          .from("likes")
          .delete()
          .match({ user_id: user.id, collection_slug: collection_slug });
        const removedLikes = likes.filter((like) => like.collection_slug != id);
        setLikes(removedLikes);
        setLiked(false);
      }
    }
  };
  const checkLiked = () => {
    let filterdLikes = [];
    if (type == "creator") {
      filterdLikes = likes.filter((like) => like.creator_id === id);
    }
    if (type == "collection") {
      filterdLikes = likes.filter((like) => like.collection_slug === id);
    }
    if (filterdLikes.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };
  useEffect(() => {
    checkLiked();
  }, [likes, id]);
  return (
    <div className="flex justify-center gap-3">
      <div className="flex gap-1 items-center">
        {liked ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (liked) {
                removeLikeHandler(e);
              } else {
                addLikeHandler(e);
              }
            }}
            className=""
          >
            <AiFillHeart className="text-lg text-pink-500 opacity-90" />
          </button>
        ) : (
          <button
            onClick={(e) => {
              addLikeHandler(e);
            }}
            className=""
          >
            <AiOutlineHeart className="text-lg text-white opacity-30" />
          </button>
        )}
        {/*<p className="text-gray-600 text-sm">100</p>*/}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";

import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";

type Props = {
  id: string;
  type: "creator" | "collection";
};
export const LikeViews = ({ id, type }: Props) => {
  const [followers, setFollowers] = useState<number>();
  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }

  const [liked, setLiked] = useState<boolean>(false);

  const addLikeHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLiked(true);
  };
  const removeLikeHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLiked(false);
  };
  return (
    <div className="flex justify-center gap-3">
      <div className="flex items-center gap-1">
        {liked ? (
          <button
            onClick={(e) => {
              removeLikeHandler(e);
            }}
            className=""
          >
            <AiFillHeart className="text-xl text-pink-500 opacity-90" />
          </button>
        ) : (
          <button
            onClick={(e) => {
              addLikeHandler(e);
            }}
            className=""
          >
            <AiOutlineHeart className="text-xl text-white opacity-30" />
          </button>
        )}
        <p className="text-sm text-gray-500">100</p>
      </div>
      <div className="flex items-center gap-1">
        <AiOutlineEye className="text-2xl text-lg text-white opacity-30" />
        <p className="text-sm text-gray-500">100</p>
      </div>
    </div>
  );
};

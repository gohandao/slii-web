import React, { useEffect, useState } from "react";

import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";

type Props = {
  id: string;
  type: "creator" | "collection";
};
export const ViewsCount = ({ id, type }: Props) => {
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
      <div className="flex gap-1 items-center">
        {/*<AiOutlineEye className="text-2xl text-white opacity-30 text-lg" />*/}
        <p className="text-gray-500 text-sm">100 Views</p>
      </div>
    </div>
  );
};

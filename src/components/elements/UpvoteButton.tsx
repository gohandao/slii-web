import type { FC } from "react";
import { AiFillHeart } from "react-icons/ai";

import { useHandleUpvote } from "@/hooks/useHandleUpvote";

type Props = {
  id: string;
  count: number;
  property?: "simple" | "default";
  type: "collection" | "creator" | string;
};
export const UpvoteButton: FC<Props> = ({ id, count, property = "default", type }) => {
  const { addLike, currentCount, removeLike, upvoted } = useHandleUpvote(count, type, id);
  const propertyClass =
    property == "simple"
      ? "rounded px-1 py-[3px] flex items-center justify-center gap-1"
      : "px-3 py-[10px] flex items-center justify-center gap-1";

  const heartIconClass = upvoted ? "text-pink-500 opacity-90" : "text-white opacity-30";

  return (
    <div className="flex justify-center gap-3">
      <div className="flex items-center gap-1 ">
        <button
          onClick={(e) => {
            e.preventDefault();
            upvoted ? removeLike() : addLike();
          }}
        >
          {property === "simple" ? (
            <div className={`min-w-[40px] bg-gray-700 ${propertyClass} `}>
              <AiFillHeart className={`text-sm ${heartIconClass}`} />
              <p className="min-w-[9px] text-sm text-gray-100">{currentCount}</p>
            </div>
          ) : (
            <div className="bg-upvote h-[44px] rounded">
              {upvoted ? (
                <div className={`h-full bg-white ${propertyClass} rounded border-2 border-pink-600`}>
                  <AiFillHeart className="text-sm text-pink-600 opacity-80" />
                  <p className="px-1 text-sm text-pink-600">
                    <span className="hidden text-sm text-pink-600 sm:inline">Liked</span> {currentCount}
                  </p>
                </div>
              ) : (
                <div className={`h-full  ${propertyClass} `}>
                  <AiFillHeart className="text-sm text-white" />
                  <p className="px-1 text-sm text-white">
                    <span className="hidden text-xs text-pink-100 sm:inline">Like</span> {currentCount}
                  </p>
                </div>
              )}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

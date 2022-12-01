import React, { useContext, useEffect, useState } from "react";
import { BsTriangleFill } from "react-icons/bs";
// libs
import { supabase } from "@/libs/supabase";
// contexts
import { AuthContext } from "@/contexts/AuthContext";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
// utilities
import { updateUpvotes } from "@/utilities/updateUpvotes";
// types
import { Upvote } from "@/types/upvote";

type Props = {
  id: string;
  property?: string;
  type: string;
  count?: number;
};
export const UpvoteButton = ({
  id,
  property = "default",
  type,
  count,
}: Props) => {
  const { user, upvotes, setUpvotes } = useContext(AuthContext);
  const { setLoginModal } = useContext(UtilitiesContext);
  const { setCreators, setCollections } = useContext(BaseContext);
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [currentCount, setCurrentCount] = useState<number | undefined>(count);

  useEffect(() => {
    let initial_count = count;
    if (upvoted == true && count == 0) {
      initial_count = 1;
    }
    // if (upvoted == false && count && count > 0) {
    //   initial_count = count - 1;
    // }
    setCurrentCount(initial_count);
  }, [count, upvoted]);

  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://nftotaku.com",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }

  const creator_id = type == "creator" ? id : "";
  const collection_slug = type == "collection" ? id : "";

  const addLikeHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (user) {
      const checkLiked = upvotes.filter((upvote) => upvote.creator_id == id);
      if (checkLiked.length == 0) {
        const { data, error } = await supabase.from("upvotes").insert([
          {
            user_id: user.id,
            creator_id: creator_id,
            collection_slug: collection_slug,
            created_at: new Date(),
          },
        ]);
        //@ts-ignore
        setUpvotes([...upvotes, ...data]);
        setUpvoted(true);
        let base_count = currentCount ? currentCount : 0;
        let new_count = base_count + 1;
        const new_data = updateUpvotes({
          upvotes_count: new_count,
          creator_username: creator_id,
          collection_slug: collection_slug,
        });
        new_data && creator_id && setCreators(new_data);
        new_data && collection_slug && setCollections(new_data);
      }
    } else {
      setLoginModal(true);
    }
  };
  const removeLikeHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (user) {
      if (type == "creator") {
        const { data, error } = await supabase
          .from("upvotes")
          .delete()
          .match({ user_id: user.id, creator_id: creator_id });
        const removedUpvotes = upvotes.filter(
          (upvote) => upvote.creator_id != creator_id
        );
        setUpvotes(removedUpvotes);
        setUpvoted(false);
      }
      if (type == "collection") {
        const { data, error } = await supabase
          .from("upvotes")
          .delete()
          .match({ user_id: user.id, collection_slug: collection_slug });
        const removedUpvotes = upvotes.filter(
          (upvote) => upvote.collection_slug != id
        );
        setUpvotes(removedUpvotes);
        setUpvoted(false);
      }
      let base_count = currentCount ? currentCount : 0;
      let new_count = base_count > 0 ? base_count - 1 : 0;
      const new_data = updateUpvotes({
        upvotes_count: new_count,
        creator_username: creator_id,
        collection_slug: collection_slug,
      });
      new_data && creator_id && setCreators(new_data);
      new_data && collection_slug && setCollections(new_data);
    }
  };

  const checkUpvoted = () => {
    let filterdUpvotes = [];
    if (type == "creator") {
      filterdUpvotes = upvotes.filter((upvote) => upvote.creator_id === id);
    }
    if (type == "collection") {
      filterdUpvotes = upvotes.filter(
        (upvote) => upvote.collection_slug === id
      );
    }
    if (filterdUpvotes.length > 0) {
      setUpvoted(true);
    } else {
      setUpvoted(false);
    }
  };

  useEffect(() => {
    checkUpvoted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upvotes, id]);

  let propertyClass;
  if (property == "simple") {
    propertyClass =
      "rounded px-2 py-[3px] flex items-center justify-center gap-1";
  } else {
    propertyClass = "px-3 py-[10px] flex items-center justify-center gap-1";
  }
  return (
    <div className="flex justify-center gap-3">
      <div className="flex items-center gap-1 ">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (upvoted) {
              removeLikeHandler(e);
            } else {
              addLikeHandler(e);
            }
          }}
          className={``}
        >
          {property == "simple" ? (
            <>
              {upvoted ? (
                <div className={`bg-gray-700 ${propertyClass} `}>
                  <BsTriangleFill className="text-sm text-orange-500 opacity-90" />
                  <p className="text-sm text-gray-100">{currentCount}</p>
                </div>
              ) : (
                <div className={`bg-gray-700 ${propertyClass}  `}>
                  <BsTriangleFill className="text-sm text-white opacity-30" />
                  <p className="text-sm text-gray-100">{currentCount}</p>
                </div>
              )}
            </>
          ) : (
            <div className="bg-upvote h-[44px] rounded">
              {upvoted ? (
                <div
                  className={`h-full bg-white ${propertyClass} rounded border-2 border-orange-600`}
                >
                  <BsTriangleFill className="text-sm text-orange-600 opacity-80" />
                  <p className="px-1 text-sm text-orange-600">
                    <span className="hidden text-sm text-orange-600 sm:inline">
                      Upvoted
                    </span>{" "}
                    {currentCount}
                  </p>
                </div>
              ) : (
                <div className={`h-full  ${propertyClass} `}>
                  <BsTriangleFill className="text-sm text-white" />
                  <p className="px-1 text-sm text-white">
                    <span className="hidden text-xs text-orange-100 sm:inline">
                      Upvote
                    </span>{" "}
                    {currentCount}
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

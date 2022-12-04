import type { FC } from "react";
import { useContext, useEffect, useState } from "react";
import { BsTriangleFill } from "react-icons/bs";

import { AuthContext } from "@/contexts/AuthContext";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { supabase } from "@/libs/supabase";
import { updateUpvotes } from "@/utilities/updateUpvotes";

type Props = {
  id: string;
  count?: number;
  property?: string;
  type: string;
};
export const UpvoteButton: FC<Props> = ({ id, count, property = "default", type }) => {
  const { setUpvotes, upvotes, user } = useContext(AuthContext);
  const { setLoginModal } = useContext(UtilitiesContext);
  const { setCollections, setCreators } = useContext(BaseContext);
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

  const creator_id = type == "creator" ? id : "";
  const collection_slug = type == "collection" ? id : "";

  const addLikeHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (user) {
      const checkLiked = upvotes.filter((upvote) => {
        return upvote.creator_id == id;
      });
      if (checkLiked.length == 0) {
        const { data } = await supabase.from("upvotes").insert([
          {
            collection_slug: collection_slug,
            created_at: new Date(),
            creator_id: creator_id,
            user_id: user.id,
          },
        ]);
        data && setUpvotes([...upvotes, ...data]);
        setUpvoted(true);
        const base_count = currentCount ? currentCount : 0;
        const new_count = base_count + 1;
        const new_data = updateUpvotes({
          collection_slug: collection_slug,
          creator_username: creator_id,
          upvotes_count: new_count,
        });
        new_data && creator_id && setCreators(new_data);
        new_data && collection_slug && setCollections(new_data);
      }
    } else {
      setLoginModal(true);
    }
  };
  const removeLikeHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (user) {
      if (type == "creator") {
        await supabase.from("upvotes").delete().match({ creator_id: creator_id, user_id: user.id });
        const removedUpvotes = upvotes.filter((upvote) => {
          return upvote.creator_id != creator_id;
        });
        setUpvotes(removedUpvotes);
        setUpvoted(false);
      }
      if (type == "collection") {
        await supabase.from("upvotes").delete().match({ collection_slug: collection_slug, user_id: user.id });
        const removedUpvotes = upvotes.filter((upvote) => {
          return upvote.collection_slug != id;
        });
        setUpvotes(removedUpvotes);
        setUpvoted(false);
      }
      const base_count = currentCount ? currentCount : 0;
      const new_count = base_count > 0 ? base_count - 1 : 0;
      const new_data = updateUpvotes({
        collection_slug: collection_slug,
        creator_username: creator_id,
        upvotes_count: new_count,
      });
      new_data && creator_id && setCreators(new_data);
      new_data && collection_slug && setCollections(new_data);
    }
  };

  const checkUpvoted = () => {
    let filterdUpvotes = [];
    if (type == "creator") {
      filterdUpvotes = upvotes.filter((upvote) => {
        return upvote.creator_id === id;
      });
    }
    if (type == "collection") {
      filterdUpvotes = upvotes.filter((upvote) => {
        return upvote.collection_slug === id;
      });
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
    propertyClass = "rounded px-2 py-[3px] flex items-center justify-center gap-1";
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
                <div className={`h-full bg-white ${propertyClass} rounded border-2 border-orange-600`}>
                  <BsTriangleFill className="text-sm text-orange-600 opacity-80" />
                  <p className="px-1 text-sm text-orange-600">
                    <span className="hidden text-sm text-orange-600 sm:inline">Upvoted</span> {currentCount}
                  </p>
                </div>
              ) : (
                <div className={`h-full  ${propertyClass} `}>
                  <BsTriangleFill className="text-sm text-white" />
                  <p className="px-1 text-sm text-white">
                    <span className="hidden text-xs text-orange-100 sm:inline">Upvote</span> {currentCount}
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

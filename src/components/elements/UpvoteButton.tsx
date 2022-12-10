import { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";

import { AuthContext } from "@/contexts/AuthContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { supabase } from "@/libs/supabase";

type Props = {
  id: string;
  count?: number;
  property?: string;
  type: string;
};
export const UpvoteButton = ({ id, count, property = "default", type }: Props) => {
  const { setUpvotes, upvotes, user } = useContext(AuthContext);
  const { setLoginModal } = useContext(UtilitiesContext);
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  const [removed, setRemoved] = useState<boolean>(false);
  const [currentCount, setCurrentCount] = useState<number | undefined>(count);

  useEffect(() => {
    let new_count = count;
    if (added == true) {
      new_count = count ? count + 1 : 1;
    }
    if (removed == true) {
      new_count = count ? count - 1 : 0;
    }
    setCurrentCount(new_count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, added, removed]);

  const creator_username = type == "creator" ? id : "";
  const collection_slug = type == "collection" ? id : "";

  const addLikeHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (user) {
      const checkLiked = upvotes.filter((upvote) => {
        return upvote.creator_username == id;
      });
      if (checkLiked.length == 0 && supabase) {
        const { data, error } = await supabase.from("upvotes").insert([
          {
            collection_slug: collection_slug,
            created_at: new Date(),
            creator_username: creator_username,
            user_id: user.id,
          },
        ]);
        setUpvotes;
        data && setUpvotes([...upvotes, ...data]);
        setUpvoted(true);
        setRemoved(false);
        setAdded(true);
        if (error) {
          console.log("error");
          console.log(error);
        }
      }
    } else {
      setLoginModal(true);
    }
  };
  const removeLikeHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (user) {
      if (type == "creator" && supabase) {
        const data = await supabase
          .from("upvotes")
          .delete()
          .match({ creator_username: creator_username, user_id: user.id });
        if (data) {
          const removedUpvotes = upvotes.filter((upvote) => {
            return upvote.creator_username != creator_username;
          });
          setUpvotes(removedUpvotes);
          setUpvoted(false);
          setRemoved(true);
          setAdded(false);
        }
      }
      if (type == "collection" && supabase) {
        const data = await supabase
          .from("upvotes")
          .delete()
          .match({ collection_slug: collection_slug, user_id: user.id });
        if (data) {
          const removedUpvotes = upvotes.filter((upvote) => {
            return upvote.creator_username != creator_username;
          });
          setUpvotes(removedUpvotes);
          setUpvoted(false);
          setRemoved(true);
          setAdded(false);
        }
      }
    }
  };

  const checkUpvoted = () => {
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
                  <AiFillHeart className="text-sm text-pink-500 opacity-90" />
                  <p className="text-sm text-gray-100">{currentCount}</p>
                </div>
              ) : (
                <div className={`bg-gray-700 ${propertyClass}  `}>
                  <AiFillHeart className="text-sm text-white opacity-30" />
                  <p className="text-sm text-gray-100">{currentCount}</p>
                </div>
              )}
            </>
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

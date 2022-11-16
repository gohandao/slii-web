import { AuthContext } from "@/contexts/AuthContext";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { supabase } from "@/libs/supabase";
import { Upvote } from "@/types/upvote";
import { updateUpvotes } from "@/utilities/updateUpvotes";
import React, { useContext, useEffect, useState } from "react";
import { BsTriangleFill } from "react-icons/bs";

type Props = {
  id: string;
  property?: string;
  type: string;
  count?: number;
};
export const VoteButton = ({
  id,
  property = "default",
  type,
  count,
}: Props) => {
  const { user, upvotes, setUpvotes, bookmarks, setBookmarks } =
    useContext(AuthContext);
  const { loginModal, setLoginModal } = useContext(UtilitiesContext);
  const { setCreators, setCollections } = useContext(BaseContext);
  const [postUpvotes, setPostUpvotes] = useState<Upvote[]>([]);
  const [upvoted, setUpvoted] = useState<boolean>(false);

  const [currentCount, setCurrentCount] = useState<number | undefined>(count);

  useEffect(() => {
    let initial_count = count;
    if (upvoted == true && count == 0) {
      initial_count = 1;
    }
    if (upvoted == false && count && count > 0) {
      initial_count = count - 1;
    }
    setCurrentCount(initial_count);
  }, [count, upvoted]);

  // let currentCount = count;
  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
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
      // alert("Please login.");
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
      // currentCount = currentCount - 1;
    }
  };

  // const getUpvotesCount = async () => {
  //   if (type == "creator") {
  //     const { data, error, status } = await supabase
  //       .from("upvotes")
  //       .select("*, profiles(*)", {
  //         count: "exact",
  //         head: false,
  //       })
  //       .eq("creator_id", `${creator_id}`);
  //     setPostUpvotes(data as Upvote[]);
  //     console.log("upvote data");
  //     console.log(data);
  //   }
  //   if (type == "collection") {
  //     const { data, error, status } = await supabase
  //       .from("upvotes")
  //       .select("*, profiles(*)", {
  //         count: "exact",
  //         head: false,
  //       })
  //       .eq("collection_slug", `${collection_slug}`);
  //     setPostUpvotes(data as Upvote[]);
  //   }
  // };

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
    // getUpvotesCount();
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
      <div className="flex gap-1 items-center ">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (upvoted) {
              removeLikeHandler(e);
            } else {
              addLikeHandler(e);
            }
          }}
          className={`h-[44px]`}
        >
          {property == "simple" ? (
            <>
              {upvoted ? (
                <div className={`bg-gray-700 ${propertyClass} `}>
                  <BsTriangleFill className="text-sm text-orange-500 opacity-90" />
                  <p className="text-gray-100 text-sm">{currentCount}</p>
                </div>
              ) : (
                <div className={`bg-gray-700 ${propertyClass}  `}>
                  <BsTriangleFill className="text-sm text-white opacity-30" />
                  <p className="text-gray-100 text-sm">{currentCount}</p>
                </div>
              )}
            </>
          ) : (
            <div className="bg-upvote h-full rounded">
              {upvoted ? (
                <div
                  className={`bg-white ${propertyClass} border-2 border-orange-600 rounded`}
                >
                  <BsTriangleFill className="text-sm text-orange-600 opacity-80" />
                  <p className="text-orange-600 px-1 text-sm">
                    Upvoted {currentCount}
                  </p>
                </div>
              ) : (
                <div className={` ${propertyClass} `}>
                  <BsTriangleFill className="text-sm text-white" />
                  <p className="text-white px-1 text-sm">
                    <span className="text-orange-100 text-xs hidden sm:inline">
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

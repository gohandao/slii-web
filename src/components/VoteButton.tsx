import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/libs/supabase";
import { Upvote } from "@/types/upvote";
import React, { useContext, useEffect, useState } from "react";
import { BsTriangleFill } from "react-icons/bs";

type Props = {
  id: string;
  property?: string;
  type: string;
  count: number;
};
export const VoteButton = ({
  id,
  property = "default",
  type,
  count,
}: Props) => {
  const { user, upvotes, setUpvotes, bookmarks, setBookmarks } =
    useContext(AuthContext);
  const [postUpvotes, setPostUpvotes] = useState<Upvote[]>([]);
  const [currentCount, setCurrentCount] = useState<number>(count);
  useEffect(() => {
    setCurrentCount(count);
  }, [count]);

  // let currentCount = count;

  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }

  const [upvoted, setUpvoted] = useState<boolean>(false);

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
        setCurrentCount(currentCount + 1);
        // currentCount = currentCount + 1;
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
      setCurrentCount(currentCount - 1);
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
    propertyClass =
      "rounded px-3 py-[10px] flex items-center justify-center gap-1 border-2";
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
          className={``}
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
            <>
              {upvoted ? (
                <div className={`bg-white ${propertyClass} border-orange-600 `}>
                  <BsTriangleFill className="text-sm text-orange-600 opacity-80" />
                  <p className="text-orange-600 px-1 text-sm">
                    Upvoted {currentCount}
                  </p>
                </div>
              ) : (
                <div
                  className={`bg-orange-500 ${propertyClass} border-orange-500 `}
                >
                  <BsTriangleFill className="text-sm text-white opacity-50" />
                  <p className="text-gray-100 px-1 text-sm">
                    Upvote {currentCount}
                  </p>
                </div>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

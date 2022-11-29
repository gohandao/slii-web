import React, { useContext, useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
// libs
import { supabase } from "@/libs/supabase";
// contexts
import { AuthContext } from "@/contexts/AuthContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

type Props = {
  id: string;
  property?: string;
  type: string;
};
export const BookmarkButton = ({ id, property = "default", type }: Props) => {
  const { user, bookmarks, setBookmarks, upvotes } = useContext(AuthContext);
  const { baseUrl, setLoginModal } = useContext(UtilitiesContext);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const creator_id = type == "creator" && id;
  const collection_slug = type == "collection" && id;

  const addBookmarkHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (user) {
      const checkBookmarked = bookmarks.filter(
        (bookmark) => bookmark.creator_id == id
      );
      if (checkBookmarked.length == 0) {
        const { data, error } = await supabase.from("bookmarks").insert([
          {
            user_id: user.id,
            creator_id: creator_id,
            collection_slug: collection_slug,
            created_at: new Date(),
          },
        ]);
        //@ts-ignore
        setBookmarks([...bookmarks, ...data]);
        setBookmarked(true);
      }
    } else {
      setLoginModal(true);
      // alert("Please login.");
    }
  };
  const removeBookmarkHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (user) {
      if (type == "creator") {
        const { data, error } = await supabase
          .from("bookmarks")
          .delete()
          .match({ user_id: user.id, creator_id: creator_id });
        const removedBookmarks = bookmarks.filter(
          (bookmark) => bookmark.creator_id != creator_id
        );
        setBookmarks(removedBookmarks);
        setBookmarked(false);
      }
      if (type == "collection") {
        const { data, error } = await supabase
          .from("bookmark")
          .delete()
          .match({ user_id: user.id, collection_slug: collection_slug });
        const removedBookmarks = bookmarks.filter(
          (bookmark) => bookmark.collection_slug != id
        );
        setBookmarks(removedBookmarks);
        setBookmarked(false);
      }
    }
  };
  const checkBookmarked = () => {
    let filterdBookmarkes = [];
    if (type == "creator") {
      filterdBookmarkes = bookmarks.filter(
        (bookmark) => bookmark.creator_id === id
      );
    }
    if (type == "collection") {
      filterdBookmarkes = bookmarks.filter(
        (bookmark) => bookmark.collection_slug === id
      );
    }
    if (filterdBookmarkes.length > 0) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  };
  useEffect(() => {
    checkBookmarked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarks, id]);
  return (
    <div className="flex justify-center gap-3">
      <div className="flex items-center gap-1">
        {bookmarked ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (bookmarked) {
                removeBookmarkHandler(e);
              } else {
                addBookmarkHandler(e);
              }
            }}
            className=""
          >
            <FaBookmark className="text-xl text-fuchsia-500 opacity-90" />
            {/* <AiFillHeart className="text-lg text-pink-500 opacity-90" /> */}
          </button>
        ) : (
          <button
            onClick={(e) => {
              addBookmarkHandler(e);
            }}
            className=""
          >
            <FiBookmark className="text-xl text-white opacity-30" />
            {/* <AiOutlineHeart className="text-lg text-white opacity-30" /> */}
          </button>
        )}
      </div>
    </div>
  );
};

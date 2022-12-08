import { useContext, useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";

import { AuthContext } from "@/contexts/AuthContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { supabase } from "@/libs/supabase";

type Props = {
  id: string;
  type: string;
};
export const BookmarkButton = ({ id, type }: Props) => {
  const { bookmarks, setBookmarks, user } = useContext(AuthContext);
  const { setLoginModal } = useContext(UtilitiesContext);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const creator_id = type == "creator" && id;
  const collection_slug = type == "collection" && id;

  const addBookmarkHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (user) {
      const checkBookmarked = bookmarks.filter((bookmark) => {
        return bookmark.creator_username == id;
      });
      if (checkBookmarked.length == 0 && supabase) {
        const { data } = await supabase.from("bookmarks").insert([
          {
            collection_slug: collection_slug,
            created_at: new Date(),
            creator_id: creator_id,
            user_id: user.id,
          },
        ]);
        data && setBookmarks([...bookmarks, ...data]);
        setBookmarked(true);
      }
    } else {
      setLoginModal(true);
    }
  };
  const removeBookmarkHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (user) {
      if (type == "creator" && supabase) {
        await supabase.from("bookmarks").delete().match({ creator_id: creator_id, user_id: user.id });
        const removedBookmarks = bookmarks.filter((bookmark) => {
          return bookmark.creator_username != creator_id;
        });
        setBookmarks(removedBookmarks);
        setBookmarked(false);
      }
      if (type == "collection" && supabase) {
        await supabase.from("bookmark").delete().match({ collection_slug: collection_slug, user_id: user.id });
        const removedBookmarks = bookmarks.filter((bookmark) => {
          return bookmark.collection_slug != id;
        });
        setBookmarks(removedBookmarks);
        setBookmarked(false);
      }
    }
  };
  const checkBookmarked = () => {
    let filterdBookmarkes = [];
    if (type == "creator") {
      filterdBookmarkes = bookmarks.filter((bookmark) => {
        return bookmark.creator_username === id;
      });
    }
    if (type == "collection") {
      filterdBookmarkes = bookmarks.filter((bookmark) => {
        return bookmark.collection_slug === id;
      });
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
          </button>
        ) : (
          <button
            onClick={(e) => {
              addBookmarkHandler(e);
            }}
            className=""
          >
            <FiBookmark className="text-xl text-white opacity-30" />
          </button>
        )}
      </div>
    </div>
  );
};

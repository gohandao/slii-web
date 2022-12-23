import type { FC } from "react";
import { useEffect } from "react";
import { FaBookmark } from "react-icons/fa";

import { useHandleBookmark } from "@/utilities/hooks/useHandleBookmark";

type Props = {
  id: string;
  type: string;
};
export const BookmarkButton: FC<Props> = ({ id, type }) => {
  const { addBookmark, bookmarks, checkBookmarked, isBookmarked, removeBookmark } = useHandleBookmark(id, type);

  useEffect(() => {
    checkBookmarked();
  }, [bookmarks, checkBookmarked, id]);

  const bookmarkedColor = isBookmarked ? "text-fuchsia-500 opacity-90" : "text-white opacity-30";

  return (
    <div className="flex justify-center gap-3">
      <div className="flex items-center gap-1">
        <button
          onClick={(e) => {
            e.preventDefault();
            isBookmarked ? removeBookmark() : addBookmark();
          }}
        >
          <FaBookmark className={`text-xl ${bookmarkedColor}`} />
        </button>
      </div>
    </div>
  );
};

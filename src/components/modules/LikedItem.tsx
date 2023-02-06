import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";

import { useHandleReaction } from "@/hooks/useHandleReaction";

type Props = {
  id: string;
  image?: string;
  label: string;
  path: string;
  type: string;
};
type ButtonProps = {
  customClass?: string;
  icon: any;
  onClickHandler: () => void;
  status?: boolean;
};
export const LikedItem = ({ id, image, label, path, type }: Props) => {
  const [checkUpvoted, setCheckUpvoted] = useState<boolean | undefined>(false);
  const [checkBookmaked, setCheckBookmarked] = useState<boolean | undefined>(false);
  const { addReaction, checkReaction, removeReaction } = useHandleReaction();
  const image_src = image ? image : "/dummy-nft.jpg";
  const creator_username = type == "creator" ? id : undefined;
  const collection_slug = type == "collection" ? id : undefined;

  // const checkUpvoted = checkReaction({
  //   collection_slug: collection_slug,
  //   creator_username: creator_username,
  //   table: "upvotes",
  // });
  // const checkBookmaked = checkReaction({
  //   collection_slug: collection_slug,
  //   creator_username: creator_username,
  //   table: "bookmarks",
  // });
  useEffect(() => {
    setCheckUpvoted(
      checkReaction({
        collection_slug: collection_slug,
        creator_username: creator_username,
        table: "upvotes",
      })
    );
    setCheckBookmarked(
      checkReaction({
        collection_slug: collection_slug,
        creator_username: creator_username,
        table: "bookmarks",
      })
    );
  }, [checkReaction, collection_slug, creator_username]);

  const Button = ({ customClass, icon, onClickHandler }: ButtonProps) => {
    return (
      <button
        className={`--backdrop-blur-sm flex w-full items-center justify-center bg-black bg-opacity-80 py-2 text-white opacity-80 ${customClass}`}
        onClick={(e) => {
          e.preventDefault();
          onClickHandler();
        }}
      >
        {icon}
      </button>
    );
  };
  return (
    <Link href={path} className="relative flex w-full flex-col overflow-hidden rounded-lg bg-gray-200 shadow-xl">
      <p className="absolute left-1 top-1 z-10  rounded-full bg-black px-3 py-[2px] text-sm capitalize text-white opacity-50">
        {label}
      </p>
      <div className="relative flex pt-[100%]">
        <Image src={image_src} alt="" fill sizes="100px" quality={5} className="w-full" />
      </div>
      <div className="absolute left-0 bottom-0 z-20 flex w-full rounded-b-lg">
        <Button
          customClass={"border-r border-dotted border-gray-700"}
          icon={<AiFillHeart className={`${checkUpvoted && "text-pink-500"}`} />}
          onClickHandler={() => {
            !checkUpvoted
              ? addReaction({
                  collection_slug: collection_slug,
                  creator_username: creator_username,
                  table: "upvotes",
                })
              : removeReaction({
                  collection_slug: collection_slug,
                  creator_username: creator_username,
                  table: "upvotes",
                });
            setCheckUpvoted(!checkUpvoted);
          }}
        />
        <Button
          icon={<AiFillStar className={`${checkBookmaked && "text-yellow-300"}`} />}
          onClickHandler={() => {
            !checkBookmaked
              ? addReaction({
                  collection_slug: collection_slug,
                  creator_username: creator_username,
                  table: "bookmarks",
                })
              : removeReaction({
                  collection_slug: collection_slug,
                  creator_username: creator_username,
                  table: "bookmarks",
                });
            setCheckBookmarked(!checkBookmaked);
          }}
        />
      </div>
    </Link>
  );
};

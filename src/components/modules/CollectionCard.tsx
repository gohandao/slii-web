import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdVerified } from "react-icons/md";

import { BookmarkButton } from "@/components/elements/BookmarkButton";
import { Hyphen } from "@/components/elements/Hyphen";
import { IconEth } from "@/components/elements/IconEth";
import { UpvoteButton } from "@/components/elements/UpvoteButton";
import { abbreviateNumber } from "@/utilities/abbreviateNumber";

export const CollectionCard = ({ collection, index }: any) => {
  const router = useRouter();
  const { screen } = router.query;

  return (
    <Link href={`/collection/${collection.slug}`} key={index} legacyBehavior>
      <a className="relative block min-w-[320px] transform overflow-hidden rounded-lg border border-gray-700 bg-gray-800 px-1 pt-[3px] pb-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg md:min-w-[360px]">
        <div className={`relative h-16 w-full overflow-hidden rounded bg-gray-900 opacity-40`}>
          {collection.banner_image_url && (
            <Image
              src={collection.banner_image_url}
              alt=""
              quality={10}
              fill
              sizes="300px"
              style={{
                objectFit: "cover",
              }}
            />
          )}
        </div>
        <div className="-mt-[50px] px-3 md:px-5">
          <div
            className={`relative mb-1 h-16 w-16 overflow-hidden rounded-lg border-[5px] border-gray-700 bg-gray-700 object-cover ${
              screen != "modal" && "md:h-[72px] md:w-[72px] "
            }`}
          >
            {collection.image_url && (
              <Image
                src={collection.image_url}
                alt=""
                quality={10}
                fill
                sizes="200px"
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <div className="relative -mr-1 mb-1 flex max-w-full items-center justify-between">
            <p className="ellipsis  ellipsis min-w-[0] max-w-full items-center pr-3 font-bold text-gray-100">
              {collection.name}
              {collection.safelist_request_status == "verified" && (
                <MdVerified className="ml-2 inline text-sm text-gray-500" />
              )}
            </p>
            <div className="flex gap-2">
              <BookmarkButton id={collection.slug} type="collection" />
              <div className="-mr-[2px]">
                <UpvoteButton
                  property="simple"
                  type="collection"
                  id={collection.slug}
                  count={collection.upvotes_count}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="">
              <p className="text-sm font-bold text-gray-500">Floor Proce</p>
              <div className="-ml-1 flex items-center gap-1 font-bold text-gray-400">
                {collection.symbols && collection.symbols[0] == "ETH" && <IconEth />}
                {collection && collection.floor_price > 0 ? abbreviateNumber(collection.floor_price) : <Hyphen />}
              </div>
            </div>
            <div className="">
              <p className="text-sm font-bold text-gray-500">Total Volume</p>
              <div className="-ml-1 flex items-center gap-1 font-bold text-gray-400">
                {collection.symbols && collection.symbols[0] == "ETH" && <IconEth />}
                {collection && collection.total_volume > 0 ? abbreviateNumber(collection.total_volume) : <Hyphen />}
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

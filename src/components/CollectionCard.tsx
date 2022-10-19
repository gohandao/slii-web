import React from "react";
import Link from "next/link";
import Image from "next/image";
import Moment from "react-moment";
import { abbreviateNumber } from "@/utilities/abbreviateNumber";
import { MdVerified } from "react-icons/md";
import { VoteButton } from "./VoteButton";
import { BookmarkButton } from "./BookmarkButton";

type StatsProps = {
  title: string;
  element: any;
};
export const CollectionCard = ({ username, collection, index }: any) => {
  const Stats = ({ title, element }: StatsProps) => {
    return (
      <div className="inline-flex min-w-[120px] rounded border-2 border-gray-100 bg-gray-50 flex-col p-2">
        <p className="text-xs font-medium tracking-wide text-gray-400">
          {title}
        </p>
        <p className="mt-1 text-sm font-bold text-gray-800">{element}</p>
      </div>
    );
  };
  const unit =
    collection.payment_tokens && " " + collection.payment_tokens[0].symbol;

  const description = collection.description;
  const slicedDescription =
    description && description.length > 80
      ? description.slice(0, 80) + "…"
      : description;

  const Hyphen = () => {
    return <span className="text-gray-400">-</span>;
  };
  const EthIcon = () => {
    return (
      <div className="w-4 flex items-center">
        <Image src="/icon-eth.svg" width={16} height={16} alt="" className="" />
      </div>
    );
  };
  return (
    <Link href={`/collection/${collection.slug}`} key={index}>
      <a className="block relative w-full overflow-hidden bg-gray-800 border border-gray-700 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 max-w-[480px] px-1 pt-1 pb-4">
        <div className="relative overflow-hidden h-20 md:h-24 w-full bg-gray-900 rounded">
          {collection.banner_image_url && (
            <Image
              //@ts-ignore
              src={collection.banner_image_url}
              layout="fill"
              objectFit="cover"
              alt=""
            />
          )}
        </div>
        <div className="px-3 md:px-5 -mt-[50px]">
          <div className="relative object-cover w-20 h-20 rounded-lg overflow-hidden mb-1 border-[5px] border-gray-700 bg-gray-700">
            {collection.image_url && (
              <Image
                //@ts-ignore
                src={collection.image_url}
                layout="fill"
                objectFit="cover"
                alt=""
              />
            )}
          </div>
          <div className="flex items-center relative justify-between -mr-1 max-w-full mb-1">
            <p className="items-center  font-bold ellipsis text-gray-100 ellipsis max-w-full min-w-[0] pr-3">
              {collection.name}
              {collection.safelist_request_status == "verified" && (
                <MdVerified className="text-gray-500 text-sm inline ml-2" />
              )}
            </p>
            <div className="flex gap-2">
              <BookmarkButton
                id={collection.slug}
                type="collection"
                property="simple"
              />
              <div className="-mr-[2px]">
                <VoteButton
                  property="simple"
                  type="collection"
                  id={collection.slug}
                  count={collection.upvotes_count}
                />
                {/*<AiOutlineHeart className=" text-gray-400 opacity-50" />*/}
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="">
              <p className="text-gray-500 text-sm font-bold">Floor Proce</p>
              <div className="flex items-center gap-1 text-gray-400 font-bold -ml-1">
                {collection.payment_tokens &&
                  collection.payment_tokens[0].symbol == "ETH" && <EthIcon />}
                {collection.stats && collection.stats.floor_price > 0 ? (
                  abbreviateNumber(collection.stats.floor_price)
                ) : (
                  <Hyphen />
                )}
              </div>
            </div>
            <div className="">
              <p className="text-gray-500 text-sm font-bold">Total Proce</p>
              <div className="flex items-center gap-1 text-gray-400 font-bold -ml-1">
                {collection.payment_tokens &&
                  collection.payment_tokens[0].symbol == "ETH" && <EthIcon />}
                {collection.stats && collection.stats.total_volume > 0 ? (
                  abbreviateNumber(collection.stats.total_volume)
                ) : (
                  <Hyphen />
                )}
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

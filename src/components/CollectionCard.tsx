import React from "react";
import Link from "next/link";
import Image from "next/image";
import Moment from "react-moment";
import { abbreviateNumber } from "@/utilities/abbreviateNumber";
import { MdVerified } from "react-icons/md";
import { VoteButton } from "./VoteButton";
import { BookmarkButton } from "./BookmarkButton";
import { useRouter } from "next/router";

type StatsProps = {
  title: string;
  element: any;
};
export const CollectionCard = ({ username, collection, index }: any) => {
  const router = useRouter();
  const { screen } = router.query;
  const Stats = ({ title, element }: StatsProps) => {
    return (
      <div className="inline-flex min-w-[120px] flex-col rounded border-2 border-gray-100 bg-gray-50 p-2">
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
      <div className="flex w-4 items-center">
        <Image
          src="/icon-eth.svg"
          width={16}
          height={16}
          alt=""
          className=""
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
    );
  };
  return (
    <Link href={`/collection/${collection.slug}`} key={index} legacyBehavior>
      <a className="relative block w-full max-w-[480px] transform overflow-hidden rounded-lg border border-gray-700 bg-gray-800 px-1 pt-1 pb-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <div
          className={`mw-full relative h-20 overflow-hidden rounded bg-gray-900 opacity-40 ${
            screen != "modal" && "lg:h-24 "
          }`}
        >
          {collection.banner_image_url && (
            <Image
              //@ts-ignore
              src={collection.banner_image_url}
              alt=""
              quality={10}
              fill
              sizes="100vw"
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
                //@ts-ignore
                src={collection.image_url}
                alt=""
                quality={10}
                fill
                sizes="100vw"
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
              <p className="text-sm font-bold text-gray-500">Floor Proce</p>
              <div className="-ml-1 flex items-center gap-1 font-bold text-gray-400">
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
              <p className="text-sm font-bold text-gray-500">Total Volume</p>
              <div className="-ml-1 flex items-center gap-1 font-bold text-gray-400">
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

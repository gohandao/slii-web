import { JP } from "country-flag-icons/react/3x2";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { IoMdListBox } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import Moment from "react-moment";

import { BookmarkButton } from "@/components/elements/BookmarkButton";
import { Hyphen } from "@/components/elements/Hyphen";
import { IconEth } from "@/components/elements/IconEth";
import { UpvoteButton } from "@/components/elements/UpvoteButton";
import { ListSocial } from "@/components/modules/ListSocial";
import { ListStats } from "@/components/modules/ListStats";
import { abbreviateNumber } from "@/utilities/abbreviateNumber";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";

type Props = {
  collections: any[];
  limit?: number;
};
export const CollectionList: FC<Props> = ({ collections, limit }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { order, page, search, sort, term, type } = router.query;
  const currentPage = page ? Number(page) : 1;

  return (
    <div className="grid w-full grid-cols-1 justify-center gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {collections.length > 0 &&
        collections.map((collection, index) => {
          const new_query = removeUndefinedObject({
            order: order,
            page: page,
            search: search,
            slug: collection.slug,
            sort: sort,
            term: term,
            type: type,
          });
          const new_pathname = currentPath == "/collections" ? `/collections` : `/collection/${collection.slug}`;
          return (
            <div
              className="relative flex transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              key={index}
            >
              <Link
                href={{
                  pathname: new_pathname,
                  query: new_query,
                }}
                as={`/collection/${collection.slug}`}
                legacyBehavior
              >
                <a className="relative flex w-full flex-col items-center overflow-hidden rounded-lg border border-gray-800 bg-gray-800 pb-2 shadow-lg">
                  <div className="absolute top-0 right-0 z-20  flex items-center gap-1 text-gray-400 opacity-60">
                    <p className="mt-[2px] text-center text-xs text-gray-400">
                      {collection && collection.num_owners} /{collection && collection.total_supply}
                    </p>
                    <div className="flex items-center justify-center gap-2 rounded-bl-lg bg-gray-900 py-[2px] px-2 text-xs capitalize md:text-xs">
                      {collection.type}
                      <JP title="Japan" className="h-3 rounded-sm" />
                    </div>
                  </div>
                  <div className="absolute -left-[1px] -top-[1px] z-10 opacity-60">
                    <div className="lt-triangle"></div>
                  </div>
                  <div className="absolute left-[6px] top-1 z-20 flex">
                    <p className="text-xs text-gray-500">
                      # {limit ? index + 1 + (currentPage - 1) * limit : index + 1}
                    </p>
                  </div>
                  <div className="relative flex h-20 w-full overflow-hidden border-4 border-transparent opacity-[30%]">
                    <div className="relative h-full w-full rounded bg-gray-500">
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
                  </div>
                  <div className="w-full px-4">
                    <div className="flex w-full items-center gap-2">
                      <div className="relative -mt-[60px]">
                        <div className="relative z-10 flex h-[70px] w-[70px] min-w-[70px] items-center justify-center overflow-hidden rounded  border-[5px] border-gray-700 bg-gray-600">
                          {collection.image_url && (
                            <Image
                              src={collection.image_url}
                              alt=""
                              quality={10}
                              fill
                              sizes="100px"
                              style={{
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>
                        {(collection.twitter_followers || collection.discord_members) && (
                          <div className="absolute bottom-[22px] left-full z-10 ml-2 flex w-full flex-col items-start gap-0">
                            <div className="flex gap-2 rounded-full bg-gray-900 px-3 py-[2px] opacity-80">
                              {collection.twitter_followers && (
                                <ListSocial icon={<BsTwitter />} text={collection.twitter_followers} />
                              )}
                              {collection.discord_members && (
                                <ListSocial icon={<FaDiscord />} text={collection.discord_members} />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full min-w-[0px] max-w-full  flex-1 flex-col gap-1">
                      <div className="relative -mr-1 flex max-w-full items-center justify-between pt-[6px]">
                        <h3 className="ellipsis ellipsis  min-w-[0] max-w-full items-center pr-3 text-sm font-bold text-gray-100">
                          {collection.name}
                          {collection.safelist_request_status == "verified" && (
                            <MdVerified className="-mt-[2px] ml-2 inline-block text-gray-500" />
                          )}
                        </h3>
                        <div className="flex gap-2">
                          <BookmarkButton id={collection.slug} type="collection" />
                          <div className="-mr-[2px]">
                            <UpvoteButton
                              property="simple"
                              type="collection"
                              id={collection.slug}
                              count={collection.upvotes_count_function}
                            />
                            {/*<AiOutlineHeart className=" text-gray-400 opacity-50" />*/}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-end justify-between gap-5">
                        <div className="flex gap-5">
                          <ListStats
                            label="Floor Price"
                            field={
                              <>
                                {collection.symbols && collection.symbols[0] == "ETH" && <IconEth />}
                                {collection && collection.floor_price > 0 ? (
                                  abbreviateNumber(collection.floor_price)
                                ) : (
                                  <Hyphen />
                                )}
                              </>
                            }
                          />
                          <ListStats
                            label={
                              <>
                                {term == "all" || !term
                                  ? "Total"
                                  : term == "24h"
                                  ? "24h"
                                  : term == "7d"
                                  ? "7d"
                                  : term == "30d" && "30d"}{" "}
                                Volume
                              </>
                            }
                            field={
                              <>
                                {term == "all" || (!term && collection && collection.total_volume > 0) ? (
                                  <>
                                    {collection.symbols && collection.symbols[0] == "ETH" && <IconEth />}
                                    {abbreviateNumber(collection.total_volume)}
                                  </>
                                ) : term == "24h" && collection.one_day_volume > 0 ? (
                                  <>
                                    {collection.symbols && collection.symbols[0] == "ETH" && <IconEth />}
                                    {abbreviateNumber(collection.one_day_volume)}
                                  </>
                                ) : term == "7d" && collection.seven_day_volume > 0 ? (
                                  <>
                                    {collection.symbols && collection.symbols[0] == "ETH" && <IconEth />}
                                    {abbreviateNumber(collection.seven_day_volume)}
                                  </>
                                ) : term == "30d" && collection.thirty_day_volume > 0 ? (
                                  <>
                                    {collection.symbols && collection.symbols[0] == "ETH" && <IconEth />}
                                    {abbreviateNumber(collection.thirty_day_volume)}
                                  </>
                                ) : (
                                  <Hyphen />
                                )}
                              </>
                            }
                          />
                        </div>
                        {collection.listed_at && (
                          <ListSocial
                            icon={<IoMdListBox />}
                            text={<Moment format="DD.MM.YYYY">{collection.listed_at}</Moment>}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

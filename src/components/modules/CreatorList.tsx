// kata: creatorのコンポーネントのひとつ
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { IoMdListBox } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import Moment from "react-moment";

import { BookmarkButton } from "@/components/elements/BookmarkButton";
import { UpvoteButton } from "@/components/elements/UpvoteButton";
import { ListSocial } from "@/components/modules/ListSocial";
import type { Creator } from "@/types/creator";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";

type Props = {
  creators: Creator[];
  limit?: number;
};
export const CreatorList: FC<Props> = ({ creators, limit }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { order, page, search, sort, term, type } = router.query;
  const currentPage = page ? Number(page) : 1;
  const [currentCreators, setCurrentCreators] = useState<Creator[]>(creators);
  useEffect(() => {
    setCurrentCreators(creators);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creators]);

  return (
    <div className="grid w-full grid-cols-2 justify-center gap-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
      {currentCreators.length > 0 &&
        currentCreators.map((creator, index) => {
          const new_query = removeUndefinedObject({
            order: order,
            page: page,
            search: search,
            sort: sort,
            term: term,
            type: type,
            username: creator.username,
          });
          const new_pathname = currentPath == "/" ? `/` : `/creator/${creator.username}`;
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
                as={`/creator/${creator.username}`}
                legacyBehavior
              >
                <a className="relative flex w-full flex-col items-center overflow-hidden rounded-lg border border-gray-800 bg-gray-800 pb-2 shadow-lg">
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
                      {creator.background && creator.background != "false" && (
                        <Image
                          src={creator.background}
                          alt=""
                          loading="lazy"
                          className="rounded"
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
                        <div className="relative z-10 -ml-[5px] flex h-[70px] w-[70px] min-w-[70px] items-center justify-center overflow-hidden rounded-full border-[5px] border-gray-700 bg-gray-100">
                          {creator.avatar && (
                            <Image
                              src={creator.avatar}
                              width={80}
                              height={80}
                              alt=""
                              quality={10}
                              sizes="100px"
                              style={{
                                height: "auto",
                                maxWidth: "100%",
                                objectFit: "cover",
                              }}
                              onError={(e) => {
                                e.currentTarget.src = `https://placehold.jp/42/333/ffffff/150x150.png?text=${creator.username.charAt(
                                  0
                                )}`;
                              }}
                            />
                          )}
                        </div>
                        {(creator.twitter_followers || creator.discord_members) && (
                          <div className="absolute bottom-[22px] left-full z-10 ml-2 flex items-center gap-1">
                            <div className="flex gap-2 rounded-full bg-gray-900 px-3 py-[2px] opacity-80">
                              {creator.twitter_followers && (
                                <ListSocial icon={<BsTwitter />} text={creator.twitter_followers} />
                              )}
                              {creator.discord_members && (
                                <ListSocial icon={<FaDiscord />} text={creator.discord_members} />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full min-w-[0px] max-w-full  flex-1 flex-col gap-1">
                      <div className="relative flex max-w-full items-center justify-between pt-1">
                        <h3 className="ellipsis min-w-[0]  max-w-full items-center pr-3 text-sm font-bold text-gray-100">
                          {creator.username}
                          {creator.verified && <MdVerified className="-mt-[2px] ml-2 inline-block text-gray-500" />}
                        </h3>
                        <div className="flex gap-2">
                          <BookmarkButton id={creator.username} type="creator" />
                          <div className="-mr-[2px]">
                            <UpvoteButton
                              property="simple"
                              type="creator"
                              id={creator.username}
                              count={creator.upvotes_count ? creator.upvotes_count : 0}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-end justify-end gap-5">
                        {creator.listed_at && (
                          <ListSocial
                            icon={<IoMdListBox />}
                            text={<Moment format="DD.MM.YYYY">{creator.listed_at}</Moment>}
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

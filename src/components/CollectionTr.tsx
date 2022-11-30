import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { MdVerified } from "react-icons/md";
// utilities
import { abbreviateNumber } from "@/utilities/abbreviateNumber";
// utilities
import { BookmarkButton } from "@/components/BookmarkButton";
import { UpvoteButton } from "@/components/UpvoteButton";
import { Hyphen } from "@/components/Hyphen";
import { IconEth } from "@/components/IconEth";

type Props = {
  children: ReactNode;
};
export const CollectionTr = ({ item, index, limit }: any) => {
  const router = useRouter();
  const { order, sort, term, page } = router.query;
  const currentPage = page ? Number(page) : 1;

  let changeClass;
  switch (term) {
    case "24h":
      if (item.stats.one_day_change > 0) {
        changeClass = "text-green-500";
      } else if (item.stats.one_day_change < 0) {
        changeClass = "text-red-500";
      }
      break;
    case "7d":
      if (item.stats.seven_day_change > 0) {
        changeClass = "text-green-500";
      } else if (item.stats.seven_day_change < 0) {
        changeClass = "text-red-500";
      }
      break;
    case "30d":
      if (item.stats.thirty_day_change > 0) {
        changeClass = "text-green-500";
      } else if (item.stats.thirty_day_change < 0) {
        changeClass = "text-red-500";
      }
      break;
  }

  const Td = ({ children }: Props) => {
    return (
      <td
        scope="col"
        className="whitespace-nowrap px-3 py-4 text-right text-sm font-medium text-gray-100 sm:px-6"
      >
        {children}
      </td>
    );
  };

  return (
    <>
      {item && item.creator_id && (
        <tr key={item.slug} className="even:bg-gray-900">
          <td scope="col" className="">
            <div className="item-center -ml-[2px] flex w-7 rotate-90 justify-center whitespace-nowrap text-sm text-gray-500">
              # {limit ? index + 1 + (currentPage - 1) * limit : index + 1}{" "}
            </div>
          </td>
          <td className="relative min-w-[240px] py-4 pr-3">
            <Link href={`/collection/${item.slug}`} legacyBehavior>
              <a className="relative block">
                <div className="custom-tdbg absolute left-0 right-0">
                  {item.banner_image_url && (
                    <Image
                      //@ts-ignore
                      src={item.banner_image_url}
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
                <div className="relative z-10 flex items-center">
                  <div className="relative h-[46px] w-[46px] overflow-hidden rounded border-[3px] border-gray-700 bg-gray-600">
                    {item.image_url && (
                      <Image
                        //@ts-ignore
                        src={item.image_url}
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
                  <div className="ml-4 grid">
                    <div className="flex w-[200px] items-center justify-between md:w-[280px]">
                      <p className="ellipsis min-w-[0] max-w-full items-center pr-2 pr-2 text-base font-bold text-gray-100">
                        {item.name}
                        {item.safelist_request_status == "verified" && (
                          <MdVerified className="-mt-[2px] ml-2 inline-block text-gray-500" />
                        )}
                      </p>
                      <div className="-mr-1">
                        <BookmarkButton id={item.slug} type="collection" />
                        {/* <AiOutlineHeart className=" text-gray-400 opacity-50" /> */}
                      </div>
                    </div>
                    <p className="ellipsis pr-3 text-sm text-gray-500">
                      {item.creator_id}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </td>
          {/*upvote*/}
          <Td>
            {item.slug ? (
              <UpvoteButton
                id={item.slug}
                type="collection"
                property="simple"
                count={item.upvotes_count}
              />
            ) : (
              <Hyphen />
            )}
          </Td>
          {/*twitter*/}
          <Td>
            {item.twitter_followers ? (
              <span className="text-blue-400">{item.twitter_followers}</span>
            ) : (
              <Hyphen />
            )}
          </Td>
          {/*discord*/}
          <Td>
            {item.discord_members ? (
              <span className="text-violet-400">{item.discord_members}</span>
            ) : (
              <Hyphen />
            )}
          </Td>
          {/*floor_price*/}
          <Td>
            <div className="item-center flex justify-start gap-1">
              {item.payment_tokens &&
                item.payment_tokens[0].symbol == "ETH" && <IconEth />}
              {item.stats && item.stats.floor_price > 0 ? (
                abbreviateNumber(item.stats.floor_price)
              ) : (
                <Hyphen />
              )}
            </div>
          </Td>
          {/*total_volume*/}
          <Td>
            <div className="item-center flex justify-start gap-1">
              {term == "all" ||
              (!term && item.stats && item.stats.total_volume > 0) ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <IconEth />}
                  {abbreviateNumber(item.stats.total_volume)}
                </>
              ) : term == "1h" && item.stats.one_hour_volume > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <IconEth />}
                  {abbreviateNumber(item.stats.one_hour_volume)}
                </>
              ) : term == "6h" && item.stats.six_hour_volume > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <IconEth />}
                  {abbreviateNumber(item.stats.six_hour_volume)}
                </>
              ) : term == "24h" && item.stats.one_day_volume > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <IconEth />}
                  {abbreviateNumber(item.stats.one_day_volume)}
                </>
              ) : term == "7d" && item.stats.seven_day_volume > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <IconEth />}
                  {abbreviateNumber(item.stats.seven_day_volume)}
                </>
              ) : term == "30d" && item.stats.thirty_day_volume > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <IconEth />}
                  {abbreviateNumber(item.stats.thirty_day_volume)}
                </>
              ) : (
                <Hyphen />
              )}
            </div>
          </Td>
          {/*average_price*/}
          <Td>
            <div className="item-center flex justify-start gap-1">
              {term == "all" ||
              (!term && item.stats && item.stats.average_price > 0) ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <IconEth />}
                  {abbreviateNumber(item.stats.average_price)}
                </>
              ) : term == "1h" && item.stats.one_hour_average_price > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <IconEth />}
                  {abbreviateNumber(item.stats.one_hour_average_price)}
                </>
              ) : term == "6h" && item.stats.six_hour_average_price > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <IconEth />}
                  {abbreviateNumber(item.stats.six_hour_average_price)}
                </>
              ) : term == "24h" && item.stats.one_day_average_price > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <IconEth />}
                  {abbreviateNumber(item.stats.one_day_average_price)}
                </>
              ) : term == "7d" && item.stats.seven_day_average_price > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <IconEth />}
                  {abbreviateNumber(item.stats.seven_day_average_price)}
                </>
              ) : term == "30d" && item.stats.thirty_day_average_price > 0 ? (
                <>
                  {item.payment_tokens &&
                    item.payment_tokens[0].symbol == "ETH" && <IconEth />}
                  {abbreviateNumber(item.stats.thirty_day_average_price)}
                </>
              ) : (
                <Hyphen />
              )}
            </div>
          </Td>
          {/*change*/}
          <Td>
            <span className={`${changeClass}`}>
              {term != "all" &&
              term &&
              item.stats &&
              term == "24h" &&
              item.stats.one_day_change ? (
                (item.stats.one_day_change * 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"
              ) : term == "1h" && item.stats.one_hour_change ? (
                (item.stats.one_hour_change * 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"
              ) : term == "6h" && item.stats.six_hour_change ? (
                (item.stats.six_hour_change * 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"
              ) : term == "7d" && item.stats.seven_day_change ? (
                (item.stats.seven_day_change * 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"
              ) : term == "30d" && item.stats.thirty_day_change ? (
                (item.stats.thirty_day_change * 100).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + "%"
              ) : (
                <Hyphen />
              )}
            </span>
          </Td>
          {/*sales*/}
          <Td>
            {term == "all" ||
            (!term && item.stats && item.stats.total_sales > 0) ? (
              abbreviateNumber(item.stats.total_sales, true)
            ) : term == "24h" && item.stats.one_day_sales > 0 ? (
              abbreviateNumber(item.stats.one_day_sales, true)
            ) : term == "7d" && item.stats.seven_day_sales > 0 ? (
              abbreviateNumber(item.stats.seven_day_sales, true)
            ) : term == "30d" && item.stats.thirty_day_sales > 0 ? (
              abbreviateNumber(item.stats.thirty_day_sales, true)
            ) : (
              <Hyphen />
            )}
          </Td>
          {/*owners*/}
          <Td>{item.stats && item.stats.num_owners}</Td>
          {/*items*/}
          <Td>{item.stats && item.stats.total_supply}</Td>
        </tr>
      )}
    </>
  );
};

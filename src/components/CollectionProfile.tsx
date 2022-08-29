import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { AiOutlineClockCircle } from "react-icons/ai";
import { VscChecklist } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa";

import { CreatorsContext } from "@/contexts/CreatorsContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";

import { ProfileLinks } from "@/components/ProfileLinks";

import { Creator } from "@/types/creator";
import Moment from "react-moment";
import { abbreviateNumber } from "@/utilities/abbreviateNumber";
import { Label } from "@/components/Label";
import { MdVerified } from "react-icons/md";
import { ProfileDropdown } from "@/components/ProfileDropdown";

type StatsProps = {
  title: string;
  element: any;
  unit?: string;
};
type Props = {
  collection: Creator;
};

export const CollectionProfile = ({ collection }: any) => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  //console.log("collection");
  //console.log(collection);
  const collections = useContext(CollectionsContext);
  const creators = useContext(CreatorsContext);
  const [creator, setCreator] = useState<Creator>();
  const [filteredCollection, setFilteredCollection] = useState<any>();
  const symbol =
    collection.payment_tokens && collection.payment_tokens[0].symbol;

  const Stats = ({ title, element, unit }: StatsProps) => {
    return (
      <div className="inline-flex min-w-[115px] border-r border-b border-gray-700 bg-gray-800 flex-col p-2">
        <p className="text-xs tracking-wide text-gray-400">{title}</p>
        <div className="mt-1 text-sm font-medium text-gray-100 tracking-wide inline-flex items-center gap-1 justify-center">
          {unit == "ETH" && (
            <div className="-ml-2 flex -mt-[1px]">
              <Image src="/icon-eth.svg" width={16} height={16} alt="" />
            </div>
          )}
          {element}
          {unit != "ETH" && (
            <span className="text-gray-400 text-xs mt-[1px]">{unit}</span>
          )}
        </div>
      </div>
    );
  };
  useEffect(() => {
    if (filteredCollection) {
      //set creator
      const creator_filter = creators.filter(
        (creator) => creator.username === filteredCollection.creator_id
      );
      setCreator(creator_filter[0]);
    }
  }, [filteredCollection]);
  useEffect(() => {
    if (collections) {
      //set collection
      const collection_filter = collections.filter(
        (item) => item.slug === collection.slug
      );
      collection_filter.length > 0 &&
        setFilteredCollection(collection_filter[0]);
    }
  }, [collection, collections]);

  return (
    <section className="w-full">
      <div className="flex relative w-full h-32 md:h-60 overflow-hidden bg-gray-800">
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
      <div className="mx-auto max-w-2xl">
        <div className="relative flex justify-center">
          <div className="relative flex">
            <div className="relative -mt-[60px] rounded border-[5px] border-gray-800 bg-gray-700 overflow-hidden inline-flex items center justify-center z-10 mb-2 w-[110px] h-[110px]">
              {collection.image_url && (
                <Image
                  //@ts-ignore
                  src={collection.image_url}
                  width={100}
                  height={100}
                  objectFit="cover"
                  alt=""
                />
              )}
            </div>
            <div className="flex absolute bottom-6 right-full pr-[10px] rounded-tl-full rounded-bl-full text-sm capitalize flex justify-center items-center">
              <ProfileDropdown dropdown={dropdown} setDropdown={setDropdown} />
            </div>
            {filteredCollection && (
              <p
                className={`absolute bottom-6 left-full -ml-3 bg-yellow-500 text-white pl-5 pr-3 rounded-tr-full rounded-br-full text-sm ${
                  filteredCollection.type == "Handmade"
                    ? "bg-orange-500"
                    : "bg-sky-500"
                }`}
              >
                {filteredCollection.type}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center gap-5 text-center px-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl text-gray-100 font-bold inline justify-center items-center">
              {collection.name}
              {collection.safelist_request_status == "verified" && (
                <MdVerified className="text-gray-500 text-xl inline ml-1" />
              )}
            </h1>
            {creator && (
              <p className="text-xs text-gray-500">
                By{" "}
                <Link href={`/${creator.username}`}>
                  <a className="inline-flex gap-1 items-center">
                    {creator.username}{" "}
                    {creator.verified == true && (
                      <MdVerified className="mt-[2px] text-gray-500" />
                    )}
                  </a>
                </Link>
              </p>
            )}
            <p className="text-gray-100 mt-1 text-justify break-all px-3 text-sm sm:text-base">
              {collection.description}
            </p>
          </div>
          {collection.stats && (
            <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-5 justify-center max-w-md md:max-w-2xl w-full rounded border-l border-t border-gray-700">
              {collection.stats && collection.payment_tokens && (
                <>
                  <Stats
                    title="Floor Price"
                    element={
                      collection.stats.floor_price
                        ? collection.stats.floor_price
                        : "-"
                    }
                    unit={symbol}
                  />
                  <Stats
                    title="Created"
                    element={
                      <Moment format="DD.MM.YYYY">
                        {collection.created_date}
                      </Moment>
                    }
                  />
                  <Stats
                    title="1d Ave."
                    element={
                      collection.stats.one_day_average_price! + 0
                        ? abbreviateNumber(
                            collection.stats.one_day_average_price
                          )
                        : "-"
                    }
                    unit={symbol}
                  />
                  <Stats
                    title="7d Ave."
                    element={abbreviateNumber(
                      collection.stats.seven_day_average_price
                    )}
                    unit={symbol}
                  />
                  <Stats
                    title="30d Ave."
                    element={abbreviateNumber(
                      collection.stats.thirty_day_average_price
                    )}
                    unit={symbol}
                  />
                  <Stats
                    title="Total Volume"
                    element={abbreviateNumber(collection.stats.total_volume)}
                    unit={symbol}
                  />
                  <Stats
                    title="Total Supply"
                    element={collection.stats.total_supply}
                    unit="Items"
                  />
                  <Stats title="Owners" element={collection.stats.num_owners} />
                  <Stats
                    title="Royalty"
                    element={collection.dev_seller_fee_basis_points / 100}
                    unit="%"
                  />
                  <Stats
                    title="Opensea Fees"
                    element={collection.opensea_seller_fee_basis_points / 100}
                    unit="%"
                  />
                </>
              )}
            </div>
          )}
          {filteredCollection && filteredCollection.tags && (
            <div className="flex flex-wrap gap-3">
              {filteredCollection.tags.map((tag: string, index: number) => (
                <Label key={index} name={tag} type="collection" />
              ))}
            </div>
          )}
          {creator && (
            <ProfileLinks
              twitter_id={creator.twitter_id}
              instagram_id={creator.instagram_id}
              discord_url={creator.discord_url}
              website_url={creator.website_url}
              opensea_slug={collection.slug}
            />
          )}
        </div>
      </div>
    </section>
  );
};

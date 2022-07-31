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

type StatsProps = {
  title: string;
  element: any;
};
type Props = {
  collection: Creator;
};

export const CollectionProfile = ({ collection }: any) => {
  const collections = useContext(CollectionsContext);
  const creators = useContext(CreatorsContext);
  const [creator, setCreator] = useState<Creator>();
  const [filteredCollection, setFilteredCollection] = useState<any>("");
  const unit =
    collection.payment_tokens && " " + collection.payment_tokens[0].symbol;
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
      <div className="flex relative w-full h-60 overflow-hidden">
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
      <div className="mx-auto max-w-7xl">
        <div className="-mt-10 rounded border-4 border-white overflow-hidden inline-flex items center justify-center z-10">
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
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold line-clamp-1">
              {collection.name}
            </h1>
            <p className="text-xs text-gray-500">
              {creator && creator.username}
            </p>
            <p className="text-gray-900 mt-1">{collection.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {collection.stats && collection.payment_tokens && (
              <>
                <Stats
                  title="Floor Price"
                  element={collection.stats.floor_price + unit}
                />
                <Stats
                  title="Created"
                  element={
                    <Moment format="YYYY/MM/DD">
                      {collection.created_date}
                    </Moment>
                  }
                />
                <Stats
                  title="Royalty"
                  element={collection.dev_seller_fee_basis_points / 100 + "%"}
                />
                <Stats
                  title="Opensea Fees"
                  element={
                    collection.opensea_seller_fee_basis_points / 100 + "%"
                  }
                />
                <Stats
                  title="Safelist"
                  element={collection.safelist_request_status}
                />
                <Stats title="Owners" element={collection.stats.num_owners} />
                <Stats
                  title="7d Ave."
                  element={
                    abbreviateNumber(collection.stats.seven_day_average_price) +
                    unit
                  }
                />
                <Stats
                  title="3d Ave."
                  element={
                    abbreviateNumber(collection.stats.seven_day_average_price) +
                    unit
                  }
                />
                <Stats
                  title="1d Ave."
                  element={
                    collection.stats.one_day_average_price! + 0
                      ? abbreviateNumber(
                          collection.stats.one_day_average_price
                        ) + unit
                      : "-"
                  }
                />
                <Stats
                  title="Total Volume"
                  element={
                    abbreviateNumber(collection.stats.total_volume) + unit
                  }
                />
                <Stats
                  title="Total Supply"
                  element={
                    abbreviateNumber(collection.stats.total_supply, true) +
                    " NFTs"
                  }
                />
              </>
            )}
          </div>
          {filteredCollection.tags && (
            <div className="flex flex-wrap gap-3">
              {filteredCollection.tags.map((tag: string, index: number) => (
                <p
                  key={index}
                  className="border border-gray-900 rounded-full py-1 px-3 inline-flex text-xs"
                >
                  {tag}
                </p>
              ))}
            </div>
          )}
          {creator && (
            <ProfileLinks
              twitter_id={creator.twitter_id}
              instagram_id={creator.instagram_id}
              discord_url={creator.discord_url}
              website={creator.website}
              opensea_url={creator.username}
            />
          )}
        </div>
      </div>
    </section>
  );
};

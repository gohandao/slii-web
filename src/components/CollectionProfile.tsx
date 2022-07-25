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

import { Creator } from "@/types/creator";

type Props = {
  collection: Creator;
};

export const CollectionProfile = ({ collection }: any) => {
  const collections = useContext(CollectionsContext);
  const creators = useContext(CreatorsContext);
  const [creator, setCreator] = useState<Creator>();
  const [filteredCollection, setFilteredCollection] = useState<any>("");

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
        {collection.featured_image_url && (
          <Image
            //@ts-ignore
            src={collection.featured_image_url}
            layout="fill"
            height="100%"
            objectFit="cover"
            alt=""
          />
        )}
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="-mt-10 rounded-full border-4 border-white overflow-hidden inline-flex items center justify-center z-10">
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
          {collection.tags && (
            <div className="flex flex-wrap gap-3">
              {collection.tags.map((tag: string, index: number) => (
                <p
                  key={index}
                  className="border border-gray-900 rounded-full py-1 px-3 inline-flex text-xs"
                >
                  {tag}
                </p>
              ))}{" "}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

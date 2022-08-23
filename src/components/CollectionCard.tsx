import React from "react";
import Link from "next/link";
import Image from "next/image";
import Moment from "react-moment";
import { abbreviateNumber } from "@/utilities/abbreviateNumber";
import { MdVerified } from "react-icons/md";

type StatsProps = {
  title: string;
  element: any;
};
export const CollectionCard = ({ username, collection }: any) => {
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

  return (
    <Link href={`/${username}/${collection.slug}`}>
      <a className="block relative w-full overflow-hidden bg-gray-800 border border-gray-700 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
        <div className="relative overflow-hidden h-24 md:h-32 w-full bg-gray-900">
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
        <div className="px-6 md:px-10 -mt-10">
          <div className="relative object-cover w-20 h-20 rounded-lg overflow-hidden mb-2 border-[5px] border-gray-800 bg-gray-700">
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
          <p className="text-lg font-bold text-gray-100 mb-1 flex items-center">
            {collection.name}
            {collection.safelist_request_status == "verified" && (
              <MdVerified className="text-gray-500 text-sm inline ml-2" />
            )}
          </p>
          {description && (
            <p className="text-sm text-gray-400 mb-5 text-justify">
              {slicedDescription}
            </p>
          )}
        </div>
      </a>
    </Link>
  );
};

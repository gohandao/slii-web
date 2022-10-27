import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  ReactNode,
} from "react";
import ReactLoading from "react-loading";

import { sortList } from "@/libs/sortList";

import { FaDiscord, FaSort } from "react-icons/fa";
import { CreatorsContext } from "@/contexts/CreatorsContext";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { Card } from "@/components/Card";
import { CollectionTr } from "@/components/CollectionTr";

import { Collection } from "@/types/collection";
import { Creator } from "@/types/creator";
import { BsTwitter } from "react-icons/bs";
import { IconType } from "react-icons";
import { getDiscordMembers } from "@/libs/discord";
import { getTwitterFollowers } from "@/libs/twitter";
import { useRouter } from "next/router";
import { SocialsContext } from "@/contexts/SocialsContext";
import { Th } from "@/components/CollectionTh";

type ThProps = {
  children: ReactNode;
};
type Props = {
  collections: Collection[];
  limit?: number;
};
export const CollectionTable = ({ collections, limit }: Props) => {
  const { creators, socials, OSCollections } = useContext(BaseContext);
  const router = useRouter();

  const { order, sort, term, page, type, search } = router.query;
  const currentPage = page ? Number(page) : 1;

  // const { socials } = useContext(SocialsContext);

  const [loading, setLoading] = useState<boolean>(false);
  //const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [sortedCollections, setSortedCollections] = useState<Collection[]>([]);

  const [test, setTest] = useState(0);
  //②set initial collections data
  const args = {
    property: "collections" as "creators" | "collections",
    list: collections,
    page: currentPage,
    order: order as "desc" | "asc" | undefined,
    sort: sort as string | undefined,
    term: term as "24h" | "7d" | "30d" | "all" | undefined,
    //category: collectionsSort,
    limit: limit,
  };
  useEffect(() => {
    const data = sortList(args);
    setSortedCollections((sortedCollections) => data);
  }, [OSCollections, order, sort, term, page, type, search]);

  return (
    <div className="flex flex-col">
      <div className="-mx-8 -mt-2 overflow-x-auto sm:-mx-6 lg:-mx-8 pb-3 -mb-3 px-8 md:px-6 lg:px-8 hide-scrollbar ">
        <div className="inline-block min-w-full py-2 align-middle ">
          <div className="overflow-hidden">
            <table
              className="table-sort min-w-full border-separate rounded border border-gray-800 bg-gray-800"
              style={{ borderSpacing: "0" }}
            >
              <thead className="bg-gray-900">
                <tr>
                  <Th title="" sort={sort as string} />
                  <Th title="Collection Name" sort={sort as string} />
                  <Th title="Upvotes" sort={sort as string} />
                  <Th title="Twitter" sort={sort as string} />
                  <Th title="Discord" sort={sort as string} />
                  <Th title="Floor Price" sort={sort as string} />
                  <Th title="Volume" sort={sort as string} />
                  <Th title="Ave. Price" sort={sort as string} />
                  <Th title="% Change" sort={sort as string} />
                  <Th title="Sales" sort={sort as string} />
                  <Th title="Owners" sort={sort as string} />
                  <Th title="Items" sort={sort as string} />
                </tr>
              </thead>
              {sortedCollections.length > 0 && (
                <tbody className="border border-gray-200 divide-y divide-gray-200 rounded">
                  {sortedCollections &&
                    sortedCollections.map((item, index) => (
                      <CollectionTr
                        item={item}
                        index={index}
                        limit={limit}
                        key={sort ? (sort as string) + index : index}
                      />
                      //<CollectionTr collection={collection} key={index} />
                    ))}
                </tbody>
              )}
            </table>
            {loading && (
              <div className="py-5 px-5">
                <ReactLoading
                  type="spinningBubbles"
                  color="#fff"
                  height={40}
                  width={40}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

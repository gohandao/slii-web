import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

import { Th } from "@/components/CollectionTh";
import { CollectionTr } from "@/components/CollectionTr";
import { sortList } from "@/libs/sortList";
import type { Collection } from "@/types/collection";

type Props = {
  collections: Collection[];
  limit?: number;
};
export const CollectionTable = ({ collections, limit }: Props) => {
  const router = useRouter();

  const { order, page, search, sort, term, type } = router.query;
  const currentPage = page ? Number(page) : 1;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);
  const [sortedCollections, setSortedCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const args = {
      limit: limit,
      list: collections,
      order: order as "desc" | "asc" | undefined,
      page: currentPage,
      property: "collections" as "creators" | "collections",
      sort: sort as string | undefined,
      term: term as "24h" | "7d" | "30d" | "all" | undefined,
    };
    const data = sortList(args);
    setSortedCollections(() => {
      return data;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collections, order, sort, term, page, type, search]);

  return (
    <div className="flex flex-col">
      <div className="hide-scrollbar -mx-8 -mt-2 -mb-3 overflow-x-auto px-8 pb-3 sm:-mx-6 md:px-6 lg:-mx-8 lg:px-8 ">
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
                <tbody className="divide-y divide-gray-200 rounded border border-gray-200">
                  {sortedCollections &&
                    sortedCollections.map((item, index) => {
                      return (
                        <CollectionTr
                          item={item}
                          index={index}
                          limit={limit}
                          key={sort ? (sort as string) + index : index}
                        />
                      );
                    })}
                </tbody>
              )}
            </table>
            {loading && (
              <div className="py-5 px-5">
                <ReactLoading type="spinningBubbles" color="#fff" height={40} width={40} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useContext, ReactNode } from "react";
import { CreatorsContext } from "@/contexts/CreatorsContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { Card } from "@/components/Card";
import { CollectionTr } from "@/components/CollectionTr";

type Props = {
  children: ReactNode;
};
export const CollectionTable = () => {
  const creators = useContext(CreatorsContext);
  const collections = useContext(CollectionsContext);
  const [list, setList] = useState();

  const Th = ({ children }: Props) => {
    return (
      <th
        scope="col"
        className="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-400 sm:pl-6"
      >
        {children}
      </th>
    );
  };
  return (
    <div className="flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-t border-x border-gray-200 bg-gray-50">
                <tr>
                  <Th>Collection</Th>
                  <Th>Volume</Th>
                  <Th>Floor Price</Th>
                  <Th>24h %</Th>
                  <Th>7d %</Th>
                  <Th>Owners</Th>
                </tr>
              </thead>

              <tbody className="border border-gray-200 divide-y divide-gray-200">
                {collections &&
                  collections.map((collection, index) => (
                    <CollectionTr collection={collection} key={index} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

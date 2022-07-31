import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  ReactNode,
} from "react";
import {FaSort} from "react-icons/fa"
import { CreatorsContext } from "@/contexts/CreatorsContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { Card } from "@/components/Card";
import { CollectionTr } from "@/components/CollectionTr";

import { Collection } from "@/types/collection";

type ThProps = {
  children: ReactNode;
};
type Props = {
  collections: Collection[];
};
export const CollectionTable = ({ collections }: Props) => {
  const creators = useContext(CreatorsContext);
  const { collectionsSort, setCollectionsSort } = useContext(UtilitiesContext);

  const [setup, setSetup] = useState<boolean>(false);

  //const collections = useContext(CollectionsContext);
  const [list, setList] = useState<any[]>([]);

  type ThProps = {
    title: string;
  };
  const Th = ({ title }: ThProps) => {
    return (
      <th
        scope="col"
        className="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-400 sm:pl-6"
      >
        <button
          className="flex gap-2 items-center"
          onClick={() => {
            setCollectionsSort;
          }}
        >
          {title}
          <FaSort className="text-gray-300" />
        </button>
      </th>
    );
  };

  //useStateだと反映されなかったためuseRefを使用
  const newList = useRef<any[]>([]);

  const options = { method: "GET" };
  const getCollectionsData = async() => {
    const getNewData = async () => {
      await Promise.all(collections.map(async (collection, index) => {
        await fetch(
          `https://api.opensea.io/api/v1/collection/${collection.slug}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            let data = response.collection;
            data.creator_id = collection.creator_id;

            const new_data = data;
            const new_list = [...newList.current, new_data];
            newList.current = new_list;
            return
          })
          .catch((err) => console.error(err));
      }));
    }
    list.length == 0 && newList.current.length == 0 && (await getNewData());
    console.log("make true");
    setSetup(true);
  };

  useEffect(() => {
    collections && getCollectionsData();
  }, [collections]);

  useEffect(() => {
    if (setup) {
      const data = Array.from(new Set(newList.current));
      sortList();
      setSetup(false);
    }
  }, [setup]);

  //初期ソート
  const sortList = () => {
    let new_list = [];
    new_list = newList.current.sort(function (a, b) {
      if (a.stats.total_volume < b.stats.total_volume) return 1;
      if (a.stats.total_volume > b.stats.total_volume) return -1;
      return 0;
    });
    newList.current = Array.from(new Set(new_list));
    //setList(new_list);
    setList((list) => newList.current);
  }

  useEffect(() => {
    if (collectionsSort) {
      let new_list = [];
      switch (collectionsSort) {
        case "Total Volume":
          new_list = list.sort(function (a, b) {
            if (a.stats.total_volume < b.stats.total_volume) return 1;
            if (a.stats.total_volume > b.stats.total_volume) return -1;
            return 0;
          });
          newList.current = Array.from(new Set(new_list));
          //setList(new_list);
          setList((list) => newList.current);
          break;
        case "Name":
          new_list = list.sort(function (a, b) {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          });
          newList.current = Array.from(new Set(new_list));
          //setList(new_list);
          setList((list) => newList.current);
          break;
        case "Price Low to High":
          new_list = list.sort(function (a, b) {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          });
          newList.current = Array.from(new Set(new_list));
          //setList(new_list);
          setList((list) => newList.current);
          break;

        default:
          break;
      }
    }
  }, [collectionsSort]);

  return (
    <div className="flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full border-separate rounded border border-gray-200 bg-white" style={{borderSpacing: "0"}}>
              <thead className="bg-gray-50">
                <tr>
                  <Th title="Collection" />
                  <Th title="Total Volume" />
                  <Th title="Floor Price" />
                  <Th title="24h %" />
                  <Th title="7d %" />
                  <Th title="Owners" />
                  <Th title="NFTs" />
                </tr>
              </thead>

              <tbody className="border border-gray-200 divide-y divide-gray-200 rounded">
                {list &&
                  list.map((item, index) => (
                    <CollectionTr
                      item={item}
                      key={collectionsSort ? collectionsSort + index : index}
                    />
                    //<CollectionTr collection={collection} key={index} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

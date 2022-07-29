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
    console.log("ooo")
    //console.log(collections)
    //console.log(list.length);
    //console.log(newList.current.length);

    const getNewData = async () => {
      await Promise.all(collections.map(async (collection, index) => {
        //for(let collection of collections) {
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
            //newList.current = new_list;
            //newList.current = new_list;
            newList.current = new_list;
            //setSetup(true);
            //console.log(index);
            //console.log("mapping");
            //console.log(newList.current);

            //setList(newList.current);
            return
          })
          .catch((err) => console.error(err));
      }));
      //};
    }
    list.length == 0 && newList.current.length == 0 && (await getNewData());
    console.log("make true");
    setSetup(true);
  };

  //2つ置かないと正常に取得されない
  /*useEffect(() => {
    collections && getCollectionsData();
  }, []);*/
  useEffect(() => {
    collections && getCollectionsData();
  }, [collections]);
    /*useEffect(() => {
      collections && getCollectionsData();
    }, [collections]);*/
  /*useEffect(() => {
    collections && getCollectionsData();
  }, []);
  useEffect(() => {
    collections && getCollectionsData();
  }, [collections]);*/

  useEffect(() => {
    //const filteredNewList = Array.from(new Set(newList.current));
    if (setup) {
      console.log("setlist start");
      //setList(newList.current);
      const data = Array.from(new Set(newList.current));
      sortList();
      //setList((list) => Array.from(new Set(newList.current)));
      setSetup(false);
    }
    //setList((list) => newList.current);

    //console.log("listああああ");
  }, [setup]);

  const sortList = () => {
    //if (collectionsSort) {
      let new_list = [];
      switch (collectionsSort) {
        case "volume":
          console.log("sort statrt");
          new_list = list.sort(function (a, b) {
            if (a.stats.total_volume < b.stats.total_volume) return 1;
            if (a.stats.total_volume > b.stats.total_volume) return -1;
            return 0;
          });
          newList.current = Array.from(new Set(new_list));
          //setList(new_list);
          setList((list) => newList.current);
          break;

        default:
          //取引ボリュームの多い順
          new_list = newList.current.sort(function (a, b) {
            if (a.stats.total_volume < b.stats.total_volume) return 1;
            if (a.stats.total_volume > b.stats.total_volume) return -1;
            return 0;
          });
          newList.current = Array.from(new Set(new_list));
          //setList(new_list);
          setList((list) => newList.current);
          break;
      }
    //}
  }

  useEffect(() => {
    if (collectionsSort) {
      let new_list = [];
      switch (collectionsSort) {
        case "volume":
          console.log("sort statrt")
          new_list = list.sort(function (a, b) {
            if (a.stats.total_volume < b.stats.total_volume) return 1;
            if (a.stats.total_volume > b.stats.total_volume) return -1;
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
            <table className="min-w-full">
              <thead className="border-t border-x border-gray-200 bg-gray-50">
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

              <tbody className="border border-gray-200 divide-y divide-gray-200">
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

import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  ReactNode,
} from "react";
import { FaSort } from "react-icons/fa";
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
  const {
    sortAction,
    setSortAction,
    collectionCategory,
    setCollectionCategory,
    collectionsSort,
    setCollectionsSort,
    totalVolumeOrder,
    setTotalVolumeOrder,
    oneDayChangeOrder,
    setOneDayChangeOrder,
    threeDayChangeOrder,
    setThreeDayChangeOrder,
    sevenDayChangeOrder,
    setSevenDayChangeOrder,
    ownersOrder,
    setOwnersOrder,
    itemsOrder,
    setItemsOrder,
    collectionNameOrder,
    setCollectionNameOrder,
  } = useContext(UtilitiesContext);

  const [setup, setSetup] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);

  const resetOrder = () => {
    setTotalVolumeOrder("desc");
    setOneDayChangeOrder("desc");
    setThreeDayChangeOrder("desc");
    setSevenDayChangeOrder("desc");
    setOwnersOrder("desc");
    setItemsOrder("desc");
    setCollectionNameOrder("asc");
  };
  type ThProps = {
    title: string;
  };
  const Th = ({ title }: ThProps) => {
    let thClass = "";
    switch (title) {
      case collectionsSort:
        thClass = "text-gray-600";
        break;
      case "Floor Price":
        switch (collectionsSort) {
          case "Price Low to High":
          case "Price High to Low":
            thClass = "text-gray-600";
            break;
        }
        break;
      default:
        thClass = "text-gray-300";
        break;
    }
    return (
      <>
        {title.length > 0 ? (
          <th
            scope="col"
            className={`py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-400 sm:pl-6 `}
          >
            <button
              className="flex gap-2 items-center"
              onClick={() => {
                //setCollectionsSort(title);
                //setSortAction(true);
                if (title == "Floor Price") {
                  switch (collectionsSort) {
                    case "Price Low to High":
                      setCollectionsSort("Price High to Low");
                      setSortAction(true);
                      break;
                    case "Price High to Low":
                      setCollectionsSort("Price Low to High");
                      setSortAction(true);
                      break;

                    default:
                    case "Price Low to High":
                      setCollectionsSort("Price High to Low");
                      setSortAction(true);
                      break;
                  }
                } else {
                  if (collectionsSort == title) {
                    setSortAction(true);
                  } else {
                    resetOrder();
                    setSortAction(true);
                    setCollectionsSort(title);
                  }
                }
              }}
            >
              {title}
              <FaSort className={`${thClass}`} />
            </button>
          </th>
        ) : (
          <th className="py-3.5 text-left text-sm font-medium text-gray-400"></th>
        )}
      </>
    );
  };

  //useStateだと反映されなかったためuseRefを使用
  const allList = useRef<any[]>([]);
  const newList = useRef<any[]>([]);

  const options = { method: "GET" };
  const getCollectionsData = async () => {
    const getNewData = async () => {
      await Promise.all(
        collections.map(async (collection, index) => {
          await fetch(
            `https://api.opensea.io/api/v1/collection/${collection.slug}`,
            options
          )
            .then((response) => response.json())
            .then((response) => {
              let data = response.collection;
              data.creator_id = collection.creator_id;
              data.category = collection.category;

              const new_data = data;
              const new_list = [...newList.current, new_data];
              allList.current = new_list;
              newList.current = new_list;
              return;
            })
            .catch((err) => console.error(err));
        })
      );
    };
    list.length == 0 && newList.current.length == 0 && (await getNewData());
    setSetup(true);
  };

  useEffect(() => {
    collections && getCollectionsData();
  }, [collections]);

  useEffect(() => {
    if (setup) {
      const data = Array.from(new Set(newList.current));
      sortInitList();
      setSetup(false);
    }
  }, [setup]);

  //初期ソート
  const sortInitList = () => {
    let new_list = [];
    new_list = newList.current.sort(function (a, b) {
      if (a.stats.total_volume < b.stats.total_volume) return 1;
      if (a.stats.total_volume > b.stats.total_volume) return -1;
      return 0;
    });
    newList.current = Array.from(new Set(new_list));
    //setList(new_list);
    setList((list) => newList.current);
  };

  const sortList = () => {
    let new_list = [];
    switch (collectionsSort) {
      case "Total Volume":
        new_list = list.sort(function (a, b) {
          if (totalVolumeOrder == "desc") {
            setTotalVolumeOrder("asc");
            if (a.stats.total_volume < b.stats.total_volume) return 1;
            if (a.stats.total_volume > b.stats.total_volume) return -1;
            return 0;
          } else {
            setTotalVolumeOrder("desc");
            if (a.stats.total_volume < b.stats.total_volume) return -1;
            if (a.stats.total_volume > b.stats.total_volume) return 1;
            return 0;
          }
        });
        newList.current = Array.from(new Set(new_list));
        setList((list) => newList.current);
        break;
      case "Collection Name":
        new_list = list.sort(function (a, b) {
          if (collectionNameOrder == "desc") {
            setCollectionNameOrder("asc");
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          } else {
            setCollectionNameOrder("desc");
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          }
        });
        newList.current = Array.from(new Set(new_list));
        //setList(new_list);
        setList((list) => newList.current);
        break;
      case "Price Low to High":
        new_list = list.sort(function (a, b) {
          if (a.stats.floor_price < b.stats.floor_price) return -1;
          if (a.stats.floor_price > b.stats.floor_price) return 1;
          return 0;
        });
        newList.current = Array.from(new Set(new_list));
        //setList(new_list);
        setList((list) => newList.current);
        break;
      case "Price High to Low":
        new_list = list.sort(function (a, b) {
          if (a.stats.floor_price < b.stats.floor_price) return 1;
          if (a.stats.floor_price > b.stats.floor_price) return -1;
          return 0;
        });
        newList.current = Array.from(new Set(new_list));
        setList((list) => newList.current);
        break;
      case "24h %":
        new_list = list.sort(function (a, b) {
          if (oneDayChangeOrder == "desc") {
            setOneDayChangeOrder("asc");
            if (a.stats.one_day_change < b.stats.one_day_change) return 1;
            if (a.stats.one_day_change > b.stats.one_day_change) return -1;
            return 0;
          } else {
            setOneDayChangeOrder("desc");
            if (a.stats.one_day_change < b.stats.one_day_change) return -1;
            if (a.stats.one_day_change > b.stats.one_day_change) return 1;
            return 0;
          }
        });
        newList.current = Array.from(new Set(new_list));
        setList((list) => newList.current);
        break;
      case "3d %":
        new_list = list.sort(function (a, b) {
          if (threeDayChangeOrder == "desc") {
            setThreeDayChangeOrder("asc");
            if (a.stats.three_day_change < b.stats.three_day_change) return 1;
            if (a.stats.three_day_change > b.stats.three_day_change) return -1;
            return 0;
          } else {
            setThreeDayChangeOrder("desc");
            if (a.stats.three_day_change < b.stats.three_day_change) return -1;
            if (a.stats.three_day_change > b.stats.three_day_change) return 1;
            return 0;
          }
        });
        newList.current = Array.from(new Set(new_list));
        setList((list) => newList.current);
        break;
      case "7d %":
        new_list = list.sort(function (a, b) {
          if (sevenDayChangeOrder == "desc") {
            setSevenDayChangeOrder("asc");
            if (a.stats.seven_day_change < b.stats.seven_day_change) return 1;
            if (a.stats.seven_day_change > b.stats.seven_day_change) return -1;
            return 0;
          } else {
            setSevenDayChangeOrder("desc");
            if (a.stats.seven_day_change < b.stats.seven_day_change) return -1;
            if (a.stats.seven_day_change > b.stats.seven_day_change) return 1;
            return 0;
          }
        });
        newList.current = Array.from(new Set(new_list));
        setList((list) => newList.current);
        break;
      case "Owners":
        new_list = list.sort(function (a, b) {
          if (ownersOrder == "desc") {
            setOwnersOrder("asc");
            if (a.stats.num_owners < b.stats.num_owners) return 1;
            if (a.stats.num_owners > b.stats.num_owners) return -1;
            return 0;
          } else {
            setOwnersOrder("desc");
            if (a.stats.num_owners < b.stats.num_owners) return -1;
            if (a.stats.num_owners > b.stats.num_owners) return 1;
            return 0;
          }
        });
        newList.current = Array.from(new Set(new_list));
        setList((list) => newList.current);
        break;
      case "Items":
        new_list = list.sort(function (a, b) {
          if (itemsOrder == "desc") {
            setItemsOrder("asc");
            if (a.stats.total_supply < b.stats.total_supply) return 1;
            if (a.stats.total_supply > b.stats.total_supply) return -1;
            return 0;
          } else {
            setItemsOrder("desc");
            if (a.stats.total_supply < b.stats.total_supply) return -1;
            if (a.stats.total_supply > b.stats.total_supply) return 1;
            return 0;
          }
        });
        newList.current = Array.from(new Set(new_list));
        setList((list) => newList.current);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    if (collectionsSort) {
      sortList();
    }
  }, []);
  useEffect(() => {
    if (sortAction) {
      sortList();
      setSortAction(false);
    }
  }, [sortAction]);

  useEffect(() => {
    //let new_list = [];
    if (collectionCategory == "All") {
      newList.current = Array.from(new Set(allList.current));
    } else {
      const category_filter = allList.current.filter(
        (collection) => collection.category === collectionCategory
      );
      newList.current = Array.from(new Set(category_filter));
    }
    setSortAction(true);
    setList((list) => newList.current);
  }, [collectionCategory]);

  return (
    <div className="flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table
              className="table-sort min-w-full border-separate rounded border border-gray-200 bg-white"
              style={{ borderSpacing: "0" }}
            >
              <thead className="bg-gray-50">
                <tr>
                  <Th title="" />
                  <Th title="Collection Name" />
                  <Th title="Total Volume" />
                  <Th title="Floor Price" />
                  <Th title="24h %" />
                  <Th title="7d %" />
                  <Th title="Owners" />
                  <Th title="Items" />
                </tr>
              </thead>

              <tbody className="border border-gray-200 divide-y divide-gray-200 rounded">
                {list &&
                  list.map((item, index) => (
                    <CollectionTr
                      item={item}
                      index={index}
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

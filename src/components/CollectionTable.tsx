import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  ReactNode,
} from "react";
import ReactLoading from "react-loading";

import { FaDiscord, FaSort } from "react-icons/fa";
import { CreatorsContext } from "@/contexts/CreatorsContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { Card } from "@/components/Card";
import { CollectionTr } from "@/components/CollectionTr";

import { Collection } from "@/types/collection";
import { Creator } from "@/types/creator";
import { BsTwitter } from "react-icons/bs";
import { IconType } from "react-icons";

type ThProps = {
  children: ReactNode;
};
type Props = {
  collections: Collection[];
  limit?: number;
};
export const CollectionTable = ({ collections, limit }: Props) => {
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
    thirtyDayChangeOrder,
    setThirtyDayChangeOrder,
    sevenDayChangeOrder,
    setSevenDayChangeOrder,
    ownersOrder,
    setOwnersOrder,
    itemsOrder,
    setItemsOrder,
    collectionNameOrder,
    setCollectionNameOrder,
  } = useContext(UtilitiesContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [setup, setSetup] = useState<boolean>(false);
  const [socialSetup, setSocialSetup] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);

  const resetOrder = () => {
    setTotalVolumeOrder("desc");
    setOneDayChangeOrder("desc");
    setThirtyDayChangeOrder("desc");
    setSevenDayChangeOrder("desc");
    setOwnersOrder("desc");
    setItemsOrder("desc");
    setCollectionNameOrder("asc");
  };
  type ThProps = {
    title: any;
  };
  const Th = ({ title }: ThProps) => {
    let thClass = "";
    switch (title) {
      case collectionsSort:
        thClass = "text-gray-300";
        break;
      case "Floor Price":
        switch (collectionsSort) {
          case "Price Low to High":
          case "Price High to Low":
            thClass = "text-gray-300";
            break;
        }
        break;
      default:
        thClass = "text-gray-600";
        break;
    }
    return (
      <>
        {title.length > 0 || typeof title != "string" ? (
          <th
            scope="col"
            className={`py-3.5 pr-3 text-left text-sm font-medium text-gray-400 ${
              title != "Collection Name" && "pl-4 sm:pl-6"
            }`}
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
          <th className="py-3.5 text-left text-sm font-medium text-gray-400 min-w-[28px]"></th>
        )}
      </>
    );
  };

  //useStateだと反映されなかったためuseRefを使用
  const allList = useRef<any[]>([]);
  const newList = useRef<any[]>([]);

  const getCollectionsData = async () => {
    const options = { method: "GET" };
    const getNewData = async () => {
      if (newList.current.length == 0) {
        console.log("start");
        setLoading(true);
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
                allList.current = Array.from(new Set(new_list));
                newList.current = Array.from(new Set(new_list));
                //console.log("newList.current");
                //console.log(newList.current);
                return;
              })
              .catch((err) => console.error(err));
          })
        );
        await getSocialCount();
        setLoading(false);
      }
    };
    await getNewData();
    setSetup(true);
    setSocialSetup(true);
  };

  const getSocialCount = async () => {
    let baseUrl = "" as string;
    if (process.env.NODE_ENV != "test") {
      baseUrl = {
        production: "https://gachi.vercel.app",
        development: "http://localhost:3000",
      }[process.env.NODE_ENV];
    }
    let discordData: any;
    const getDiscordMembers = async (discord_id: string, index: number) => {
      await fetch(
        `https://discord.com/api/v9/invites/${discord_id}?with_counts=true&with_expiration=true`
      )
        .then((response) => response.json())
        .then((response) => {
          discordData = response;
          const discordMembers =
            discordData && discordData.approximate_member_count;
          newList.current[index].discord_members = discordMembers;
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    };
    let twitterData: any;
    const getTwitterFollowers = async (twitter_id: string, index: number) => {
      if (baseUrl && twitter_id) {
        await fetch(
          `${baseUrl}/api/twitter?twitter_id=${twitter_id}&type=collection`
        )
          .then((response) => response.json())
          .then((response) => {
            //console.log("JSON.parse(response)");
            //console.log(JSON.parse(response));
            twitterData = JSON.parse(response);
            const twitterFollowers =
              twitterData && twitterData.public_metrics.followers_count;
            newList.current[index].twitter_followers = twitterFollowers;
            console.log("twitterFollowers");
            console.log(twitterFollowers);
          })
          .catch((error) => {
            console.log("error");
            console.log(error);
          });
      }
    };
    const addSocialCount = async () => {
      await Promise.all(
        newList.current.map(async (item, index) => {
          const discordId =
            item.discord_url &&
            item.discord_url.substring(item.discord_url.lastIndexOf("/") + 1);
          discordId && (await getDiscordMembers(item.discordId, index));
          const twitterUsername = item.twitter_username;
          twitterUsername &&
            (await getTwitterFollowers(twitterUsername, index));
        })
      );
      console.log("finished");
    };
    console.log("start");

    await addSocialCount();
    console.log("end");
  };

  /*useEffect(() => {
    if (socialSetup) {
      getSocialCount();
      setSocialSetup(false);
    }
  }, [socialSetup]);*/

  //const [first, setfirst] = useState(0);
  useEffect(() => {
    //setfirst(first + 1);
    //console.log(first + 1);
    if (collections && allList.current.length == 0) {
      getCollectionsData();
    }
  }, [collections]);
  //useEffect(() => {
  //  collections && !list && getCollectionsData();
  //}, []);
  //collections && list.length == 0 && getCollectionsData();

  useEffect(() => {
    if (setup) {
      //const data = Array.from(new Set(newList.current));
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
    if (limit) {
      let limited_list = [] as any[];
      for (let index = 0; index < limit; index++) {
        limited_list = [...limited_list, newList.current[index]];
      }
      setList((list) => limited_list);
    } else {
      setList((list) => newList.current);
    }
  };

  const sortList = () => {
    let new_list = [];
    switch (collectionsSort) {
      case "Total Volume":
        new_list = newList.current.sort(function (a, b) {
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
        new_list = newList.current.sort(function (a, b) {
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
        if (limit) {
          let limited_list = [] as any[];
          for (let index = 0; index < limit; index++) {
            limited_list = [...limited_list, newList.current[index]];
          }
          setList((list) => limited_list);
        } else {
          setList((list) => newList.current);
        }
        break;
      case "Price Low to High":
        new_list = newList.current.sort(function (a, b) {
          if (a.stats.floor_price < b.stats.floor_price) return -1;
          if (a.stats.floor_price > b.stats.floor_price) return 1;
          return 0;
        });
        newList.current = Array.from(new Set(new_list));
        //setList(new_list);
        if (limit) {
          let limited_list = [] as any[];
          for (let index = 0; index < limit; index++) {
            limited_list = [...limited_list, newList.current[index]];
          }
          setList((list) => limited_list);
        } else {
          setList((list) => newList.current);
        }
        break;
      case "Price High to Low":
        new_list = newList.current.sort(function (a, b) {
          if (a.stats.floor_price < b.stats.floor_price) return 1;
          if (a.stats.floor_price > b.stats.floor_price) return -1;
          return 0;
        });
        newList.current = Array.from(new Set(new_list));
        if (limit) {
          let limited_list = [] as any[];
          for (let index = 0; index < limit; index++) {
            limited_list = [...limited_list, newList.current[index]];
          }
          setList((list) => limited_list);
        } else {
          setList((list) => newList.current);
        }
        break;
      case "24h %":
        new_list = newList.current.sort(function (a, b) {
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
        if (limit) {
          let limited_list = [] as any[];
          for (let index = 0; index < limit; index++) {
            limited_list = [...limited_list, newList.current[index]];
          }
          setList((list) => limited_list);
        } else {
          setList((list) => newList.current);
        }
        break;
      case "30d %":
        new_list = newList.current.sort(function (a, b) {
          if (thirtyDayChangeOrder == "desc") {
            setThirtyDayChangeOrder("asc");
            if (a.stats.thirty_day_change < b.stats.thirty_day_change) return 1;
            if (a.stats.thirty_day_change > b.stats.thirty_day_change)
              return -1;
            return 0;
          } else {
            setThirtyDayChangeOrder("desc");
            if (a.stats.thirty_day_change < b.stats.thirty_day_change)
              return -1;
            if (a.stats.thirty_day_change > b.stats.thirty_day_change) return 1;
            return 0;
          }
        });
        newList.current = Array.from(new Set(new_list));
        if (limit) {
          let limited_list = [] as any[];
          for (let index = 0; index < limit; index++) {
            limited_list = [...limited_list, newList.current[index]];
          }
          setList((list) => limited_list);
        } else {
          setList((list) => newList.current);
        }
        break;
      case "7d %":
        new_list = newList.current.sort(function (a, b) {
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
        if (limit) {
          let limited_list = [] as any[];
          for (let index = 0; index < limit; index++) {
            limited_list = [...limited_list, newList.current[index]];
          }
          setList((list) => limited_list);
        } else {
          setList((list) => newList.current);
        }
        break;
      case "Owners":
        new_list = newList.current.sort(function (a, b) {
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
        if (limit) {
          let limited_list = [] as any[];
          for (let index = 0; index < limit; index++) {
            limited_list = [...limited_list, newList.current[index]];
          }
          setList((list) => limited_list);
        } else {
          setList((list) => newList.current);
        }
        break;
      case "Items":
        new_list = newList.current.sort(function (a, b) {
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
        if (limit) {
          let limited_list = [] as any[];
          for (let index = 0; index < limit; index++) {
            limited_list = [...limited_list, newList.current[index]];
          }
          setList((list) => limited_list);
        } else {
          setList((list) => newList.current);
        }
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
    resetOrder();
    setSortAction(true);
    if (limit) {
      let limited_list = [] as any[];
      for (let index = 0; index < limit; index++) {
        limited_list = [...limited_list, newList.current[index]];
      }
      setList((list) => limited_list);
    } else {
      setList((list) => newList.current);
    }
  }, [collectionCategory]);

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
                  <Th title="" />
                  <Th title="Collection Name" />
                  <Th title={<BsTwitter className="text-twitter" />} />
                  <Th title={<FaDiscord className="text-discord" />} />
                  <Th title="Total Volume" />
                  <Th title="Floor Price" />
                  <Th title="24h %" />
                  <Th title="7d %" />
                  <Th title="30d %" />
                  <Th title="Owners" />
                  <Th title="Items" />
                </tr>
              </thead>
              {!loading && (
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

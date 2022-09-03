import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  ReactNode,
} from "react";
import ReactLoading from "react-loading";
import { useQueryState } from "next-usequerystate";

import { sortList } from "@/libs/sortList";

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
  console.log("collections");
  console.log(collections);
  const creators = useContext(CreatorsContext);
  const {
    sortAction,
    setSortAction,
    collectionCategory,
    setCollectionCategory,
  } = useContext(UtilitiesContext);
  const router = useRouter();
  const [orderParam, setOrderParam] = useQueryState("order");
  const [sortByParam, setSortByParam] = useQueryState("sortBy");
  const [termParam, setTermParam] = useQueryState("term");

  const { order, sortBy, term } = router.query;
  const { socials } = useContext(SocialsContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [setup, setSetup] = useState<boolean>(false);
  const [socialSetup, setSocialSetup] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  //const [order, setOrder] = useState<"desc" | "asc">("desc");

  /*const resetOrder = () => {
    setTotalVolumeOrder("desc");
    setOneDayChangeOrder("desc");
    setThirtyDayChangeOrder("desc");
    setSevenDayChangeOrder("desc");
    setOwnersOrder("desc");
    setItemsOrder("desc");
    setCollectionNameOrder("asc");
  };*/

  //useStateだと反映されなかったためuseRefを使用
  const allList = useRef<any[]>([]);
  const newList = useRef<any[]>([]);

  const [test, setTest] = useState(0);
  const getCollectionsData = async () => {
    setTest(test + 1);
    console.log(test);
    const options = { method: "GET" };
    const getNewData = async () => {
      if (newList.current.length == 0) {
        setLoading(true);
        if (socials.length > 0 && collections) {
          await Promise.all(
            collections.map(async (collection, index) => {
              const socials_filter = socials.filter(
                (social) => social.collection_slug === collection.slug
              );

              const twitter_followers = socials_filter[0]
                ? socials_filter[0].twitter_followers
                : null;
              const discord_members = socials_filter[0]
                ? socials_filter[0].discord_members
                : null;
              await fetch(
                `https://api.opensea.io/api/v1/collection/${collection.slug}`,
                options
              )
                .then((response) => response.json())
                .then((response) => {
                  let data = response.collection;
                  data.record_id = collection.record_id;
                  data.creator_id = collection.creator_id;
                  data.category = collection.category;
                  data.twitter_followers = twitter_followers;
                  data.discord_members = discord_members;
                  const new_data = data;
                  const new_list = [...newList.current, new_data];
                  console.log("new_list");
                  console.log(new_list);
                  allList.current = Array.from(new Set(new_list));
                  newList.current = Array.from(new Set(new_list));
                  //console.log("newList.current");
                  //console.log(newList.current);
                  return;
                })
                .catch((err) => console.error(err));
            })
          );
        }
        //await getSocialCount();
        setLoading(false);
      }
    };
    await getNewData();
    setSetup(true);
    setSocialSetup(true);
  };

  // const getSocialCount = async () => {
  //   const addSocialCount = async () => {
  //     let new_List = list;
  //     await Promise.all(
  //       list.map(async (item, index) => {
  //         if (!item.discord_members) {
  //           let discordId =
  //             item.discord_url &&
  //             item.discord_url.substring(item.discord_url.lastIndexOf("/") + 1);
  //           let discordMembers =
  //             discordId && (await getDiscordMembers(discordId));
  //           //reset discordId
  //           console.log("discordId");
  //           console.log(discordId);

  //           new_List[index].discord_members = discordMembers;
  //           console.log("discordMembers");
  //           console.log(discordMembers);
  //         }
  //         if (!item.twitter_followers) {
  //           const twitterUsername = item.twitter_username;
  //           const twitterFollowers =
  //             twitterUsername && (await getTwitterFollowers(twitterUsername));
  //           new_List[index].twitter_followers = twitterFollowers;
  //         }
  //       })
  //     );
  //     console.log("finished getSNSCOUNT");
  //     console.log(new_List);
  //     setList((list) => new_List);
  //   };
  //   await addSocialCount();
  // };

  //const [first, setfirst] = useState(0);
  //①get data from OpenSea
  useEffect(() => {
    //setfirst(first + 1);
    //console.log(first + 1);
    if (collections && allList.current.length == 0) {
      getCollectionsData();
    }
  }, [collections, socials]);
  //useEffect(() => {
  //  collections && !list && getCollectionsData();
  //}, []);
  //collections && list.length == 0 && getCollectionsData();

  //②set initial collections data
  const args = {
    list: allList.current,
    order: order as "desc" | "asc" | undefined,
    sortBy: sortBy as string | undefined,
    term: term as "24h" | "7d" | "30d" | "all" | undefined,
    //category: collectionsSort,
    limit: limit,
  };
  useEffect(() => {
    if (setup) {
      //const data = Array.from(new Set(newList.current));
      const data = sortList(args);
      setList((list) => data);
      console.log("dounatteruno?");
      console.log(args.list);
      console.log(data);
      console.log(newList.current);
      setSetup(false);
    }
  }, [setup]);

  /*useEffect(() => {
    getSocialCount();
  }, [list]);*/
  /*useEffect(() => {
    if (socialSetup) {
      getSocialCount();
      setSocialSetup(false);
    }
  }, [socialSetup]);*/

  //③set sorted collections data
  useEffect(() => {
    if (router.isReady && (order || sortBy || term)) {
      if (args.list.length > 0) {
        const data = sortList(args);
        console.log("sort shiteru?");
        console.log(data);
        console.log(args);
        setList((list) => [...data]);
      }
    }
    //setSocialSetup(true);
  }, [router.isReady, order, sortBy, term]);

  /*useEffect(() => {
    if (sortAction) {
      sortList();
      setSortAction(false);
    }
  }, [sortAction]);*/

  //filter category
  useEffect(() => {
    //let new_list = [];
    const filterCategory = () => {
      if (collectionCategory == "All") {
        newList.current = Array.from(new Set(allList.current));
      } else {
        const category_filter = allList.current.filter(
          (collection) => collection.category === collectionCategory
        );
        newList.current = Array.from(new Set(category_filter));
      }
    };
    filterCategory();
    //resetOrder();
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
                  <Th title="" sortBy={sortBy as string} />
                  <Th title="Collection Name" sortBy={sortBy as string} />
                  <Th title="Twitter" sortBy={sortBy as string} />
                  <Th title="Discord" sortBy={sortBy as string} />
                  <Th title="Volume" sortBy={sortBy as string} />
                  <Th title="Floor Price" sortBy={sortBy as string} />
                  <Th title="Ave. Price" sortBy={sortBy as string} />
                  <Th title="% Change" sortBy={sortBy as string} />
                  <Th title="Sales" sortBy={sortBy as string} />
                  <Th title="Owners" sortBy={sortBy as string} />
                  <Th title="Items" sortBy={sortBy as string} />
                </tr>
              </thead>
              {!loading && (
                <tbody className="border border-gray-200 divide-y divide-gray-200 rounded">
                  {list &&
                    list.map((item, index) => (
                      <CollectionTr
                        item={item}
                        index={index}
                        key={sortBy ? (sortBy as string) + index : index}
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

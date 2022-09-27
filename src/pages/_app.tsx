import "@/styles/style.scss";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

//import { MoralisProvider } from "react-moralis";

import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";

import { getImageUrl, supabase } from "@/libs/supabase";
import { base } from "@/libs/airtable";

import { AuthContext } from "@/contexts/AuthContext";

import { CreatorsContext } from "@/contexts/CreatorsContext";
import {
  CreatorTagsContext,
  CollectionTagsContext,
} from "@/contexts/TagsContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { SocialsContext } from "@/contexts/SocialsContext";

import { List } from "@/components/List";
import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { Tag } from "@/types/tag";
import { Utilities } from "@/types/utilities";
import { Footer } from "@/components/Footer";
import { BreadcrumbList } from "@/types/breadcrumbList";
import { Social } from "@/types/social";
import { stringify } from "querystring";

import { Like } from "@/types/like";
import { Upvote } from "@/types/upvote";
import { Bookmark } from "@/types/bookmark";

const shortid = require("shortid");

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>();
  const [profile, setProfile] = useState<any>();
  const [likes, setLikes] = useState<Like[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [upvotes, setUpvotes] = useState<Upvote[]>([]);
  // console.log("user");
  // console.log(user);
  // console.log("profile");
  // console.log(profile);

  const [headerIcon, setHeaderIcon] = useState<{
    title: string;
    emoji: string;
    avatar: any;
    path: string;
  }>({
    title: "",
    emoji: "",
    avatar: "",
    path: "",
  });
  const [search, setSearch] = useState<string | undefined>();
  const [indexTab, setIndexTab] = useState<"all" | "op" | "ed" | undefined>(
    "all"
  );
  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  /*const [utilities, setUtilities] = useState<Utilities>({
    search: search,
    setSearch: setSearch,
    indexTab: indexTab,
    setIndexTab: setIndexTab,
  })*/

  const [breadcrumbList, setBreadcrumbList] = useState<BreadcrumbList>();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [OSCollections, setOSCollections] = useState<Collection[]>([]);
  const [creatorTags, setCreatorTags] = useState<Tag[]>([]);
  const [collectionTags, setCollectionTags] = useState<Tag[]>([]);
  const [socials, setSocials] = useState<Social[]>([]);
  const [sortAction, setSortAction] = useState<boolean>(false);
  const [creatorType, setCreatorType] = useState<string>("all");
  const [creatorsSort, setCreatorsSort] = useState<string>();
  const [creatorCategory, setCreatorCategory] = useState<string>("All");
  const [collectionCategory, setCollectionCategory] = useState<string>("All");

  const router = useRouter();
  //const { page } = router.query
  const MORALIS_APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID as string;
  const MORALIS_SERVER_URL = process.env
    .NEXT_PUBLIC_MORALIS_SERVER_URL as string;

  const [page, setPage] = useState<number | undefined>(1);
  const limit = 10;
  const allList = useRef<any[]>([]);
  const newList = useRef<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File>();

  let avatar_url;
  let avatar_blob;

  const getAvatarBlob = async () => {
    avatar_blob =
      profile && profile.avatar_url && (await getImageUrl(profile.avatar_url));
    setAvatar(avatar_blob);
  };
  profile && !avatar && getAvatarBlob;

  useEffect(() => {
    !avatar && getAvatarBlob();
  }, [profile]);

  // user && !likes getLikes();
  // user && !upvotes getUpvotes();
  useEffect(() => {
    getLikes();
    getBookmarks();
    getUpvotes();
  }, [user]);

  const getLikes = async () => {
    try {
      if (user) {
        const { data, error, status } = await supabase
          .from("likes")
          .select("*, profiles(*)", {
            count: "exact",
            head: false,
          })
          .eq("user_id", `${user.id}`);
        if (error && status !== 406) {
          throw error;
        }
        const new_likes = data as Like[];
        console.log("new_likes");
        console.log(new_likes);
        setLikes(new_likes);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      //setLoading(false)
    }
  };
  const getBookmarks = async () => {
    try {
      if (user) {
        const { data, error, status } = await supabase
          .from("bookmarks")
          .select("*, profiles(*)", {
            count: "exact",
            head: false,
          })
          .eq("user_id", `${user.id}`);
        if (error && status !== 406) {
          throw error;
        }
        const new_bookmarks = data as Like[];
        console.log("new_bookmarks");
        console.log(new_bookmarks);
        setBookmarks(new_bookmarks);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      //setLoading(false)
    }
  };
  const getUpvotes = async () => {
    try {
      if (user) {
        const { data, error, status } = await supabase
          .from("upvotes")
          .select("*, profiles(*)", {
            count: "exact",
            head: false,
          })
          .eq("user_id", `${user.id}`);
        if (error && status !== 406) {
          throw error;
        }
        const new_upvotes = data as Like[];
        console.log("new_upvotes");
        console.log(new_upvotes);
        setUpvotes(new_upvotes);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      //setLoading(false)
    }
  };
  const createProfile = async () => {
    // dより前の文字が欲しい
    let init_username = shortid.generate();
    const updates = {
      id: user.id,
      username: init_username,
      updated_at: new Date(),
    };
    let { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal", // Don't return the value after inserting
    });

    if (error) {
      throw error;
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (user) {
        let { data, error, status } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }
        if (data) {
          setProfile(data);
        }
        if (!profile && !data) {
          createProfile();
        }
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  const getCreators = () => {
    let new_records: Creator[] = [...creators];
    base("creators")
      .select({
        // Selecting the first 3 records in All:
        maxRecords: 100,
        view: "All",
      })
      .eachPage(
        //@ts-ignore
        function page(records: any[], fetchNextPage: () => void) {
          records.forEach(function (record) {
            const fields = record.fields;
            new_records = [
              ...new_records,
              {
                username: fields.username,
                description: fields.description,
                avatar: fields.avatar,
                background: fields.background,
                address: fields.address,
                website_url: fields.website_url,
                twitter_id: fields.twitter_id,
                instagram_id: fields.instagram_id,
                discord_url: fields.discord_url,
                type: fields.type,
                verified: fields.verified,
                createdAt: fields.createdAt,
                updatedAt: fields.updatedAt,
                collections: fields.collections,
                category: fields.category,
                tags: fields.tags,
              } as Creator,
            ];
            //console.log("creators", new_records);
            //console.log("Retrieved", record.fields);
          });
          setCreators(new_records);
          try {
            fetchNextPage();
          } catch (error) {
            console.log(error);
            return;
          }
          return new_records as Creator[];
        },
        function done(err: any) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  };
  const getCollections = () => {
    let new_records: Collection[] = [...collections];
    base("collections")
      .select({
        maxRecords: 100,
        view: "All",
      })
      .eachPage(
        //@ts-ignore
        function page(records: any[], fetchNextPage: () => void) {
          records.forEach(function (record) {
            try {
              const fields = record.fields;
              new_records = [
                ...new_records,
                {
                  record_id: fields.record_id,
                  name: fields.name,
                  slug: fields.slug,
                  creator_id: fields.creator_id[0],
                  type: fields.type,
                  createdAt: fields.createdAt,
                  updatedAt: fields.updatedAt,
                  category: fields.category,
                  verified: fields.verified,
                  tags: fields.tags,
                } as Collection,
              ];
            } catch (error) {
              console.log(error);
              return;
            }
            //console.log("collections", new_records);
            //console.log("Retrieved", record.fields);
          });
          setCollections(new_records);
          try {
            fetchNextPage();
          } catch (error) {
            console.log(error);
            return;
          }
        },
        function done(err: any) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  };
  const getTags = (
    baseName: string,
    setState: React.Dispatch<React.SetStateAction<Tag[]>>
  ) => {
    let new_records = [...creatorTags];
    base(baseName)
      .select({
        // Selecting the first 3 records in All:
        maxRecords: 100,
        view: "All",
      })
      .eachPage(
        //@ts-ignore
        function page(records: any[], fetchNextPage: () => void) {
          records.forEach(function (record) {
            const fields = record.fields;
            new_records = [
              ...new_records,
              {
                name: fields.name,
                createdAt: fields.createdAt,
                collections_slug: fields.collections_slug,
                count: fields.count,
              } as Tag,
            ];
            //console.log("creators", new_records);
            //console.log("Retrieved", record.fields);
          });
          //sort
          new_records = new_records.sort(function (a, b) {
            if (a.count < b.count) return 1;
            if (a.count > b.count) return -1;
            return 0;
          });
          new_records = Array.from(new Set(new_records));

          setState(new_records);
          try {
            fetchNextPage();
          } catch (error) {
            console.log(error);
            return;
          }
        },
        function done(err: any) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  };
  const getSocials = () => {
    let new_records = [...socials];
    base("social")
      .select({
        // Selecting the first 3 records in All:
        maxRecords: 1000,
        view: "All",
      })
      .eachPage(
        //@ts-ignore
        function page(records: any[], fetchNextPage: () => void) {
          records.forEach(function (record) {
            const fields = record.fields;
            new_records = [
              ...new_records,
              {
                creator_username: fields.creator_username,
                collection_slug: fields.collection_slug,
                twitter_followers: fields.twitter_followers,
                discord_members: fields.discord_members,
                record_id: fields.record_id,
              } as Social,
            ];
            //console.log("creators", new_records);
            //console.log("Retrieved", record.fields);
          });
          new_records = Array.from(new Set(new_records));
          setSocials(new_records);
          try {
            fetchNextPage();
          } catch (error) {
            console.log(error);
            return;
          }
        },
        function done(err: any) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  };
  const getOSCollections = async (collections: Collection[]) => {
    const options = { method: "GET" };
    const getNewData = async () => {
      if (OSCollections.length == 0 && socials.length > 0) {
        let new_list: any = [];
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
                data.tags = collection.tags;
                data.creator_id = collection.creator_id;
                data.category = collection.category;
                data.twitter_followers = twitter_followers;
                data.discord_members = discord_members;
                const new_data = data;
                new_list = [...newList.current, new_data];
                newList.current = Array.from(new Set(new_list));
              })
              .catch((err) => console.error(err));
          })
        );
      }
      //await getSocialCount();
    };
    await getNewData();
    // console.log("OSnewList.current data");
    // console.log(newList.current);
    // console.log("OSnewList.current");
    // console.log(collections);
    const new_collections = Array.from(new Set(newList.current));
    const result = newList.current.filter(
      (element, index, self) =>
        self.findIndex((e) => e.slug === element.slug) === index
    );
    setOSCollections(result);
  };

  useEffect(() => {
    console.log("OSCollectionsuuuuuu");
    console.log(OSCollections);
  }, [OSCollections]);

  useEffect(() => {
    //getCreators();
    const data = supabase.auth.user();
    setUser(data);
    data && !profile && getProfile();
    creators.length == 0 && getCreators();
    collections.length == 0 && getCollections();
    creatorTags.length == 0 && getTags("creator_tags", setCreatorTags);
    collectionTags.length == 0 && getTags("collection_tags", setCollectionTags);
    socials.length == 0 && getSocials();
  }, []);
  useEffect(() => {
    console.log("jjjjj");
    if (OSCollections.length == 0 && collections && socials) {
      (async () => {
        await getOSCollections(collections);
      })();
    }
  }, [collections, socials]);

  const site_name = "NFT OTAKU";
  const title = "NFT OTAKU | Japanese NFT Creators / Collections Database";
  const description =
    "Search creators, collections and NFTs with NFT OTAKU. We are creating special database and collaboration platform.";
  const twitter_id = "gachi";

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <DefaultSeo
        defaultTitle={title}
        description={description}
        openGraph={{
          type: "website",
          title: title,
          description: description,
          site_name: site_name,
          url: process.env.NEXT_PUBLIC_SITE_URL,
          images: [
            {
              url: process.env.NEXT_PUBLIC_SITE_URL + "/ogp-default.jpg",
              width: 1200,
              height: 630,
              alt: title,
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          handle: "@ik_takagishi",
          //site: "@ik_takagishi",
          cardType: "summary_large_image",
        }}
      />
      <AuthContext.Provider
        value={{
          user,
          profile,
          avatar,
          setAvatar,
          bookmarks,
          setBookmarks,
          upvotes,
          setUpvotes,
        }}
      >
        <UtilitiesContext.Provider
          value={{
            search: search,
            setSearch: setSearch,
            indexTab: indexTab,
            setIndexTab: setIndexTab,
            page: page,
            setPage: setPage,
            headerIcon: headerIcon,
            setHeaderIcon: setHeaderIcon,
            sortAction: sortAction,
            setSortAction: setSortAction,
            creatorType: creatorType,
            setCreatorType: setCreatorType,
            creatorsSort: creatorsSort,
            setCreatorsSort: setCreatorsSort,
            creatorCategory: creatorCategory,
            setCreatorCategory: setCreatorCategory,
            collectionCategory: collectionCategory,
            setCollectionCategory: setCollectionCategory,
            breadcrumbList: breadcrumbList,
            setBreadcrumbList: setBreadcrumbList,
            //collectionsMenu: collectionsMenu,
            //setCollectionsMenu: setCollectionsMenu,
          }}
        >
          <BaseContext.Provider
            value={{
              creators,
              collections,
              OSCollections,
              creatorTags,
              collectionTags,
              socials,
              setSocials,
            }}
          >
            <div className="flex flex-col min-h-screen font-outfit bg-stripe overflow-hidden">
              <Component {...pageProps} />
              <div className="mt-auto">
                <Footer />
              </div>
            </div>
          </BaseContext.Provider>
        </UtilitiesContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default MyApp;

import "@/styles/style.scss";
import "@/styles/ogp.scss";
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
import creatorsJson from "@/json/creators.json";

import collectionsJson from "@/json/collections.json";
import tags from "@/json/tags.json";
import { Social } from "@/types/social";
import { stringify } from "querystring";

import { Like } from "@/types/like";
import { Upvote } from "@/types/upvote";
import { Bookmark } from "@/types/bookmark";
import { isBuffer } from "util";
import { IconType } from "react-icons";
import { Profile } from "@/types/profile";
import { useRedirections } from "@/utilities/useRedirections";
import { Params } from "@/types/params";

const shortid = require("shortid");

function MyApp({ Component, pageProps }: AppProps) {
  const [creators, setCreators] = useState<Creator[]>(creatorsJson);
  const [collections, setCollections] = useState<any[]>(collectionsJson);
  const [loginModal, setLoginModal] = useState(false);
  const [user, setUser] = useState<any>();
  // const [creatorSocial, setCreatorSocial] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>();
  const [userProfile, setUserProfile] = useState<Profile>();
  const [scrollY, setScrollY] = useState<number>();
  const [prevHeight, setPrevHeight] = useState<number>();

  const [likes, setLikes] = useState<Like[]>([]);
  // const [allList, setAllList] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [upvotes, setUpvotes] = useState<Upvote[]>([]);
  // console.log("user");
  // console.log(user);
  // console.log("profile");
  // console.log(profile);

  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }

  const [headerIcon, setHeaderIcon] = useState<{
    title: string;
    subTitle?: any;
    emoji: string;
    avatar: any;
    element?: any;
    path: string;
  }>({
    title: "",
    subTitle: "",
    emoji: "",
    avatar: "",
    element: "",
    path: "",
  });
  const [keyword, setKeyword] = useState<string | undefined>();
  const [hiddenParams, setHiddenParams] = useState<Params | undefined>();
  const [NFTKeyword, setNFTKeyword] = useState<string | undefined>();
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
  // const [creators, setCreators] = useState<Creator[]>();
  // const [collections, setCollections] = useState<any[]>([]);
  // const [OSCollections, setOSCollections] = useState<Collection[]>([]);
  // const [tags, setTags] = useState<Tag[]>([]);
  // const [creatorTags, setCreatorTags] = useState<Tag[]>([]);
  // const [collectionTags, setCollectionTags] = useState<Tag[]>([]);
  // const [socials, setSocials] = useState<Social[]>([]);

  const router = useRouter();
  //const { page } = router.query
  const MORALIS_APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID as string;
  const MORALIS_SERVER_URL = process.env
    .NEXT_PUBLIC_MORALIS_SERVER_URL as string;

  const [page, setPage] = useState<number | undefined>(1);
  const limit = 10;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  // user && !likes getLikes();
  // user && !upvotes getUpvotes();
  useEffect(() => {
    getBookmarks();
    getUpvotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  useEffect(() => {
    //getCreators();
    const data = supabase.auth.user();
    setUser(data);
    data && !profile && getProfile();
    // creators.length == 0 && getCreators();
    // collections.length == 0 && getCollections();
    // creatorTags.length == 0 && getTags("creator_tags", setCreatorTags);
    // collectionTags.length == 0 && getTags("collection_tags", setCollectionTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (OSCollections.length == 0 && collections && socials) {
  //     (async () => {
  //       await getOSCollections(collections);
  //     })();
  //   }
  // }, [collections, socials]);

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
            loginModal: loginModal,
            setLoginModal: setLoginModal,
            baseUrl: baseUrl,
            hiddenParams: hiddenParams,
            setHiddenParams: setHiddenParams,
            keyword: keyword,
            setKeyword: setKeyword,
            NFTKeyword: keyword,
            setNFTKeyword: setKeyword,
            headerIcon: headerIcon,
            setHeaderIcon: setHeaderIcon,
            breadcrumbList: breadcrumbList,
            setBreadcrumbList: setBreadcrumbList,
            userProfile: userProfile,
            setUserProfile: setUserProfile,
            scrollY: scrollY,
            setScrollY: setScrollY,
            prevHeight: prevHeight,
            setPrevHeight: setPrevHeight,
            //collectionsMenu: collectionsMenu,
            //setCollectionsMenu: setCollectionsMenu,
          }}
        >
          <BaseContext.Provider
            value={{
              creators,
              collections,
              setCreators,
              setCollections,
              tags,
              // socials,
              // setSocials,
            }}
          >
            <div className="flex flex-col min-h-screen font-digital -font-outfit bg-stripe overflow-hidden">
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

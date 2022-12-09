import "@/styles/style.scss";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { useEffect, useState } from "react";

import { AuthContext } from "@/contexts/AuthContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import * as gtag from "@/libs/gtag";
import { getImageUrl, supabase } from "@/libs/supabase";
import type { Bookmark } from "@/types/bookmark";
import type { Profile } from "@/types/profile";
import type { Upvote } from "@/types/upvote";

const shortid = require("shortid");

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string | undefined>();
  const [user, setUser] = useState<any>();
  const [profile, setProfile] = useState<any>();
  const [userProfile, setUserProfile] = useState<Profile>();
  const [avatar, setAvatar] = useState<File>();
  const [loginModal, setLoginModal] = useState(false);
  const [upvotes, setUpvotes] = useState<Upvote[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  let avatar_blob;
  const getAvatarBlob = async () => {
    avatar_blob = profile && profile.avatar_url && (await getImageUrl(profile.avatar_url));
    setAvatar(avatar_blob);
  };
  profile && !avatar && getAvatarBlob;

  useEffect(() => {
    !avatar && getAvatarBlob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    getBookmarks();
    getUpvotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getBookmarks = async () => {
    try {
      if (user && supabase) {
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
        const new_bookmarks = data as Bookmark[];
        setBookmarks(new_bookmarks);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  const getUpvotes = async () => {
    try {
      if (user && supabase) {
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
        const new_upvotes = data as Upvote[];
        return new_upvotes;
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const createProfile = async () => {
    const init_username = shortid.generate();
    const updates = {
      id: user.id,
      updated_at: new Date(),
      username: init_username,
    };
    if (supabase) {
      const { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });
      if (error) {
        throw error;
      }
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      if (supabase) {
        const user = supabase.auth.user();
        if (user) {
          const { data, error, status } = await supabase.from("profiles").select("*").eq("id", user.id).single();

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
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (supabase) {
      const data = supabase.auth.user();
      setUser(data);
      data && !profile && getProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const site_name = "NFT OTAKU";
  const title = "NFT OTAKU | Japanese NFT Creators / Collections Database";
  const description =
    "Discover favorite Japanese NFT creators, projects and collections. NFT OTAKU is one of the biggest NFT creator search application in Japan.";
  const twitter_id = "nftotaku_dao";

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://use.typekit.net/xbj6ysr.css" />
      </Head>
      <DefaultSeo
        defaultTitle={title}
        description={description}
        openGraph={{
          description: description,
          images: [
            {
              alt: title,
              height: 630,
              type: "image/jpeg",
              url: process.env.NEXT_PUBLIC_SITE_URL + "/default-ogp.jpg",
              width: 1200,
            },
          ],
          site_name: site_name,
          title: title,
          type: "website",
          url: process.env.NEXT_PUBLIC_SITE_URL,
        }}
        twitter={{
          cardType: "summary_large_image",
          handle: `@${twitter_id}`,
        }}
      />
      <AuthContext.Provider
        value={{
          avatar,
          bookmarks,
          profile,
          setAvatar,
          setBookmarks,
          setUpvotes,
          upvotes,
          user,
        }}
      >
        <UtilitiesContext.Provider
          value={{
            keyword: keyword,
            loginModal: loginModal,
            NFTKeyword: keyword,
            setKeyword: setKeyword,
            setLoginModal: setLoginModal,
            setNFTKeyword: setKeyword,
            setUserProfile: setUserProfile,
            userProfile: userProfile,
          }}
        >
          <div className={`bg-stripe flex min-h-screen flex-col overflow-hidden`}>
            <Component {...pageProps} />
          </div>
        </UtilitiesContext.Provider>
      </AuthContext.Provider>
    </>
  );
}
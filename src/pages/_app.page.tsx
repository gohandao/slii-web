import "@/styles/style.scss";
import "@/styles/globals.css";

import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { useEffect, useState } from "react";

import { description, site_name, title, twitter_id } from "@/constant/seo.const";
import { AuthContext } from "@/contexts/AuthContext";
import { userAtom } from "@/contexts/state/auth.state";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import * as gtag from "@/libs/gtag";
import { supabase } from "@/libs/supabase";
import type { Bookmark } from "@/types/bookmark";
import type { Profile } from "@/types/profile";
import type { Upvote } from "@/types/upvote";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string | undefined>();
  const [profile, setProfile] = useState<any>();
  const [userProfile, setUserProfile] = useState<Profile>();
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [upvotes, setUpvotes] = useState<Upvote[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (user) {
      getBookmarks();
      getUpvotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getBookmarks = async () => {
    try {
      if (user) {
        const { data, error, status } = await supabase.from("bookmarks").select("*").eq("user_id", `${user.id}`);
        if (error && status !== 406) {
          throw error;
        }
        data && setBookmarks(data);
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
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
        data && setUpvotes(data);
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const createProfile = async () => {
    const init_username = nanoid();
    const updates = {
      id: user?.id,
      updated_at: new Date(),
      username: init_username,
    };
    const { error } = await supabase.from("profiles").upsert(updates);
    if (error) throw error;
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      if (supabase) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data, error, status } = await supabase.from("profiles").select("*").eq("id", user.id).single();
          supabase
            .channel(`public:profile:id=eq.${user.id}`)
            .on(
              "postgres_changes",
              { event: "*", filter: `id=eq.${user.id}`, schema: "public", table: "profiles" },
              (payload: { new: any }) => {
                setProfile(payload.new);
              }
            )
            .subscribe();
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
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    fetchUser();
    if (!user) {
      !profile && getProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
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
          bookmarks,
          profile,
          setBookmarks,
          setUpvotes,
          upvotes,
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

import "@/styles/style.scss";
import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

import { useAtom, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { useEffect, useState } from "react";

import { description, site_name, title, twitter_id } from "@/constant/seo.const";
import { useGetAuthBookmarks } from "@/hooks/useGetAuthBookmarks";
import { useGetAuthUpvotes } from "@/hooks/useGetAuthUpvotes";
import { useGetSession } from "@/hooks/useGetSession";
import * as gtag from "@/libs/gtag";
import { supabase } from "@/libs/supabase";
import { authBookmarksAtom, authProfileAtom, authUpvotesAtom, authUserAtom } from "@/state/auth.state";
import { pageHistoryAtom } from "@/state/utilities.state";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [, setLoading] = useState<boolean>(false);
  const [authUser, setAuthUser] = useAtom(authUserAtom);
  const { session } = useGetSession();
  if (session) setAuthUser(session.user);
  const setAuthBookmarks = useSetAtom(authBookmarksAtom);
  const { authBookmarks } = useGetAuthBookmarks();
  if (authBookmarks) setAuthBookmarks(authBookmarks);
  const setAuthUpvotes = useSetAtom(authUpvotesAtom);
  const { authUpvotes } = useGetAuthUpvotes();
  if (authUpvotes) setAuthUpvotes(authUpvotes);
  const [authProfile, setAuthProfile] = useAtom(authProfileAtom);

  const [pageHistory, setPageHistory] = useAtom(pageHistoryAtom);

  useEffect(() => {
    setPageHistory([router.asPath, pageHistory[0]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const createProfile = async () => {
    const init_username = nanoid();
    const updates = {
      id: authUser?.id,
      name: init_username,
      updated_at: new Date(),
      username: init_username,
    };
    const { error } = await supabase.from("profiles").upsert(updates);
    if (error) throw error;
  };

  const getAuthProfile = async () => {
    try {
      setLoading(true);
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
              setAuthProfile(payload.new);
            }
          )
          .subscribe();
        if (error && status !== 406) throw error;
        if (data) setAuthProfile(data);
        if (!authProfile && !data) createProfile();
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authUser) !authProfile && getAuthProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

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
      <div className={`flex min-h-screen flex-col overflow-hidden bg-[#F8FAFC]`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

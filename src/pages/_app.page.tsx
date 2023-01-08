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
import { useGetSession } from "@/hooks/useGetSession";
import { useGetUserUpvotes } from "@/hooks/useGetUserUpvotes";
import * as gtag from "@/libs/gtag";
import { supabase } from "@/libs/supabase";
import { bookmarkAtom, profileAtom, upvoteAtom, userAtom } from "@/state/auth.state";

import { useGetUserBookmarks } from "../hooks/useGetUserBookmarks";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [, setLoading] = useState<boolean>(false);
  const [user, setUser] = useAtom(userAtom);
  const { session } = useGetSession();
  if (session) setUser(session.user);
  const [, setBookmarks] = useAtom(bookmarkAtom);
  const { userBookmarks } = useGetUserBookmarks();
  if (userBookmarks) setBookmarks(userBookmarks);
  const [, setUpvotes] = useAtom(upvoteAtom);
  const { userUpvotes } = useGetUserUpvotes();
  if (userUpvotes) setUpvotes(userUpvotes);
  const [profile, setProfile] = useAtom(profileAtom);

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
        if (error && status !== 406) throw error;
        if (data) setProfile(data);
        if (!profile && !data) createProfile();
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) !profile && getProfile();
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
      <div className={`bg-stripe flex min-h-screen flex-col overflow-hidden`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

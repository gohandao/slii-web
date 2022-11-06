import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";

import { ParsedUrlQuery } from "node:querystring";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { getImageUrl, supabase } from "@/libs/supabase";
import { Bookmark } from "@/types/bookmark";
import { getUserId } from "@/utilities/getUserId";
import { getNFTs } from "@/utilities/getNFTs";
import { UserPageTemplate } from "@/components/UserPageTemplate";

const BookmarksPage: NextPage = (props: any) => {
  const router = useRouter();
  const { username } = router.query;

  const [userBookmarks, setUserBookmarks] = useState<Bookmark[] | undefined>(
    []
  );

  const getUserBookmarks = async (username: string) => {
    const userId =
      username && ((await getUserId(username as string)) as string);
    let new_bookmarks;
    try {
      const { data, error, status } = await supabase
        .from("bookmarks")
        .select("*, profiles(*)", {
          count: "exact",
          head: false,
        })
        .eq("user_id", `${userId}`);
      if (error && status !== 406) {
        throw error;
      }
      new_bookmarks = data as Bookmark[];
      setUserBookmarks(new_bookmarks);
    } catch (error: any) {
      alert(error.message);
    } finally {
      //setLoading(false)
    }
    return new_bookmarks;
  };

  useEffect(() => {
    const fetchData = async () => {
      const new_userBookmarks = await getUserBookmarks(username as string);
      if (new_userBookmarks) {
        setUserBookmarks(new_userBookmarks);
      }
    };
    if (username) {
      fetchData();
    }
  }, [username]);
  username && !userBookmarks && getUserBookmarks(username as string);

  const creator_bookmarks =
    userBookmarks &&
    userBookmarks.filter(
      (bookmark) => bookmark.creator_id && bookmark.creator_id.length > 0
    );

  const collection_bookmarks =
    userBookmarks &&
    userBookmarks.filter(
      (bookmark) =>
        bookmark.collection_slug && bookmark.collection_slug.length > 0
    );

  return (
    <>
      <NextSeo
        title={props.title}
        description={props.description}
        openGraph={{
          type: "article",
          title: props.title,
          description: props.description,
          url: process.env.NEXT_PUBLIC_SITE_URL + `/${username}`,
          images: [
            {
              url: props.ogImageUrl,
              width: 1200,
              height: 630,
              alt: props.title,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <UserPageTemplate
        property="bookmarks"
        creatorList={creator_bookmarks}
        collectionList={collection_bookmarks}
      />
    </>
  );
};
export default BookmarksPage;

type PathProps = {
  title: string;
  description: string;
  ogImageUrl: string;
};
type Params = ParsedUrlQuery & {
  username: string;
};

export const getStaticPaths = async () => {
  const { data, error, status } = await supabase.from("profiles").select("*", {
    count: "exact",
    head: false,
  });
  return {
    paths: data && data.map((user: any) => `/${user.username}/bookmarks`),
    //fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({
  params,
}) => {
  const username = params && params.username;
  const { data, error, status } = await supabase
    .from("profiles")
    .select("*", {
      count: "exact",
      head: false,
    })
    .eq("username", username)
    .single();
  const description =
    data && data.description
      ? data.description
      : `This is ${username}'s profile page.`;
  let baseUrl;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }
  return {
    props: {
      // OGP画像は絶対URLで記述する必要があります
      //ogImageUrl: `${baseUrl}/api/ogp?title=${creator.username}&page=creators`,
      title: `${username}'s profile`,
      description: description,
      //description: `${records[0].fields.description}`,
      ogImageUrl: `${baseUrl}/api/ogp?title=${username}&subTitle=Creator`,
      revalidate: 10,
    },
  };
};

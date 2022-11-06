import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";

import { ParsedUrlQuery } from "node:querystring";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { getImageUrl, supabase } from "@/libs/supabase";
import { Upvote } from "@/types/upvote";
import { getUserId } from "@/utilities/getUserId";
import { getNFTs } from "@/utilities/getNFTs";
import { UserPageTemplate } from "@/components/UserPageTemplate";

const UserPage: NextPage = (props: any) => {
  const router = useRouter();
  const { username } = router.query;

  const [userUpvotes, setUserUpvotes] = useState<Upvote[] | undefined>([]);

  const getUserUpvotes = async (username: string) => {
    const userId =
      username && ((await getUserId(username as string)) as string);
    let new_upvotes;
    try {
      const { data, error, status } = await supabase
        .from("upvotes")
        .select("*, profiles(*)", {
          count: "exact",
          head: false,
        })
        .eq("user_id", `${userId}`);
      if (error && status !== 406) {
        throw error;
      }
      new_upvotes = data as Upvote[];
      setUserUpvotes(new_upvotes);
    } catch (error: any) {
      alert(error.message);
    } finally {
      //setLoading(false)
    }
    return new_upvotes;
  };

  useEffect(() => {
    const fetchData = async () => {
      const new_userUpvotes = await getUserUpvotes(username as string);
      if (new_userUpvotes) {
        setUserUpvotes(new_userUpvotes);
      }
    };
    if (username) {
      fetchData();
    }
  }, [username]);
  username && !userUpvotes && getUserUpvotes(username as string);

  const creator_upvotes =
    userUpvotes &&
    userUpvotes.filter(
      (upvote) => upvote.creator_id && upvote.creator_id.length > 0
    );

  const collection_upvotes =
    userUpvotes &&
    userUpvotes.filter(
      (upvote) => upvote.collection_slug && upvote.collection_slug.length > 0
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
        property="upvoted"
        creatorList={creator_upvotes}
        collectionList={collection_upvotes}
      />
    </>
  );
};
export default UserPage;

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
    paths: data && data.map((user: any) => `/${user.username}`),
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
  //const creators = records;
  //const creator = creators[0];
  //console.log("static creator");
  //console.log(creator);
  /*const creator = creators.filter(
    (creator: any) => creator.fields.username === username
  );*/
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

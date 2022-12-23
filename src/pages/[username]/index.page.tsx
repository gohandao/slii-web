import type { ParsedUrlQuery } from "node:querystring";

import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import { UserPageTemplate } from "@/components/templates/UserPageTemplate";
import { getUserUpvotes, supabase } from "@/libs/supabase";
import type { Upvote } from "@/types/upvote";
import { useGetUserId } from "@/utilities/hooks/useGetUserId";

type Props = {
  description: string;
  ogImageUrl: string;
  title: string;
};
const UserPage: NextPage<Props> = ({ description, ogImageUrl, title }) => {
  const router = useRouter();
  const { username } = router.query;
  const [userUpvotes, setUserUpvotes] = useState<Upvote[] | undefined>([]);
  const { userId } = useGetUserId();

  useEffect(() => {
    const fetchData = async () => {
      const new_userUpvotes = await getUserUpvotes(userId);
      if (new_userUpvotes) {
        setUserUpvotes(new_userUpvotes);
      }
    };
    if (username) {
      fetchData();
    }
  }, [userId, username]);

  const upvotes_creators = userUpvotes?.filter((upvote) => {
    return upvote.creator_username;
  });
  const upvotes_collections = userUpvotes?.filter((upvote) => {
    return upvote.collection_slug;
  });

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          description: description,
          images: [
            {
              alt: title,
              height: 630,
              type: "image/jpeg",
              url: ogImageUrl,
              width: 1200,
            },
          ],
          title: title,
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + `/${username}`,
        }}
      />
      <UserPageTemplate property="upvoted" creatorList={upvotes_creators} collectionList={upvotes_collections} />
    </>
  );
};
export default UserPage;

type PathProps = {
  description: string;
  ogImageUrl: string;
  title: string;
};
type Params = ParsedUrlQuery & {
  username: string;
};

export const getStaticPaths = async () => {
  if (supabase) {
    const { data } = await supabase.from("profiles").select("*", {
      count: "exact",
      head: false,
    });
    return {
      fallback: "blocking",
      paths:
        data &&
        data.map((user: any) => {
          return `/${user.username}`;
        }),
    };
  }
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({ params }) => {
  const username = params && params.username;
  let user;
  if (supabase) {
    const { data } = await supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: false,
      })
      .eq("username", username)
      .single();
    user = data;
  }
  if (!user) {
    return {
      notFound: true,
    };
  }
  const description = user && user.description ? user.description.slice(0, 200) : `This is ${username}'s profile page.`;
  const label = user && user.label ? user.label.slice(0, 20) : `NFT Holder`;

  let baseUrl;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      development: "http://localhost:3000",
      production: "https://nftotaku.xyz",
    }[process.env.NODE_ENV];
  }

  const storage_url = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;
  const avatar = user.avatar ? storage_url + "/" + user.avatar : "";
  const background = user.background ? storage_url + "/" + user.background : "";

  return {
    props: {
      description: description,
      ogImageUrl: `${baseUrl}/api/ogp?title=${username}&label=${label}&type=user&avatar=${avatar}&background=${background}`,
      revalidate: 10,
      // OGP画像は絶対URLで記述する必要があります
      title: `${username}'s profile | NFT OTAKU`,
    },
  };
};

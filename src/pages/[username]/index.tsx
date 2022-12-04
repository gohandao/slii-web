import type { ParsedUrlQuery } from "node:querystring";

import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import { UserPageTemplate } from "@/components/UserPageTemplate";
import { supabase } from "@/libs/supabase";
import type { Upvote } from "@/types/upvote";
import { getUserId } from "@/utilities/getUserId";

type Props = {
  description: string;
  ogImageUrl: string;
  title: string;
};
const UserPage: NextPage<Props> = (props) => {
  const { description, ogImageUrl, title } = props;
  const router = useRouter();
  const { username } = router.query;
  const [userUpvotes, setUserUpvotes] = useState<Upvote[] | undefined>([]);

  const getUserUpvotes = async (username: string) => {
    const userId = username && ((await getUserId(username as string)) as string);
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
    userUpvotes.filter((upvote) => {
      return upvote.creator_id && upvote.creator_id.length > 0;
    });

  const collection_upvotes =
    userUpvotes &&
    userUpvotes.filter((upvote) => {
      return upvote.collection_slug && upvote.collection_slug.length > 0;
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
      <UserPageTemplate property="upvoted" creatorList={creator_upvotes} collectionList={collection_upvotes} />
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
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({ params }) => {
  const username = params && params.username;
  const { data } = await supabase
    .from("profiles")
    .select("*", {
      count: "exact",
      head: false,
    })
    .eq("username", username)
    .single();
  if (!data) {
    return {
      notFound: true,
    };
  }
  const description = data && data.description ? data.description.slice(0, 200) : `This is ${username}'s profile page.`;
  const label = data && data.label ? data.label.slice(0, 20) : `NFT Holder`;

  let baseUrl;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      development: "http://localhost:3000",
      production: "https://nftotaku.xyz",
    }[process.env.NODE_ENV];
  }

  const storage_url = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;
  const avatar = data.avatar ? storage_url + "/" + data.avatar : "";
  const background = data.background ? storage_url + "/" + data.background : "";

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

import type { ParsedUrlQuery } from "node:querystring";

import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { UserPageTemplate } from "@/components/templates/UserPageTemplate";
import { useGetUserBookmarks } from "@/hooks/useGetUserBookmarks";
import { supabase } from "@/libs/supabase";

type Props = {
  description: string;
  ogImageUrl: string;
  title: string;
};
const BookmarksPage: NextPage<Props> = ({ description, ogImageUrl, title }) => {
  const router = useRouter();
  const { username } = router.query;
  const { userBookmarks } = useGetUserBookmarks();

  const bookmarked_creators = userBookmarks.filter((bookmark) => {
    return bookmark.creator_username;
  });
  const bookmarked_collections = userBookmarks.filter((bookmark) => {
    return bookmark.collection_slug;
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
      <UserPageTemplate
        property="bookmarks"
        creatorList={bookmarked_creators}
        collectionList={bookmarked_collections}
      />
    </>
  );
};
export default BookmarksPage;

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
          return `/${user.username}/bookmarks`;
        }),
    };
  }
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({ params }) => {
  const username = params && params.username;
  let profile;
  if (supabase) {
    const { data } = await supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: false,
      })
      .eq("username", username)
      .single();
    profile = data;
  }
  if (!profile) {
    return {
      notFound: true,
    };
  }
  const description =
    profile && profile.description ? profile.description.slice(0, 200) : `This is ${username}'s bookmarks page.`;
  const label = profile && profile.label ? profile.label.slice(0, 20) : `NFT Holder`;

  let baseUrl;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      development: "http://localhost:3000",
      production: "https://nftotaku.xyz",
    }[process.env.NODE_ENV];
  }

  const avatar = profile.avatar_url ? profile.avatar_url : "";
  const background = profile.background_url ? profile.background_url : "";

  return {
    props: {
      description: description,
      ogImageUrl: `${baseUrl}/api/ogp?title=${username}&label=${label}&type=user&avatar=${avatar}&background=${background}`,
      revalidate: 10,
      // OGP画像は絶対URLで記述する必要があります
      title: `${username}'s bookmarks page | NFT OTAKU`,
    },
  };
};

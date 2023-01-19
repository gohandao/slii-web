// kata: creatorコンポーネントクリック後、表示されるモーダル
import type { ParsedUrlQuery } from "node:querystring";

import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { CreatorScreen } from "@/components/templates/CreatorScreen";
import { getCreators, supabase } from "@/libs/supabase";
import type { Creator } from "@/types/creator";

type Props = {
  description: string;
  ogImageUrl: string;
  title: string;
};
const CreatorIndex: NextPage<Props> = ({ description, ogImageUrl, title }) => {
  const router = useRouter();
  const { username } = router.query;

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
          url: process.env.NEXT_PUBLIC_SITE_URL + `/creator/${username}`,
        }}
      />
      <SplitLayout>
        <CreatorScreen />
      </SplitLayout>
    </>
  );
};
export default CreatorIndex;

type PathProps = {
  description: string;
  ogImageUrl: string;
  title: string;
};

type Params = ParsedUrlQuery & {
  username: string;
};

export const getStaticPaths = async () => {
  const { data } = await getCreators();
  const creators = data as Creator[];
  return {
    fallback: "blocking",
    paths:
      creators &&
      creators.map((creator: any) => {
        return `/creator/${creator.username}`;
      }),
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({ params }) => {
  const username = params && params.username;
  let creator;
  if (supabase) {
    const { data, error } = await supabase.from("creators").select().eq("username", username).single();
    if (error) {
      console.log("error");
      console.log(error);
    }
    creator = data as any;
  }
  if (!creator) {
    return { notFound: true };
  }

  const baseUrl = (() => {
    if (process.env.NODE_ENV != "test") {
      return {
        development: "http://localhost:3000",
        production: "https://nftotaku.xyz",
      }[process.env.NODE_ENV];
    }
  })();

  const avatar = creator.avatar ? creator.avatar : "";
  const background = creator.background ? creator.background : "";
  const verified = creator.verified ? creator.verified : "";
  return {
    props: {
      description: `${username} is a Japanese NFT creator / project.`,
      ogImageUrl: `${baseUrl}/api/ogp?title=${username}&label=Creator&type=user&avatar=${avatar}&background=${background}&verified=${verified}`,
      revalidate: 600,
      title: `${username}'s NFT stats and collections | NFT OTAKU`,
    },
  };
};

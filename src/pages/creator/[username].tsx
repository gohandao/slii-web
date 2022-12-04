import type { ParsedUrlQuery } from "node:querystring";

import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useContext, useEffect, useState } from "react";

import { BaseLayout } from "@/components/BaseLayout";
import { CreatorScreen } from "@/components/CreatorScreen";
import { CreatorsIndexScreen } from "@/components/CreatorsIndexScreen";
import { ScreenModal } from "@/components/ScreenModal";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import creatorsJson from "@/json/creators.json";
import type { Creator } from "@/types/creator";

type Props = {
  description: string;
  ogImageUrl: string;
  title: string;
};
const CreatorIndex: NextPage<Props> = (props) => {
  const { description, ogImageUrl, title } = props;
  const router = useRouter();
  const { screen, username } = router.query;
  const { hiddenParams, scrollY } = useContext(UtilitiesContext);
  const [creatorModal, setCreatorModal] = useState<boolean>(screen ? true : false);

  useEffect(() => {
    if (hiddenParams) {
      setCreatorModal(screen ? true : false);
    } else {
      setCreatorModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

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
      {screen == "modal" ? (
        <>
          <ScreenModal modalIsOpen={creatorModal} setModalIsOpen={setCreatorModal} path="/">
            <CreatorScreen />
          </ScreenModal>
          <div
            className={`fixed left-0 w-full`}
            style={{
              top: `-${scrollY}px`,
            }}
          >
            <BaseLayout>
              <CreatorsIndexScreen params={hiddenParams} />
            </BaseLayout>
          </div>
        </>
      ) : (
        <BaseLayout>
          <CreatorScreen />
        </BaseLayout>
      )}
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
  const creators = JSON.parse(JSON.stringify(creatorsJson)) as Creator[];
  return {
    fallback: "blocking",
    paths: creators.map((creator: any) => {
      return `/creator/${creator.username}`;
    }),
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({ params }) => {
  const creators = JSON.parse(JSON.stringify(creatorsJson)) as Creator[];
  const username = params && params.username;
  const filtered_creators = creators.filter((creator: any) => {
    return creator.username === username;
  });
  const creator = filtered_creators[0];
  if (!creator) {
    return {
      notFound: true,
    };
  }
  let baseUrl;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      development: "http://localhost:3000",
      production: "https://nftotaku.xyz",
    }[process.env.NODE_ENV];
  }
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

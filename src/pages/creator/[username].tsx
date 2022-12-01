import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "node:querystring";

// json
import creatorsJson from "@/json/creators.json";
// contexts
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

// components
import { BaseLayout } from "@/components/BaseLayout";
import { CreatorScreen } from "@/components/CreatorScreen";
import { ScreenModal } from "@/components/ScreenModal";
import { CreatorsIndexScreen } from "@/components/CreatorsIndexScreen";
import { Creator } from "@/types/creator";

const CreatorIndex: NextPage = (props: any) => {
  const router = useRouter();
  const { username, screen } = router.query;
  const { hiddenParams, scrollY } = useContext(UtilitiesContext);
  const [creatorModal, setCreatorModal] = useState<boolean>(
    screen ? true : false
  );

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
        title={props.title}
        description={props.description}
        openGraph={{
          type: "article",
          title: props.title,
          description: props.description,
          url: process.env.NEXT_PUBLIC_SITE_URL + `/creator/${username}`,
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
      {screen == "modal" ? (
        <>
          <ScreenModal
            modalIsOpen={creatorModal}
            setModalIsOpen={setCreatorModal}
            path="/"
          >
            <CreatorScreen property="modal" />
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
  title: string;
  description: string;
  ogImageUrl: string;
};
type Params = ParsedUrlQuery & {
  username: string;
};

export const getStaticPaths = async () => {
  // const fs = require("fs");
  // const creators = JSON.parse(fs.readFileSync("@/json/creators.json", "utf8"));
  const creators = JSON.parse(JSON.stringify(creatorsJson)) as Creator[];
  return {
    paths: creators.map((creator: any) => `/creator/${creator.username}`),
    //fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PathProps, Params> = async ({
  params,
}) => {
  // const fs = require("fs");
  // const creators = JSON.parse(fs.readFileSync("@/json/creators.json", "utf8"));
  const creators = JSON.parse(JSON.stringify(creatorsJson)) as Creator[];
  const username = params && params.username;
  const filtered_creators = creators.filter(
    (creator: any) => creator.username === username
  );
  const creator = filtered_creators[0];
  if (!creator) {
    return {
      notFound: true,
    };
  }
  const description = creator && creator.description ? creator.description : "";
  let baseUrl;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }

  const avatar = creator.avatar ? creator.avatar : "";
  const background = creator.background ? creator.background : "";
  //@ts-ignore
  const varified = creator.varified ? creator.varified : "";

  return {
    props: {
      title: `${username}'s NFT stats and collections | NFT OTAKU`,
      description: `${username} is a Japanese NFT creator / project.`,
      ogImageUrl: `${baseUrl}/api/ogp?title=${username}&label=Creator&type=user&avatar=${avatar}&background=${background}&verified=${varified}`,
      revalidate: 600,
    },
  };
};

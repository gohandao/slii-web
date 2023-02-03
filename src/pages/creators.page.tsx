import type { NextPage } from "next";
import { NextSeo } from "next-seo";

import { IndexPageTemplate } from "@/components/templates/IndexPageTemplate";

const CreatorsPage: NextPage = () => {
  return (
    <div>
      <NextSeo
        title="All NFT Collections in Japan | NFT OTAKU"
        description="Find NFT colllections created by Japanese NFT artists and projects."
        openGraph={{
          description: "Find NFT colllections created by Japanese NFT artists and projects.",
          title: "All NFT Collections in Japan | NFT OTAKU",
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/collections",
        }}
      />
      <div>
        {/* <ScreenModal modalIsOpen={screenModal} setModalIsOpen={setScreenModal} path="/collections">
          <CollectionScreen />
        </ScreenModal> */}
        <IndexPageTemplate />
      </div>
    </div>
  );
};

export default CreatorsPage;

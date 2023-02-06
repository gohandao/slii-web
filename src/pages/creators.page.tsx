import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect } from "react";

import { ScreenModal } from "@/components/modules/ScreenModal";
import { BasePageScreen } from "@/components/templates/BasePageScreen";
import { IndexPageTemplate } from "@/components/templates/IndexPageTemplate";
import { screenModalAtom } from "@/state/utilities.state";

const CreatorsPage: NextPage = () => {
  const router = useRouter();
  const [screenModal, setScreenModal] = useAtom(screenModalAtom);
  const { username } = router.query;

  useEffect(() => {
    username ? setScreenModal(true) : setScreenModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

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
        {screenModal && (
          <ScreenModal>
            <BasePageScreen />
          </ScreenModal>
        )}
        <IndexPageTemplate />
      </div>
    </div>
  );
};

export default CreatorsPage;

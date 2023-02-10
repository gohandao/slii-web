import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect } from "react";

import { ScreenModal } from "@/components/modules/ScreenModal";
import { BasePageScreen } from "@/components/templates/BasePageScreen";
import { IndexPageTemplate } from "@/components/templates/IndexPageTemplate";
import { site_name } from "@/constant/seo.const";
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
        title={`Discover NFT Creators in Japan | ${site_name}`}
        description="You can easily find your favorite NFT creators and projects in Japan."
        openGraph={{
          description: "You can easily find your favorite NFT creators and projects in Japan.",
          title: `Discover NFT Creators in Japan | ${site_name}`,
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/creators",
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

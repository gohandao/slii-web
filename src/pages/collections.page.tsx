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

const ColectionsPage: NextPage = () => {
  const router = useRouter();
  const [screenModal, setScreenModal] = useAtom(screenModalAtom);
  const { slug } = router.query;

  useEffect(() => {
    slug ? setScreenModal(true) : setScreenModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <div>
      <NextSeo
        title={`Discover NFT Collections in Japan | ${site_name}`}
        description="You can easily find your favorite NFT colllections created by Japanese NFT artists and projects."
        openGraph={{
          description:
            "You can easily find your favorite NFT colllections created by Japanese NFT artists and projects.",
          title: `Discover NFT Collections in Japan | ${site_name}`,
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

export default ColectionsPage;

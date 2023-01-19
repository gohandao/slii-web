import type { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import { ScreenModal } from "@/components/modules/ScreenModal";
import { CollectionScreen } from "@/components/templates/CollectionScreen";
import { CollectionsIndexScreen } from "@/components/templates/CollectionsIndexScreen";

const CollectionsPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [screenModal, setScreenModal] = useState(false);

  useEffect(() => {
    setScreenModal(slug ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
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
        <ScreenModal modalIsOpen={screenModal} setModalIsOpen={setScreenModal} path="/collections">
          <CollectionScreen />
        </ScreenModal>
        <SplitLayout>
          <CollectionsIndexScreen />
        </SplitLayout>
      </div>
    </div>
  );
};

export default CollectionsPage;

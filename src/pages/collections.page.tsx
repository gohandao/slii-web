import type { NextPage } from "next";
import { NextSeo } from "next-seo";

import { SplitLayout } from "@/components/layouts/SplitLayout";
import { CollectionsIndexScreen } from "@/components/templates/CollectionsIndexScreen";

const CollectionsPage: NextPage = () => {
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
        <SplitLayout>
          <CollectionsIndexScreen />
        </SplitLayout>
      </div>
    </div>
  );
};

export default CollectionsPage;

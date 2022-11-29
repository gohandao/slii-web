import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import React, { useEffect, useContext } from "react";
import { BiPurchaseTagAlt } from "react-icons/bi";

// contexts
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

// components
import { TagList } from "@/components/TagList";
import { BaseLayout } from "@/components/BaseLayout";

const TagsPage: NextPage = () => {
  const { tags } = useContext(BaseContext);

  const { setHeaderIcon } = useContext(UtilitiesContext);
  useEffect(() => {
    setHeaderIcon({
      title: "Tags",
      emoji: "",
      avatar: "",
      element: <BiPurchaseTagAlt />,
      path: `/tags`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NextSeo
        title="Search Japanese NFT creators and collections with tags | NFT OTAKU"
        description="You can search Japanese NFT creators and collections with tags."
        openGraph={{
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/404",
          title:
            "Search Japanese NFT creators and collections with tags | NFT OTAKU",
          description:
            "You can search Japanese NFT creators and collections with tags.",
        }}
      />
      <BaseLayout>
        <div className="">
          <div className="mx-auto mt-3 px-5 md:px-8">
            <h1 className="mb-3 text-sm tracking-[0.2em] text-gray-500">
              Tags for search.
            </h1>
          </div>
          <section className="mx-auto mt-5 px-5 md:px-8">
            <div className="mb-10">
              <TagList tags={tags} type="creator" />
            </div>
          </section>
        </div>
      </BaseLayout>
    </div>
  );
};

export default TagsPage;

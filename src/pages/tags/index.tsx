import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useContext, useEffect, useState } from "react";
import { BiPurchaseTagAlt } from "react-icons/bi";

import { BaseLayout } from "@/components/BaseLayout";
import { TagList } from "@/components/TagList";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { getTags } from "@/libs/airtable";
import type { Tag } from "@/types/tag";

const TagsPage: NextPage = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const { setHeaderIcon } = useContext(UtilitiesContext);
  useEffect(() => {
    const fetchData = async () => {
      const tags = await getTags("tags");
      setTags(tags);
    };
    fetchData();
    setHeaderIcon({
      avatar: "",
      element: <BiPurchaseTagAlt />,
      emoji: "",
      path: `/tags`,
      title: "Tags",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NextSeo
        title="Search Japanese NFT creators and collections with tags | NFT OTAKU"
        description="You can search Japanese NFT creators and collections with tags."
        openGraph={{
          description: "You can search Japanese NFT creators and collections with tags.",
          title: "Search Japanese NFT creators and collections with tags | NFT OTAKU",
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/404",
        }}
      />
      <BaseLayout>
        <div className="">
          <div className="mx-auto mt-3 px-5 md:px-8">
            <h1 className="mb-3 text-sm tracking-[0.2em] text-gray-500">Tags for search.</h1>
          </div>
          {tags && (
            <section className="mx-auto mt-5 px-5 md:px-8">
              <div className="mb-10">
                <TagList tags={tags} type="creator" />
              </div>
            </section>
          )}
        </div>
      </BaseLayout>
    </div>
  );
};
export default TagsPage;

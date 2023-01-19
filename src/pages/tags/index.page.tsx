import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import { getTags } from "@/libs/airtable";
import { TagList } from "@/pages/tags/TagList";
import type { Tag } from "@/types/tag";

const TagsPage: NextPage = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const tags = await getTags("tags");
      setTags(tags);
    };
    fetchData();
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
      <SplitLayout>
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
      </SplitLayout>
    </div>
  );
};
export default TagsPage;

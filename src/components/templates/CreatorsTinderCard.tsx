import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// import { TinderItem } from "@/components/modules/TinderItem";
import { useGetCreators } from "@/hooks/useGetCreators";
import type { Creator } from "@/types/creator";
import type { TCard } from "@/types/tinder";

const TinderItem = dynamic(
  () => {
    return import("@/components/modules/TinderItem");
  },
  {
    ssr: false,
  }
);
export const CreatorsTinderCard = () => {
  const router = useRouter();
  const { order, page, search, sort, type } = router.query;
  const [creators, setCreators] = useState<Creator[]>();
  const { getCreators } = useGetCreators();

  useEffect(() => {
    const props = {
      order: order as "desc" | "asc" | undefined,
      search: search as string | undefined,
      sort: sort as string | undefined,
      type: type as string | undefined,
    };
    const fetchData = async () => {
      const { data } = await getCreators(props);
      if (data != creators) {
        data &&
          setCreators(() => {
            return data;
          });
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, page, search, order, sort]);

  const cards = creators?.map((creator, index) => {
    return {
      above_tags: creator.tags,
      below_tags: creator.tags,
      image: creator.avatar,
      label: "Creator",
      name: creator.username,
      order: index,
      path: `/creator/${creator.username}`,
      verified: creator.verified,
    } as TCard;
  });
  return (
    <>
      <section className="mx-auto w-full">
        {/* SwipeCard = ({(labels, name, tags, type, (varified = false))} */}
        {cards && window !== undefined && (
          <div className="flex flex-col gap-8">
            <TinderItem cards={cards} />
          </div>
        )}
      </section>
    </>
  );
};

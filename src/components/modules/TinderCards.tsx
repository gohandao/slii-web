import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { useGetIndexCards } from "@/hooks/useGetIndexCards";
import { authUserAtom } from "@/state/auth.state";
import {
  collectionsFilterParamsAtom,
  combinedFilterParamsAtom,
  creatorsFilterParamsAtom,
  resetCardsAtom,
} from "@/state/utilities.state";
import type { TCard } from "@/types/tinder";

const TinderItem = dynamic(
  () => {
    return import("@/components/modules/TinderItem");
  },
  {
    ssr: false,
  }
);
export const TinderCards = () => {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<TCard[]>([]);
  const { getIndexCards, indexCards } = useGetIndexCards();
  const [authUser] = useAtom(authUserAtom);
  const [resetCards] = useAtom(resetCardsAtom);
  const [combinedFilterParams] = useAtom(combinedFilterParamsAtom);
  const [creatorsFilterParams] = useAtom(creatorsFilterParamsAtom);
  const [collectionsFilterParams] = useAtom(collectionsFilterParamsAtom);

  useEffect(() => {
    setCards(() => {
      return indexCards;
    });
  }, [indexCards]);

  const fetchData = async () => {
    setLoading(true);
    await getIndexCards();
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCards, combinedFilterParams, creatorsFilterParams, collectionsFilterParams, authUser]);

  return (
    <>
      <section className="mx-auto w-full">
        {loading ? (
          <p>Loading...</p>
        ) : cards && cards.length > 0 ? (
          <div className="flex flex-col gap-8">
            <TinderItem cards={cards} />
          </div>
        ) : (
          <p>Not found.</p>
        )}
      </section>
    </>
  );
};

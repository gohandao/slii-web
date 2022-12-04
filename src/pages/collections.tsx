import type { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useContext, useEffect, useRef } from "react";
import * as Scroll from "react-scroll";

import { BaseLayout } from "@/components/BaseLayout";
import { CollectionsIndexScreen } from "@/components/CollectionsIndexScreen";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { getContentsHeight } from "@/utilities/getContentsHeight";

const CollectionsPage: NextPage = () => {
  const router = useRouter();
  const { order, page, search, sort, term, type, username } = router.query;
  const currentPage = page ? Number(page) : undefined;

  const params = {
    order: order as string,
    page: currentPage,
    search: search as string,
    sort: sort as string,
    term: term as string,
    type: type as string,
  };

  const { prevHeight, scrollY, setHeaderIcon, setHiddenParams, setPrevHeight, setScrollY } =
    useContext(UtilitiesContext);

  const new_scrollY = useRef(scrollY);
  const new_height = useRef(0);

  useEffect(() => {
    const scroll = Scroll.animateScroll;
    if (scrollY) {
      scroll.scrollTo(scrollY, { duration: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let body_height = 0;
  if (typeof window === "object") {
    const body_element = document.getElementById("container");
    body_height = body_element ? body_element.scrollHeight : 0;
  }
  const contents_height = getContentsHeight();

  useEffect(() => {
    new_height.current = contents_height;
    if (new_height.current) {
      setPrevHeight(new_height.current);
    }
    window.addEventListener("scroll", async () => {
      new_scrollY.current = window.scrollY;
      if (new_scrollY.current) {
        setScrollY(new_scrollY.current);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [new_scrollY, body_height]);

  useEffect(() => {
    setHiddenParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, sort, term, page, type, search, username]);
  useEffect(() => {
    setHeaderIcon({
      avatar: "",
      emoji: "",
      path: "/",
      title: "",
      type: "home",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div
        style={{
          minHeight: `${prevHeight}px`,
        }}
      >
        <BaseLayout>
          <CollectionsIndexScreen />
        </BaseLayout>
      </div>
    </div>
  );
};

export default CollectionsPage;

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import * as Scroll from "react-scroll";

import { BaseLayout } from "@/components/BaseLayout";
import { CreatorsIndexScreen } from "@/components/CreatorsIndexScreen";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { getContentsHeight } from "@/utilities/getContentsHeight";

const Home: NextPage = () => {
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

  const new_scrollY = useRef<number | undefined>(scrollY);
  const new_height = useRef<number>(0);
  useEffect(() => {
    const scroll = Scroll.animateScroll;
    if (scrollY) {
      scroll.scrollTo(scrollY, { duration: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let body_height = 0;
  let inner_height = 0;
  if (typeof window === "object") {
    const body_element = document.getElementById("container");
    body_height = body_element ? body_element.scrollHeight : 0;
    inner_height = window.innerHeight;
  }
  const contents_height = getContentsHeight();

  useEffect(() => {
    new_height.current = contents_height;
    if (new_height.current && inner_height != new_height.current) {
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
      <div
        style={{
          minHeight: `${prevHeight}px`,
        }}
        className="flex flex-col"
      >
        <BaseLayout>
          <CreatorsIndexScreen params={params} />
        </BaseLayout>
      </div>
    </div>
  );
};

export default Home;

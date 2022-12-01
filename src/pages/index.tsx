import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useRef } from "react";
import * as Scroll from "react-scroll";
// utilities
import { getContentsHeight } from "@/utilities/getContentsHeight";
// contexts
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
// components
import { BaseLayout } from "@/components/BaseLayout";
import { CreatorsIndexScreen } from "@/components/CreatorsIndexScreen";

const Home: NextPage = () => {
  const router = useRouter();
  const { order, sort, term, page, type, search, username, screen } =
    router.query;
  const currentPage = page ? Number(page) : undefined;

  const params = {
    type: type as string,
    page: currentPage,
    search: search as string,
    order: order as string,
    sort: sort as string,
    term: term as string,
  };

  const {
    setHeaderIcon,
    setHiddenParams,
    setScrollY,
    scrollY,
    prevHeight,
    setPrevHeight,
  } = useContext(UtilitiesContext);

  const new_scrollY = useRef(scrollY);
  const new_height = useRef(0);
  useEffect(() => {
    var scroll = Scroll.animateScroll;
    if (scrollY) {
      scroll.scrollTo(scrollY, { duration: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let body_height = 0;
  let list_height = 0;
  let inner_height = 0;
  if (typeof window === "object") {
    const body_element = document.getElementById("container");
    const list_element = document.getElementById("list");
    body_height = body_element ? body_element.scrollHeight : 0;
    list_height = list_element ? list_element.scrollHeight : 0;
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
      title: "",
      emoji: "",
      avatar: "",
      path: "/",
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

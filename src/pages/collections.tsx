import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useState, useEffect, useContext, useRef } from "react";
import * as Scroll from "react-scroll";

import { CreatorList } from "@/components/CreatorList";
import { CollectionTable } from "@/components/CollectionTable";
import { SearchArea } from "@/components/SearchArea";

import { BreadCrumbs } from "@/components/BreadCrumbs";

import { Mainvisual } from "@/components/Mainvisual";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { Hr } from "@/components/Hr";
import { Title } from "@/components/Title";
import { LinkButton } from "@/components/LinkButton";

import { TagList } from "@/components/TagList";

import { CreatorsContext } from "@/contexts/CreatorsContext";
import { BaseContext } from "@/contexts/BaseContext";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

import { Tag } from "@/types/tag";
import { Searchbox } from "@/components/Searchbox";
import { Tab } from "@/components/Tab";
import { Dropdown } from "@/components/Dropdown";
import { OrderButton } from "@/components/OrderButton";
import { CollectionList } from "@/components/CollectionList";
import { Collection } from "@/types/collection";
import { sortList } from "@/libs/sortList";
import { TabIndex } from "@/components/TabIndex";
import { CollectionsIndexScreen } from "@/components/CollectionsIndexScreen";
import { removeUndefinedObject } from "@/utilities/removeUndefinedObject";
import { NextSeo } from "next-seo";
import { getContentsHeight } from "@/utilities/getContentsHeight";

const CollectionsPage: NextPage = () => {
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
  // const new_params = removeUndefinedObject(params);

  const {
    setHeaderIcon,
    setHiddenParams,
    setScrollY,
    scrollY,
    prevHeight,
    setPrevHeight,
  } = useContext(UtilitiesContext);

  // let new_scrollY = scrollY;
  const new_scrollY = useRef(scrollY);
  const new_height = useRef(0);

  // scrollY && window.scrollTo(0, scrollY);

  // console.log("initial scrollY");
  // console.log(scrollY);

  // var scroll = Scroll.animateScroll;
  // if (scrollY && scrollY != 0) {
  //   scroll.scrollTo(scrollY, { duration: 0 });
  // }

  // var scroll = Scroll.animateScroll;
  // if (scrollY && scrollY != 0) {
  //   scroll.scrollTo(scrollY, { duration: 0 });
  // }
  useEffect(() => {
    var scroll = Scroll.animateScroll;
    if (scrollY) {
      // if (scrollY && scrollY != 0) {
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
    // new_height.current = document.body.scrollHeight;
    new_height.current = contents_height;
    // if (new_height.current && new_height.current != 0) {
    if (new_height.current) {
      setPrevHeight(new_height.current);
    }

    // if (scrollY && scrollY != 0) {
    //   window.scrollTo(0, scrollY);
    // }
    // // window.scrollTo(0, scrollY);
    // var scroll = Scroll.animateScroll;
    // if (scrollY && scrollY != 0) {
    //   scroll.scrollTo(scrollY, { duration: 0 });
    // }
    window.addEventListener("scroll", async () => {
      new_scrollY.current = window.scrollY;
      // console.log(new_scrollY.current);
      // if (new_scrollY.current && new_scrollY.current != 0) {
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
      {/* <Head>
        <title>
          NFT OTAKU | Search Japanese NFT creators, projects, collections.
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <NextSeo
        title="All NFT Collections in Japan | NFT OTAKU"
        description="Find NFT colllections created by Japanese NFT artists and projects."
        openGraph={{
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/collections",
          title: "All NFT Collections in Japan | NFT OTAKU",
          description:
            "Find NFT colllections created by Japanese NFT artists and projects.",
        }}
      />
      <div
        style={{
          minHeight: `${prevHeight}px`,
        }}
      >
        <BaseLayout>
          <CollectionsIndexScreen params={params} />
        </BaseLayout>
      </div>
    </div>
  );
};

export default CollectionsPage;

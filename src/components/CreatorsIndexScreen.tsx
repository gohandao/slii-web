import type { NextPage } from "next";
import Head from "next/head";
import * as Scroll from "react-scroll";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useState, useEffect, useContext } from "react";

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
import { FaLongArrowAltDown } from "react-icons/fa";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { TbArrowBigDownLine, TbArrowBigUpLine } from "react-icons/tb";
import { setParams } from "@/utilities/setParams";
import { OrderButton } from "@/components/OrderButton";
import { Creator } from "@/types/creator";
import { sortList } from "@/libs/sortList";
import { TabIndex } from "@/components/TabIndex";
import { getNFTs } from "@/utilities/getNFTs";
import { ScreenModal } from "@/components/ScreenModal";
import { CreatorScreen } from "@/components/CreatorScreen";
import { Params } from "@/types/params";

type Props = {
  params?: Params;
};
export const CreatorsIndexScreen = ({ params }: Props) => {
  const router = useRouter();
  const type = params && params.type;
  const page = params && params.page;
  const search = params && params.search;
  const order = params && params.order;
  const sort = params && params.sort;
  const term = params && params.term;

  const currentPage = page ? Number(page) : 1;
  const [creatorModal, setCreatorModal] = useState<boolean>(false);

  const limit = 10;
  const [sortedCreators, setSortedCreators] = useState<Creator[]>([]);

  const { creators, collections, tags } = useContext(BaseContext);
  const { setHeaderIcon, setBreadcrumbList } = useContext(UtilitiesContext);

  // const filteredCreators = creators;

  const filteredCreators =
    type && type != "all"
      ? creators.filter((creator) => creator.type === type)
      : creators;

  const uppperKeyword = typeof search == "string" && search.toUpperCase();
  //1.match username
  const searchedCreators01 = filteredCreators.filter(
    (creator) =>
      typeof search == "string" &&
      //すべて大文字にして大文字小文字の区別をなくす
      //@ts-ignore
      creator.username.toUpperCase().includes(uppperKeyword) == true
  );
  // //2.match description
  // const searchedCreators02 = filteredCreators.filter(
  //   (creator) =>
  //     typeof search == "string" &&
  //     //@ts-ignore
  //     creator.description &&
  //     //@ts-ignore
  //     creator.description.toUpperCase().includes(uppperKeyword) == true
  // );
  const origin_searchedCreators = [
    ...searchedCreators01,
    // ...searchedCreators02,
  ];
  //重複削除
  let searchedCreators = [] as Creator[];
  if (search && search.length > 0) {
    searchedCreators = Array.from(new Set(origin_searchedCreators));
  } else {
    searchedCreators = filteredCreators;
  }

  const args = {
    property: "creators" as "creators" | "collections",
    list: searchedCreators,
    page: currentPage,
    order: order as "desc" | "asc" | undefined,
    sort: sort as string | undefined,
    term: term as "24h" | "7d" | "30d" | "all" | undefined,
    //category: collectionsSort,
    limit: limit,
  };

  useEffect(() => {
    const data = sortList(args);
    setSortedCreators((sortedCreators) => data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    setHeaderIcon({
      title: "",
      emoji: "",
      avatar: "",
      path: "/",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setCreatorModal(params.username ? true : false);
  // }, [params.username]);
  // const [first, setfirst] = useState(false);
  // useEffect(() => {
  //   // window.scrollTo(0, scrollY);
  //   var scroll = Scroll.animateScroll;

  //   scroll.scrollTo(100);
  // }, []);

  return (
    <>
      <section className="mx-auto px-5 lg:px-8">
        <div className="">
          <TabIndex />
        </div>
        <div className="flex gap-3 mb-2">
          <div className="flex gap-3 items-baseline">
            <p className="text-gray-500 text-sm">
              {searchedCreators.length} Creators
            </p>
          </div>
        </div>
        <div className="relative flex gap-3 z-20 justify-between mb-3 sm:gap-5">
          <Dropdown position="left" property="creatorType" />
          <Searchbox id="creator" />
          <div className="flex items-center gap-3">
            <Dropdown position="right" property="creatorSort" />
            <OrderButton />
          </div>
        </div>
        <div className="mb-10">
          {searchedCreators.length > 0 && (
            <CreatorList creators={sortedCreators} limit={limit} />
          )}
        </div>
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            length={searchedCreators.length}
            limit={limit}
          />
        </div>
      </section>
    </>
  );
};

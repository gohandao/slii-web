import React, { useState, useContext } from "react";
import Link from "next/link";

import { UtilitiesContext } from "@/contexts/UtilitiesContext";

type Props = {
  type: "creator" | "collection";
};
export const Categories = ({ type }: Props) => {
  const { setCreatorCategory, setCollectionCategory } =
    useContext(UtilitiesContext);
  const categories = [
    "All",
    "PFP",
    "Art",
    "Metaverse",
    "Game",
    "Sports",
    "Sounds",
    "Photography",
    "Earning",
    "Utilities",
  ];
  const changeCategoryHandler = (category: string) => {
    if (type == "creator") {
      setCreatorCategory(category);
    }
    if (type == "collection") {
      setCollectionCategory(category);
    }
  };
  return categories.map((category, index) => (
    <button
      key={index}
      onClick={() => {
        changeCategoryHandler(category);
      }}
    >
      {category}
    </button>
  ));
};

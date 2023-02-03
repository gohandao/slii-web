import type { Filter } from "@/types/filter";

export const combinedFilterMenus = {
  //順番に意味がある
  /*eslint-disable*/
  sort: [
    {
      param: "upvotes_count",
      title: "Popular",
    },
    {
      param: "name",
      title: "Name",
    },
  ],
  order: [
    {
      param: "desc",
      title: "Desc",
    },
    {
      param: "asc",
      title: "Asc",
    },
  ],
} as Filter;

export const creatorsFilterMenus = {
  //順番に意味がある
  /*eslint-disable*/
  type: [
    {
      param: "creator",
      title: "Creator",
    },
    {
      param: "project",
      title: "Project",
    },
    {
      param: "company",
      title: "Company",
    },
  ],
  sort: [
    {
      param: "upvotes_count",
      title: "Popular",
    },
    {
      param: "name",
      title: "Name",
    },
  ],
  order: [
    {
      param: "desc",
      title: "Desc",
    },
    {
      param: "asc",
      title: "Asc",
    },
  ],
} as Filter;

export const collectionsFilterMenus = {
  //順番に意味がある
  /*eslint-disable*/
  type: [
    {
      param: "creator",
      title: "Creator",
    },
    {
      param: "project",
      title: "Project",
    },
    {
      param: "company",
      title: "Company",
    },
  ],
  sort: [
    {
      param: "upvotes_count",
      title: "Popular",
    },
    {
      param: "name",
      title: "Name",
    },
  ],
  order: [
    {
      param: "desc",
      title: "Desc",
    },
    {
      param: "asc",
      title: "Asc",
    },
  ],
} as Filter;

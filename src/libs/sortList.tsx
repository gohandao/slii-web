import React from "react";

type sortInitProps = {
  list: any;
  limit?: number;
};
/*export const sortInitList = (list: any, limit: any) => {
  let new_list = [];
  new_list = list.sort(function (a: any, b: any) {
    if (a.stats.total_volume < b.stats.total_volume) return 1;
    if (a.stats.total_volume > b.stats.total_volume) return -1;
    return 0;
  });
  const unique_list = Array.from(new Set(new_list));
  new_list = unique_list;
  //setList(new_list);
  if (limit) {
    let limited_list = [] as any[];
    for (let index = 0; index < limit; index++) {
      limited_list = [...limited_list, unique_list[index]];
    }
    new_list = limited_list;
  }
  return new_list;
};*/

type sortProps = {
  list: any[];
  order: "desc" | "asc";
  sort?: string;
  limit?: number;
};
export const sortList = (args: sortProps) => {
  let new_list = [];
  let new_order = args.order == "desc" ? "asc" : "desc";
  switch (args.sort) {
    case "Total Volume":
      new_list = args.list.sort(function (a: any, b: any) {
        if (args.order == "desc") {
          if (a.stats.total_volume < b.stats.total_volume) return 1;
          if (a.stats.total_volume > b.stats.total_volume) return -1;
          return 0;
        } else {
          if (a.stats.total_volume < b.stats.total_volume) return -1;
          if (a.stats.total_volume > b.stats.total_volume) return 1;
          return 0;
        }
      });
      new_list = Array.from(new Set(new_list));
      break;
    case "Collection Name":
      new_list = args.list.sort(function (a: any, b: any) {
        if (args.order == "desc") {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        } else {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }
      });
      new_list = Array.from(new Set(new_list));
      //setList(new_list);
      break;
    case "Price Low to High":
      new_list = args.list.sort(function (a: any, b: any) {
        if (a.stats.floor_price < b.stats.floor_price) return -1;
        if (a.stats.floor_price > b.stats.floor_price) return 1;
        return 0;
      });
      new_list = Array.from(new Set(new_list));
      //setList(new_list);
      break;
    case "Price High to Low":
      new_list = args.list.sort(function (a: any, b: any) {
        if (a.stats.floor_price < b.stats.floor_price) return 1;
        if (a.stats.floor_price > b.stats.floor_price) return -1;
        return 0;
      });
      new_list = Array.from(new Set(new_list));
      break;
    case "24h %":
      new_list = args.list.sort(function (a: any, b: any) {
        if (args.order == "desc") {
          if (a.stats.one_day_change < b.stats.one_day_change) return 1;
          if (a.stats.one_day_change > b.stats.one_day_change) return -1;
          return 0;
        } else {
          if (a.stats.one_day_change < b.stats.one_day_change) return -1;
          if (a.stats.one_day_change > b.stats.one_day_change) return 1;
          return 0;
        }
      });
      new_list = Array.from(new Set(new_list));
      break;
    case "30d %":
      new_list = args.list.sort(function (a: any, b: any) {
        if (args.order == "desc") {
          if (a.stats.thirty_day_change < b.stats.thirty_day_change) return 1;
          if (a.stats.thirty_day_change > b.stats.thirty_day_change) return -1;
          return 0;
        } else {
          if (a.stats.thirty_day_change < b.stats.thirty_day_change) return -1;
          if (a.stats.thirty_day_change > b.stats.thirty_day_change) return 1;
          return 0;
        }
      });
      new_list = Array.from(new Set(new_list));
      break;
    case "7d %":
      new_list = args.list.sort(function (a: any, b: any) {
        if (args.order == "desc") {
          if (a.stats.seven_day_change < b.stats.seven_day_change) return 1;
          if (a.stats.seven_day_change > b.stats.seven_day_change) return -1;
          return 0;
        } else {
          if (a.stats.seven_day_change < b.stats.seven_day_change) return -1;
          if (a.stats.seven_day_change > b.stats.seven_day_change) return 1;
          return 0;
        }
      });
      new_list = Array.from(new Set(new_list));
      break;
    case "Owners":
      new_list = args.list.sort(function (a: any, b: any) {
        if (args.order == "desc") {
          if (a.stats.num_owners < b.stats.num_owners) return 1;
          if (a.stats.num_owners > b.stats.num_owners) return -1;
          return 0;
        } else {
          if (a.stats.num_owners < b.stats.num_owners) return -1;
          if (a.stats.num_owners > b.stats.num_owners) return 1;
          return 0;
        }
      });
      new_list = Array.from(new Set(new_list));
      break;
    case "Items":
      new_list = args.list.sort(function (a: any, b: any) {
        if (args.order == "desc") {
          if (a.stats.total_supply < b.stats.total_supply) return 1;
          if (a.stats.total_supply > b.stats.total_supply) return -1;
          return 0;
        } else {
          if (a.stats.total_supply < b.stats.total_supply) return -1;
          if (a.stats.total_supply > b.stats.total_supply) return 1;
          return 0;
        }
      });
      new_list = Array.from(new Set(new_list));
      break;

    default:
      new_list = args.list.sort(function (a: any, b: any) {
        if (a.stats.total_volume < b.stats.total_volume) return 1;
        if (a.stats.total_volume > b.stats.total_volume) return -1;
        return 0;
      });
      new_list = Array.from(new Set(new_list));
      break;
  }
  if (args.limit) {
    let limited_list = [] as any[];
    for (let index = 0; index < args.limit; index++) {
      limited_list = [...limited_list, new_list[index]];
    }
    return limited_list;
  } else {
    return new_list;
  }
};

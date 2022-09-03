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
  order?: "desc" | "asc";
  term?: "24h" | "7d" | "30d" | "all";
  sortBy?: string;
  limit?: number;
};
export const sortList = (args: sortProps) => {
  let new_list = [];
  let new_order = args.order == "desc" ? "asc" : "desc";
  switch (args.sortBy) {
    case "twitter":
      new_list = args.list.sort(function (a: any, b: any) {
        if (
          a.twitter_followers !== a.twitter_followers &&
          b.twitter_followers !== b.twitter_followers
        )
          return 0;
        if (a.twitter_followers !== a.twitter_followers) return 1;
        if (b.twitter_followers !== b.twitter_followers) return -1;

        if (a.twitter_followers == null && b.twitter_followers == null)
          return 0;
        if (a.twitter_followers == null) return 1;
        if (b.twitter_followers == null) return -1;

        if (a.twitter_followers === "" && b.twitter_followers === "") return 0;
        if (a.twitter_followers === "") return 1;
        if (b.twitter_followers === "") return -1;

        var sig = args.order == "desc" ? 1 : -1;
        return a.twitter_followers < b.twitter_followers
          ? sig
          : a.twitter_followers > b.twitter_followers
          ? -sig
          : 0;
      });
      new_list = Array.from(new Set(new_list));
      break;
    case "discord":
      new_list = args.list.sort(function (a: any, b: any) {
        if (
          a.discord_members !== a.discord_members &&
          b.discord_members !== b.discord_members
        )
          return 0;
        if (a.discord_members !== a.discord_members) return 1;
        if (b.discord_members !== b.discord_members) return -1;

        if (a.discord_members == null && b.discord_members == null) return 0;
        if (a.discord_members == null) return 1;
        if (b.discord_members == null) return -1;

        if (a.discord_members === "" && b.discord_members === "") return 0;
        if (a.discord_members === "") return 1;
        if (b.discord_members === "") return -1;

        var sig = args.order == "desc" ? 1 : -1;
        return a.discord_members < b.discord_members
          ? sig
          : a.discord_members > b.discord_members
          ? -sig
          : 0;
      });
      new_list = Array.from(new Set(new_list));
      break;
    case "volume":
      switch (args.term) {
        case "24h":
          new_list = args.list.sort(function (a: any, b: any) {
            if (args.order == "desc") {
              if (a.stats.one_day_volume < b.stats.one_day_volume) return 1;
              if (a.stats.one_day_volume > b.stats.one_day_volume) return -1;
              return 0;
            } else {
              if (a.stats.one_day_volume < b.stats.one_day_volume) return -1;
              if (a.stats.one_day_volume > b.stats.one_day_volume) return 1;
              return 0;
            }
          });
          break;
        case "7d":
          new_list = args.list.sort(function (a: any, b: any) {
            if (args.order == "desc") {
              if (a.stats.seven_day_volume < b.stats.seven_day_volume) return 1;
              if (a.stats.seven_day_volume > b.stats.seven_day_volume)
                return -1;
              return 0;
            } else {
              if (a.stats.seven_day_volume < b.stats.seven_day_volume)
                return -1;
              if (a.stats.seven_day_volume > b.stats.seven_day_volume) return 1;
              return 0;
            }
          });
          break;
        case "30d":
          new_list = args.list.sort(function (a: any, b: any) {
            if (args.order == "desc") {
              if (a.stats.thirty_day_volume < b.stats.thirty_day_volume)
                return 1;
              if (a.stats.thirty_day_volume > b.stats.thirty_day_volume)
                return -1;
              return 0;
            } else {
              if (a.stats.thirty_day_volume < b.stats.thirty_day_volume)
                return -1;
              if (a.stats.thirty_day_volume > b.stats.thirty_day_volume)
                return 1;
              return 0;
            }
          });
          break;
        default:
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
          break;
      }
      new_list = Array.from(new Set(new_list));
      break;
    case "name":
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
    case "price":
      new_list = args.list.sort(function (a: any, b: any) {
        if (a.stats.floor_price < b.stats.floor_price) return -1;
        if (a.stats.floor_price > b.stats.floor_price) return 1;
        return 0;
      });
      new_list = Array.from(new Set(new_list));
      //setList(new_list);
      break;
    case "average_price":
      switch (args.term) {
        case "24h":
          new_list = args.list.sort(function (a: any, b: any) {
            if (args.order == "desc") {
              if (a.stats.one_day_average_price < b.stats.one_day_average_price)
                return 1;
              if (a.stats.one_day_average_price > b.stats.one_day_average_price)
                return -1;
              return 0;
            } else {
              if (a.stats.one_day_average_price < b.stats.one_day_average_price)
                return -1;
              if (a.stats.one_day_average_price > b.stats.one_day_average_price)
                return 1;
              return 0;
            }
          });
          break;
        case "7d":
          new_list = args.list.sort(function (a: any, b: any) {
            if (args.order == "desc") {
              if (
                a.stats.seven_day_average_price <
                b.stats.seven_day_average_price
              )
                return 1;
              if (
                a.stats.seven_day_average_price >
                b.stats.seven_day_average_price
              )
                return -1;
              return 0;
            } else {
              if (
                a.stats.seven_day_average_price <
                b.stats.seven_day_average_price
              )
                return -1;
              if (
                a.stats.seven_day_average_price >
                b.stats.seven_day_average_price
              )
                return 1;
              return 0;
            }
          });
          break;
        case "30d":
          new_list = args.list.sort(function (a: any, b: any) {
            if (args.order == "desc") {
              if (
                a.stats.thirty_day_average_price <
                b.stats.thirty_day_average_price
              )
                return 1;
              if (
                a.stats.thirty_day_average_price >
                b.stats.thirty_day_average_price
              )
                return -1;
              return 0;
            } else {
              if (
                a.stats.thirty_day_average_price <
                b.stats.thirty_day_average_price
              )
                return -1;
              if (
                a.stats.thirty_day_average_price >
                b.stats.thirty_day_average_price
              )
                return 1;
              return 0;
            }
          });
          break;
        default:
          new_list = args.list.sort(function (a: any, b: any) {
            if (args.order == "desc") {
              if (a.stats.average_price < b.stats.average_price) return 1;
              if (a.stats.average_price > b.stats.average_price) return -1;
              return 0;
            } else {
              if (a.stats.average_price < b.stats.average_price) return -1;
              if (a.stats.average_price > b.stats.average_price) return 1;
              return 0;
            }
          });
          break;
      }
      new_list = Array.from(new Set(new_list));
      break;
    case "change":
      switch (args.term) {
        case "24h":
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
          break;
        case "7d":
          new_list = args.list.sort(function (a: any, b: any) {
            if (args.order == "desc") {
              if (a.stats.seven_day_change < b.stats.seven_day_change) return 1;
              if (a.stats.seven_day_change > b.stats.seven_day_change)
                return -1;
              return 0;
            } else {
              if (a.stats.seven_day_change < b.stats.seven_day_change)
                return -1;
              if (a.stats.seven_day_change > b.stats.seven_day_change) return 1;
              return 0;
            }
          });
          break;
        case "30d":
          new_list = args.list.sort(function (a: any, b: any) {
            if (args.order == "desc") {
              if (a.stats.thirty_day_change < b.stats.thirty_day_change)
                return 1;
              if (a.stats.thirty_day_change > b.stats.thirty_day_change)
                return -1;
              return 0;
            } else {
              if (a.stats.thirty_day_change < b.stats.thirty_day_change)
                return -1;
              if (a.stats.thirty_day_change > b.stats.thirty_day_change)
                return 1;
              return 0;
            }
          });
          break;
        default:
          new_list = args.list;
          break;
      }
      new_list = Array.from(new Set(new_list));
      break;
    case "sales":
      switch (args.term) {
        case "24h":
          new_list = args.list.sort(function (a: any, b: any) {
            if (args.order == "desc") {
              if (a.stats.one_day_sales < b.stats.one_day_sales) return 1;
              if (a.stats.one_day_sales > b.stats.one_day_sales) return -1;
              return 0;
            } else {
              if (a.stats.one_day_sales < b.stats.one_day_sales) return -1;
              if (a.stats.one_day_sales > b.stats.one_day_sales) return 1;
              return 0;
            }
          });
          break;
        case "7d":
          new_list = args.list.sort(function (a: any, b: any) {
            if (args.order == "desc") {
              if (a.stats.seven_day_sales < b.stats.seven_day_sales) return 1;
              if (a.stats.seven_day_sales > b.stats.seven_day_sales) return -1;
              return 0;
            } else {
              if (a.stats.seven_day_sales < b.stats.seven_day_sales) return -1;
              if (a.stats.seven_day_sales > b.stats.seven_day_sales) return 1;
              return 0;
            }
          });
          break;
        case "30d":
          new_list = args.list.sort(function (a: any, b: any) {
            if (args.order == "desc") {
              if (a.stats.thirty_day_sales < b.stats.thirty_day_sales) return 1;
              if (a.stats.thirty_day_sales > b.stats.thirty_day_sales)
                return -1;
              return 0;
            } else {
              if (a.stats.thirty_day_sales < b.stats.thirty_day_sales)
                return -1;
              if (a.stats.thirty_day_sales > b.stats.thirty_day_sales) return 1;
              return 0;
            }
          });
          break;
        default:
          new_list = args.list.sort(function (a: any, b: any) {
            if (args.order == "desc") {
              if (a.stats.sales < b.stats.sales) return 1;
              if (a.stats.sales > b.stats.sales) return -1;
              return 0;
            } else {
              if (a.stats.sales < b.stats.sales) return -1;
              if (a.stats.sales > b.stats.sales) return 1;
              return 0;
            }
          });
          break;
      }
      new_list = Array.from(new Set(new_list));
      break;
    case "owners":
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
    case "items":
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

type sortProps = {
  limit?: number;
  list: any[];
  order?: "desc" | "asc";
  page?: number;
  property: "creators" | "collections";
  sort?: string;
  term?: "1h" | "6h" | "24h" | "7d" | "30d" | "all";
};
export const sortList = (args: sortProps) => {
  let new_list = [];
  // const new_order = args.order == "desc" ? "asc" : "desc";
  switch (args.sort) {
    case "upvotes":
    case "popular":
      new_list = args.list.sort((a: any, b: any) => {
        if (a.upvotes_count !== a.upvotes_count && b.upvotes_count !== b.upvotes_count) return 0;
        if (a.upvotes_count !== a.upvotes_count) return 1;
        if (b.upvotes_count !== b.upvotes_count) return -1;

        if (a.upvotes_count == null && b.upvotes_count == null) return 0;
        if (a.upvotes_count == null) return 1;
        if (b.upvotes_count == null) return -1;

        if (a.upvotes_count === "" && b.upvotes_count === "") return 0;
        if (a.upvotes_count === "") return 1;
        if (b.upvotes_count === "") return -1;

        const sig = args.order == "desc" || !args.order ? 1 : -1;
        return a.upvotes_count < b.upvotes_count ? sig : a.upvotes_count > b.upvotes_count ? -sig : 0;
      });
      new_list = Array.from(new Set(new_list));
      break;
    case "listed_at":
      new_list = args.list.sort((a: any, b: any) => {
        if (a.listed_at !== a.listed_at && b.listed_at !== b.listed_at) return 0;
        if (a.listed_at !== a.listed_at) return 1;
        if (b.listed_at !== b.listed_at) return -1;

        if (a.listed_at == null && b.listed_at == null) return 0;
        if (a.listed_at == null) return 1;
        if (b.listed_at == null) return -1;

        if (a.listed_at === "" && b.listed_at === "") return 0;
        if (a.listed_at === "") return 1;
        if (b.listed_at === "") return -1;

        const sig = args.order == "desc" || !args.order ? 1 : -1;
        return a.listed_at < b.listed_at ? sig : a.listed_at > b.listed_at ? -sig : 0;
      });
      new_list = Array.from(new Set(new_list));
      break;
    case "created_at":
      new_list = args.list.sort((a: any, b: any) => {
        if (a.created_date !== a.created_date && b.created_date !== b.created_date) return 0;
        if (a.created_date !== a.created_date) return 1;
        if (b.created_date !== b.created_date) return -1;

        if (a.created_date == null && b.created_date == null) return 0;
        if (a.created_date == null) return 1;
        if (b.created_date == null) return -1;

        if (a.created_date === "" && b.created_date === "") return 0;
        if (a.created_date === "") return 1;
        if (b.created_date === "") return -1;

        const sig = args.order == "desc" || !args.order ? 1 : -1;
        return a.created_date < b.created_date ? sig : a.created_date > b.created_date ? -sig : 0;
      });
      new_list = Array.from(new Set(new_list));
      break;
    case "twitter":
      new_list = args.list.sort((a: any, b: any) => {
        if (a.twitter_followers !== a.twitter_followers && b.twitter_followers !== b.twitter_followers) return 0;
        if (a.twitter_followers !== a.twitter_followers) return 1;
        if (b.twitter_followers !== b.twitter_followers) return -1;

        if (a.twitter_followers == null && b.twitter_followers == null) return 0;
        if (a.twitter_followers == null) return 1;
        if (b.twitter_followers == null) return -1;

        if (a.twitter_followers === "" && b.twitter_followers === "") return 0;
        if (a.twitter_followers === "") return 1;
        if (b.twitter_followers === "") return -1;

        const sig = args.order == "desc" || !args.order ? 1 : -1;
        return a.twitter_followers < b.twitter_followers ? sig : a.twitter_followers > b.twitter_followers ? -sig : 0;
      });
      new_list = Array.from(new Set(new_list));
      break;
    case "discord":
      new_list = args.list.sort((a: any, b: any) => {
        if (a.discord_members !== a.discord_members && b.discord_members !== b.discord_members) return 0;
        if (a.discord_members !== a.discord_members) return 1;
        if (b.discord_members !== b.discord_members) return -1;

        if (a.discord_members == null && b.discord_members == null) return 0;
        if (a.discord_members == null) return 1;
        if (b.discord_members == null) return -1;

        if (a.discord_members === "" && b.discord_members === "") return 0;
        if (a.discord_members === "") return 1;
        if (b.discord_members === "") return -1;

        const sig = args.order == "desc" || !args.order ? 1 : -1;
        return a.discord_members < b.discord_members ? sig : a.discord_members > b.discord_members ? -sig : 0;
      });
      new_list = Array.from(new Set(new_list));
      break;
    case "volume":
      switch (args.term) {
        case "1h":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.one_hour_volume !== a.stats.one_hour_volume &&
              b.stats.one_hour_volume !== b.stats.one_hour_volume
            )
              return 0;
            if (a.stats.one_hour_volume !== a.stats.one_hour_volume) return 1;
            if (b.stats.one_hour_volume !== b.stats.one_hour_volume) return -1;

            if (a.stats.one_hour_volume == null && b.stats.one_hour_volume == null) return 0;
            if (a.stats.one_hour_volume == null) return 1;
            if (b.stats.one_hour_volume == null) return -1;

            if (a.stats.one_hour_volume === "" && b.stats.one_hour_volume === "") return 0;
            if (a.stats.one_hour_volume === "") return 1;
            if (b.stats.one_hour_volume === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.one_hour_volume < b.stats.one_hour_volume
              ? sig
              : a.stats.one_hour_volume > b.stats.one_hour_volume
              ? -sig
              : 0;
          });
          break;
        case "6h":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.six_hour_volume !== a.stats.six_hour_volume &&
              b.stats.six_hour_volume !== b.stats.six_hour_volume
            )
              return 0;
            if (a.stats.six_hour_volume !== a.stats.six_hour_volume) return 1;
            if (b.stats.six_hour_volume !== b.stats.six_hour_volume) return -1;

            if (a.stats.six_hour_volume == null && b.stats.six_hour_volume == null) return 0;
            if (a.stats.six_hour_volume == null) return 1;
            if (b.stats.six_hour_volume == null) return -1;

            if (a.stats.six_hour_volume === "" && b.stats.six_hour_volume === "") return 0;
            if (a.stats.six_hour_volume === "") return 1;
            if (b.stats.six_hour_volume === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.six_hour_volume < b.stats.six_hour_volume
              ? sig
              : a.stats.six_hour_volume > b.stats.six_hour_volume
              ? -sig
              : 0;
          });
          break;
        case "24h":
          new_list = args.list.sort((a: any, b: any) => {
            if (a.stats.one_day_volume !== a.stats.one_day_volume && b.stats.one_day_volume !== b.stats.one_day_volume)
              return 0;
            if (a.stats.one_day_volume !== a.stats.one_day_volume) return 1;
            if (b.stats.one_day_volume !== b.stats.one_day_volume) return -1;

            if (a.stats.one_day_volume == null && b.stats.one_day_volume == null) return 0;
            if (a.stats.one_day_volume == null) return 1;
            if (b.stats.one_day_volume == null) return -1;

            if (a.stats.one_day_volume === "" && b.stats.one_day_volume === "") return 0;
            if (a.stats.one_day_volume === "") return 1;
            if (b.stats.one_day_volume === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.one_day_volume < b.stats.one_day_volume
              ? sig
              : a.stats.one_day_volume > b.stats.one_day_volume
              ? -sig
              : 0;
          });
          break;
        case "7d":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.seven_day_volume !== a.stats.seven_day_volume &&
              b.stats.seven_day_volume !== b.stats.seven_day_volume
            )
              return 0;
            if (a.stats.seven_day_volume !== a.stats.seven_day_volume) return 1;
            if (b.stats.seven_day_volume !== b.stats.seven_day_volume) return -1;

            if (a.stats.seven_day_volume == null && b.stats.seven_day_volume == null) return 0;
            if (a.stats.seven_day_volume == null) return 1;
            if (b.stats.seven_day_volume == null) return -1;

            if (a.stats.seven_day_volume === "" && b.stats.seven_day_volume === "") return 0;
            if (a.stats.seven_day_volume === "") return 1;
            if (b.stats.seven_day_volume === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.seven_day_volume < b.stats.seven_day_volume
              ? sig
              : a.stats.seven_day_volume > b.stats.seven_day_volume
              ? -sig
              : 0;
          });
          break;
        case "30d":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.thirty_day_volume !== a.stats.thirty_day_volume &&
              b.stats.thirty_day_volume !== b.stats.thirty_day_volume
            )
              return 0;
            if (a.stats.thirty_day_volume !== a.stats.thirty_day_volume) return 1;
            if (b.stats.thirty_day_volume !== b.stats.thirty_day_volume) return -1;

            if (a.stats.thirty_day_volume == null && b.stats.thirty_day_volume == null) return 0;
            if (a.stats.thirty_day_volume == null) return 1;
            if (b.stats.thirty_day_volume == null) return -1;

            if (a.stats.thirty_day_volume === "" && b.stats.thirty_day_volume === "") return 0;
            if (a.stats.thirty_day_volume === "") return 1;
            if (b.stats.thirty_day_volume === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.thirty_day_volume < b.stats.thirty_day_volume
              ? sig
              : a.stats.thirty_day_volume > b.stats.thirty_day_volume
              ? -sig
              : 0;
          });
          break;
        default:
          new_list = args.list.sort((a: any, b: any) => {
            if (a.stats.total_volume !== a.stats.total_volume && b.stats.total_volume !== b.stats.total_volume)
              return 0;
            if (a.stats.total_volume !== a.stats.total_volume) return 1;
            if (b.stats.total_volume !== b.stats.total_volume) return -1;

            if (a.stats.total_volume == null && b.stats.total_volume == null) return 0;
            if (a.stats.total_volume == null) return 1;
            if (b.stats.total_volume == null) return -1;

            if (a.stats.total_volume === "" && b.stats.total_volume === "") return 0;
            if (a.stats.total_volume === "") return 1;
            if (b.stats.total_volume === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.total_volume < b.stats.total_volume
              ? sig
              : a.stats.total_volume > b.stats.total_volume
              ? -sig
              : 0;
          });
          break;
      }
      new_list = Array.from(new Set(new_list));
      break;
    case "name":
      if (args.property == "collections") {
        new_list = args.list.sort((a: any, b: any) => {
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
      }
      if (args.property == "creators") {
        new_list = args.list.sort((a: any, b: any) => {
          if (args.order == "desc") {
            if (a.username < b.username) return 1;
            if (a.username > b.username) return -1;
            return 0;
          } else {
            if (a.username < b.username) return -1;
            if (a.username > b.username) return 1;
            return 0;
          }
        });
      }
      new_list = Array.from(new Set(new_list));
      //setList(new_list);
      break;
    case "floor_price":
      new_list = args.list.sort((a: any, b: any) => {
        if (a.stats.floor_price !== a.stats.floor_price && b.stats.floor_price !== b.stats.floor_price) return 0;
        if (a.stats.floor_price !== a.stats.floor_price) return 1;
        if (b.stats.floor_price !== b.stats.floor_price) return -1;

        if (a.stats.floor_price == null && b.stats.floor_price == null) return 0;
        if (a.stats.floor_price == null) return 1;
        if (b.stats.floor_price == null) return -1;

        if (a.stats.floor_price === "" && b.stats.floor_price === "") return 0;
        if (a.stats.floor_price === "") return 1;
        if (b.stats.floor_price === "") return -1;

        const sig = args.order == "desc" || !args.order ? 1 : -1;
        return a.stats.floor_price < b.stats.floor_price ? sig : a.stats.floor_price > b.stats.floor_price ? -sig : 0;
      });
      new_list = Array.from(new Set(new_list));
      //setList(new_list);
      break;
    case "average_price":
      switch (args.term) {
        case "1h":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.one_hour_average_price !== a.stats.one_hour_average_price &&
              b.stats.one_hour_average_price !== b.stats.one_hour_average_price
            )
              return 0;
            if (a.stats.one_hour_average_price !== a.stats.one_hour_average_price) return 1;
            if (b.stats.one_hour_average_price !== b.stats.one_hour_average_price) return -1;

            if (a.stats.one_hour_average_price == null && b.stats.one_hour_average_price == null) return 0;
            if (a.stats.one_hour_average_price == null) return 1;
            if (b.stats.one_hour_average_price == null) return -1;

            if (a.stats.one_hour_average_price === "" && b.stats.one_hour_average_price === "") return 0;
            if (a.stats.one_hour_average_price === "") return 1;
            if (b.stats.one_hour_average_price === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.one_hour_average_price < b.stats.one_hour_average_price
              ? sig
              : a.stats.one_hour_average_price > b.stats.one_hour_average_price
              ? -sig
              : 0;
          });
          break;
        case "6h":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.six_hour_average_price !== a.stats.six_hour_average_price &&
              b.stats.six_hour_average_price !== b.stats.six_hour_average_price
            )
              return 0;
            if (a.stats.six_hour_average_price !== a.stats.six_hour_average_price) return 1;
            if (b.stats.six_hour_average_price !== b.stats.six_hour_average_price) return -1;

            if (a.stats.six_hour_average_price == null && b.stats.six_hour_average_price == null) return 0;
            if (a.stats.six_hour_average_price == null) return 1;
            if (b.stats.six_hour_average_price == null) return -1;

            if (a.stats.six_hour_average_price === "" && b.stats.six_hour_average_price === "") return 0;
            if (a.stats.six_hour_average_price === "") return 1;
            if (b.stats.six_hour_average_price === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.six_hour_average_price < b.stats.six_hour_average_price
              ? sig
              : a.stats.six_hour_average_price > b.stats.six_hour_average_price
              ? -sig
              : 0;
          });
          break;
        case "24h":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.one_day_average_price !== a.stats.one_day_average_price &&
              b.stats.one_day_average_price !== b.stats.one_day_average_price
            )
              return 0;
            if (a.stats.one_day_average_price !== a.stats.one_day_average_price) return 1;
            if (b.stats.one_day_average_price !== b.stats.one_day_average_price) return -1;

            if (a.stats.one_day_average_price == null && b.stats.one_day_average_price == null) return 0;
            if (a.stats.one_day_average_price == null) return 1;
            if (b.stats.one_day_average_price == null) return -1;

            if (a.stats.one_day_average_price === "" && b.stats.one_day_average_price === "") return 0;
            if (a.stats.one_day_average_price === "") return 1;
            if (b.stats.one_day_average_price === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.one_day_average_price < b.stats.one_day_average_price
              ? sig
              : a.stats.one_day_average_price > b.stats.one_day_average_price
              ? -sig
              : 0;
          });
          break;
        case "7d":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.seven_day_average_price !== a.stats.seven_day_average_price &&
              b.stats.seven_day_average_price !== b.stats.seven_day_average_price
            )
              return 0;
            if (a.stats.seven_day_average_price !== a.stats.seven_day_average_price) return 1;
            if (b.stats.seven_day_average_price !== b.stats.seven_day_average_price) return -1;

            if (a.stats.seven_day_average_price == null && b.stats.seven_day_average_price == null) return 0;
            if (a.stats.seven_day_average_price == null) return 1;
            if (b.stats.seven_day_average_price == null) return -1;

            if (a.stats.seven_day_average_price === "" && b.stats.seven_day_average_price === "") return 0;
            if (a.stats.seven_day_average_price === "") return 1;
            if (b.stats.seven_day_average_price === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.seven_day_average_price < b.stats.seven_day_average_price
              ? sig
              : a.stats.seven_day_average_price > b.stats.seven_day_average_price
              ? -sig
              : 0;
          });
          break;
        case "30d":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.thirty_day_average_price !== a.stats.thirty_day_average_price &&
              b.stats.thirty_day_average_price !== b.stats.thirty_day_average_price
            )
              return 0;
            if (a.stats.thirty_day_average_price !== a.stats.thirty_day_average_price) return 1;
            if (b.stats.thirty_day_average_price !== b.stats.thirty_day_average_price) return -1;

            if (a.stats.thirty_day_average_price == null && b.stats.thirty_day_average_price == null) return 0;
            if (a.stats.thirty_day_average_price == null) return 1;
            if (b.stats.thirty_day_average_price == null) return -1;

            if (a.stats.thirty_day_average_price === "" && b.stats.thirty_day_average_price === "") return 0;
            if (a.stats.thirty_day_average_price === "") return 1;
            if (b.stats.thirty_day_average_price === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.thirty_day_average_price < b.stats.thirty_day_average_price
              ? sig
              : a.stats.thirty_day_average_price > b.stats.thirty_day_average_price
              ? -sig
              : 0;
          });
          break;
        default:
          new_list = args.list.sort((a: any, b: any) => {
            if (a.stats.average_price !== a.stats.average_price && b.stats.average_price !== b.stats.average_price)
              return 0;
            if (a.stats.average_price !== a.stats.average_price) return 1;
            if (b.stats.average_price !== b.stats.average_price) return -1;

            if (a.stats.average_price == null && b.stats.average_price == null) return 0;
            if (a.stats.average_price == null) return 1;
            if (b.stats.average_price == null) return -1;

            if (a.stats.average_price === "" && b.stats.average_price === "") return 0;
            if (a.stats.average_price === "") return 1;
            if (b.stats.average_price === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.average_price < b.stats.average_price
              ? sig
              : a.stats.average_price > b.stats.average_price
              ? -sig
              : 0;
          });
          break;
      }
      new_list = Array.from(new Set(new_list));
      break;
    case "change":
      switch (args.term) {
        case "1h":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.one_hour_change !== a.stats.one_hour_change &&
              b.stats.one_hour_change !== b.stats.one_hour_change
            )
              return 0;
            if (a.stats.one_hour_change !== a.stats.one_hour_change) return 1;
            if (b.stats.one_hour_change !== b.stats.one_hour_change) return -1;

            if (a.stats.one_hour_change == null && b.stats.one_hour_change == null) return 0;
            if (a.stats.one_hour_change == null) return 1;
            if (b.stats.one_hour_change == null) return -1;

            if (a.stats.one_hour_change === "" && b.stats.one_hour_change === "") return 0;
            if (a.stats.one_hour_change === "") return 1;
            if (b.stats.one_hour_change === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.one_hour_change < b.stats.one_hour_change
              ? sig
              : a.stats.one_hour_change > b.stats.one_hour_change
              ? -sig
              : 0;
          });
          break;
        case "6h":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.six_hour_change !== a.stats.six_hour_change &&
              b.stats.six_hour_change !== b.stats.six_hour_change
            )
              return 0;
            if (a.stats.six_hour_change !== a.stats.six_hour_change) return 1;
            if (b.stats.six_hour_change !== b.stats.six_hour_change) return -1;

            if (a.stats.six_hour_change == null && b.stats.six_hour_change == null) return 0;
            if (a.stats.six_hour_change == null) return 1;
            if (b.stats.six_hour_change == null) return -1;

            if (a.stats.six_hour_change === "" && b.stats.six_hour_change === "") return 0;
            if (a.stats.six_hour_change === "") return 1;
            if (b.stats.six_hour_change === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.six_hour_change < b.stats.six_hour_change
              ? sig
              : a.stats.six_hour_change > b.stats.six_hour_change
              ? -sig
              : 0;
          });
          break;
        case "24h":
          new_list = args.list.sort((a: any, b: any) => {
            if (a.stats.one_day_change !== a.stats.one_day_change && b.stats.one_day_change !== b.stats.one_day_change)
              return 0;
            if (a.stats.one_day_change !== a.stats.one_day_change) return 1;
            if (b.stats.one_day_change !== b.stats.one_day_change) return -1;

            if (a.stats.one_day_change == null && b.stats.one_day_change == null) return 0;
            if (a.stats.one_day_change == null) return 1;
            if (b.stats.one_day_change == null) return -1;

            if (a.stats.one_day_change === "" && b.stats.one_day_change === "") return 0;
            if (a.stats.one_day_change === "") return 1;
            if (b.stats.one_day_change === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.one_day_change < b.stats.one_day_change
              ? sig
              : a.stats.one_day_change > b.stats.one_day_change
              ? -sig
              : 0;
          });
          break;
        case "7d":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.seven_day_change !== a.stats.seven_day_change &&
              b.stats.seven_day_change !== b.stats.seven_day_change
            )
              return 0;
            if (a.stats.seven_day_change !== a.stats.seven_day_change) return 1;
            if (b.stats.seven_day_change !== b.stats.seven_day_change) return -1;

            if (a.stats.seven_day_change == null && b.stats.seven_day_change == null) return 0;
            if (a.stats.seven_day_change == null) return 1;
            if (b.stats.seven_day_change == null) return -1;

            if (a.stats.seven_day_change === "" && b.stats.seven_day_change === "") return 0;
            if (a.stats.seven_day_change === "") return 1;
            if (b.stats.seven_day_change === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.seven_day_change < b.stats.seven_day_change
              ? sig
              : a.stats.seven_day_change > b.stats.seven_day_change
              ? -sig
              : 0;
          });
          break;
        case "30d":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.thirty_day_change !== a.stats.thirty_day_change &&
              b.stats.thirty_day_change !== b.stats.thirty_day_change
            )
              return 0;
            if (a.stats.thirty_day_change !== a.stats.thirty_day_change) return 1;
            if (b.stats.thirty_day_change !== b.stats.thirty_day_change) return -1;

            if (a.stats.thirty_day_change == null && b.stats.thirty_day_change == null) return 0;
            if (a.stats.thirty_day_change == null) return 1;
            if (b.stats.thirty_day_change == null) return -1;

            if (a.stats.thirty_day_change === "" && b.stats.thirty_day_change === "") return 0;
            if (a.stats.thirty_day_change === "") return 1;
            if (b.stats.thirty_day_change === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.thirty_day_change < b.stats.thirty_day_change
              ? sig
              : a.stats.thirty_day_change > b.stats.thirty_day_change
              ? -sig
              : 0;
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
          new_list = args.list.sort((a: any, b: any) => {
            if (a.stats.one_day_sales !== a.stats.one_day_sales && b.stats.one_day_sales !== b.stats.one_day_sales)
              return 0;
            if (a.stats.one_day_sales !== a.stats.one_day_sales) return 1;
            if (b.stats.one_day_sales !== b.stats.one_day_sales) return -1;

            if (a.stats.one_day_sales == null && b.stats.one_day_sales == null) return 0;
            if (a.stats.one_day_sales == null) return 1;
            if (b.stats.one_day_sales == null) return -1;

            if (a.stats.one_day_sales === "" && b.stats.one_day_sales === "") return 0;
            if (a.stats.one_day_sales === "") return 1;
            if (b.stats.one_day_sales === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.one_day_sales < b.stats.one_day_sales
              ? sig
              : a.stats.one_day_sales > b.stats.one_day_sales
              ? -sig
              : 0;
          });
          break;
        case "7d":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.seven_day_sales !== a.stats.seven_day_sales &&
              b.stats.seven_day_sales !== b.stats.seven_day_sales
            )
              return 0;
            if (a.stats.seven_day_sales !== a.stats.seven_day_sales) return 1;
            if (b.stats.seven_day_sales !== b.stats.seven_day_sales) return -1;

            if (a.stats.seven_day_sales == null && b.stats.seven_day_sales == null) return 0;
            if (a.stats.seven_day_sales == null) return 1;
            if (b.stats.seven_day_sales == null) return -1;

            if (a.stats.seven_day_sales === "" && b.stats.seven_day_sales === "") return 0;
            if (a.stats.seven_day_sales === "") return 1;
            if (b.stats.seven_day_sales === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.seven_day_sales < b.stats.seven_day_sales
              ? sig
              : a.stats.seven_day_sales > b.stats.seven_day_sales
              ? -sig
              : 0;
          });
          break;
        case "30d":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.thirty_day_sales !== a.stats.thirty_day_sales &&
              b.stats.thirty_day_sales !== b.stats.thirty_day_sales
            )
              return 0;
            if (a.stats.thirty_day_sales !== a.stats.thirty_day_sales) return 1;
            if (b.stats.thirty_day_sales !== b.stats.thirty_day_sales) return -1;

            if (a.stats.thirty_day_sales == null && b.stats.thirty_day_sales == null) return 0;
            if (a.stats.thirty_day_sales == null) return 1;
            if (b.stats.thirty_day_sales == null) return -1;

            if (a.stats.thirty_day_sales === "" && b.stats.thirty_day_sales === "") return 0;
            if (a.stats.thirty_day_sales === "") return 1;
            if (b.stats.thirty_day_sales === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.thirty_day_sales < b.stats.thirty_day_sales
              ? sig
              : a.stats.thirty_day_sales > b.stats.thirty_day_sales
              ? -sig
              : 0;
          });
          break;
        default:
          new_list = args.list.sort((a: any, b: any) => {
            if (a.stats.total_sales !== a.stats.total_sales && b.stats.total_sales !== b.stats.total_sales) return 0;
            if (a.stats.total_sales !== a.stats.total_sales) return 1;
            if (b.stats.total_sales !== b.stats.total_sales) return -1;

            if (a.stats.total_sales == null && b.stats.total_sales == null) return 0;
            if (a.stats.total_sales == null) return 1;
            if (b.stats.total_sales == null) return -1;

            if (a.stats.total_sales === "" && b.stats.total_sales === "") return 0;
            if (a.stats.total_sales === "") return 1;
            if (b.stats.total_sales === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.total_sales < b.stats.total_sales
              ? sig
              : a.stats.total_sales > b.stats.total_sales
              ? -sig
              : 0;
          });
          break;
      }
      new_list = Array.from(new Set(new_list));
      break;
    case "owners":
      new_list = args.list.sort((a: any, b: any) => {
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
      new_list = args.list.sort((a: any, b: any) => {
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
      switch (args.term) {
        case "1h":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.one_hour_volume !== a.stats.one_hour_volume &&
              b.stats.one_hour_volume !== b.stats.one_hour_volume
            )
              return 0;
            if (a.stats.one_hour_volume !== a.stats.one_hour_volume) return 1;
            if (b.stats.one_hour_volume !== b.stats.one_hour_volume) return -1;

            if (a.stats.one_hour_volume == null && b.stats.one_hour_volume == null) return 0;
            if (a.stats.one_hour_volume == null) return 1;
            if (b.stats.one_hour_volume == null) return -1;

            if (a.stats.one_hour_volume === "" && b.stats.one_hour_volume === "") return 0;
            if (a.stats.one_hour_volume === "") return 1;
            if (b.stats.one_hour_volume === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.one_hour_volume < b.stats.one_hour_volume
              ? sig
              : a.stats.one_hour_volume > b.stats.one_hour_volume
              ? -sig
              : 0;
          });
          break;
        case "6h":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.six_hour_volume !== a.stats.six_hour_volume &&
              b.stats.six_hour_volume !== b.stats.six_hour_volume
            )
              return 0;
            if (a.stats.six_hour_volume !== a.stats.six_hour_volume) return 1;
            if (b.stats.six_hour_volume !== b.stats.six_hour_volume) return -1;

            if (a.stats.six_hour_volume == null && b.stats.six_hour_volume == null) return 0;
            if (a.stats.six_hour_volume == null) return 1;
            if (b.stats.six_hour_volume == null) return -1;

            if (a.stats.six_hour_volume === "" && b.stats.six_hour_volume === "") return 0;
            if (a.stats.six_hour_volume === "") return 1;
            if (b.stats.six_hour_volume === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.six_hour_volume < b.stats.six_hour_volume
              ? sig
              : a.stats.six_hour_volume > b.stats.six_hour_volume
              ? -sig
              : 0;
          });
          break;
        case "24h":
          new_list = args.list.sort((a: any, b: any) => {
            if (a.stats.one_day_volume !== a.stats.one_day_volume && b.stats.one_day_volume !== b.stats.one_day_volume)
              return 0;
            if (a.stats.one_day_volume !== a.stats.one_day_volume) return 1;
            if (b.stats.one_day_volume !== b.stats.one_day_volume) return -1;

            if (a.stats.one_day_volume == null && b.stats.one_day_volume == null) return 0;
            if (a.stats.one_day_volume == null) return 1;
            if (b.stats.one_day_volume == null) return -1;

            if (a.stats.one_day_volume === "" && b.stats.one_day_volume === "") return 0;
            if (a.stats.one_day_volume === "") return 1;
            if (b.stats.one_day_volume === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.one_day_volume < b.stats.one_day_volume
              ? sig
              : a.stats.one_day_volume > b.stats.one_day_volume
              ? -sig
              : 0;
          });
          break;
        case "7d":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.seven_day_volume !== a.stats.seven_day_volume &&
              b.stats.seven_day_volume !== b.stats.seven_day_volume
            )
              return 0;
            if (a.stats.seven_day_volume !== a.stats.seven_day_volume) return 1;
            if (b.stats.seven_day_volume !== b.stats.seven_day_volume) return -1;

            if (a.stats.seven_day_volume == null && b.stats.seven_day_volume == null) return 0;
            if (a.stats.seven_day_volume == null) return 1;
            if (b.stats.seven_day_volume == null) return -1;

            if (a.stats.seven_day_volume === "" && b.stats.seven_day_volume === "") return 0;
            if (a.stats.seven_day_volume === "") return 1;
            if (b.stats.seven_day_volume === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.seven_day_volume < b.stats.seven_day_volume
              ? sig
              : a.stats.seven_day_volume > b.stats.seven_day_volume
              ? -sig
              : 0;
          });
          break;
        case "30d":
          new_list = args.list.sort((a: any, b: any) => {
            if (
              a.stats.thirty_day_volume !== a.stats.thirty_day_volume &&
              b.stats.thirty_day_volume !== b.stats.thirty_day_volume
            )
              return 0;
            if (a.stats.thirty_day_volume !== a.stats.thirty_day_volume) return 1;
            if (b.stats.thirty_day_volume !== b.stats.thirty_day_volume) return -1;

            if (a.stats.thirty_day_volume == null && b.stats.thirty_day_volume == null) return 0;
            if (a.stats.thirty_day_volume == null) return 1;
            if (b.stats.thirty_day_volume == null) return -1;

            if (a.stats.thirty_day_volume === "" && b.stats.thirty_day_volume === "") return 0;
            if (a.stats.thirty_day_volume === "") return 1;
            if (b.stats.thirty_day_volume === "") return -1;

            const sig = args.order == "desc" || !args.order ? 1 : -1;
            return a.stats.thirty_day_volume < b.stats.thirty_day_volume
              ? sig
              : a.stats.thirty_day_volume > b.stats.thirty_day_volume
              ? -sig
              : 0;
          });
          break;
        default:
          if (args.property == "collections") {
            new_list = args.list.sort((a: any, b: any) => {
              if (a.upvotes_count !== a.upvotes_count && b.upvotes_count !== b.upvotes_count) return 0;
              if (a.upvotes_count !== a.upvotes_count) return 1;
              if (b.upvotes_count !== b.upvotes_count) return -1;

              if (a.upvotes_count == null && b.upvotes_count == null) return 0;
              if (a.upvotes_count == null) return 1;
              if (b.upvotes_count == null) return -1;

              if (a.upvotes_count === "" && b.upvotes_count === "") return 0;
              if (a.upvotes_count === "") return 1;
              if (b.upvotes_count === "") return -1;

              const sig = args.order == "desc" || !args.order ? 1 : -1;
              return a.upvotes_count < b.upvotes_count ? sig : a.upvotes_count > b.upvotes_count ? -sig : 0;
            });
            new_list = Array.from(new Set(new_list));
          }
          if (args.property == "creators") {
            new_list = args.list.sort((a: any, b: any) => {
              if (a.upvotes_count !== a.upvotes_count && b.upvotes_count !== b.upvotes_count) return 0;
              if (a.upvotes_count !== a.upvotes_count) return 1;
              if (b.upvotes_count !== b.upvotes_count) return -1;

              if (a.upvotes_count == null && b.upvotes_count == null) return 0;
              if (a.upvotes_count == null) return 1;
              if (b.upvotes_count == null) return -1;

              if (a.upvotes_count === "" && b.upvotes_count === "") return 0;
              if (a.upvotes_count === "") return 1;
              if (b.upvotes_count === "") return -1;

              const sig = args.order == "desc" || !args.order ? 1 : -1;
              return a.upvotes_count < b.upvotes_count ? sig : a.upvotes_count > b.upvotes_count ? -sig : 0;
            });
            new_list = Array.from(new Set(new_list));
          }
          break;
      }
  }
  if (args.limit) {
    let limited_list = [] as any[];
    let start;
    let end;
    if (!args.page || args.page == 1) {
      start = 0;
      end = args.limit;
    } else {
      start = args.limit * (args.page - 1);
      end = args.limit * args.page;
    }
    for (let index = start; index < end; index++) {
      if (new_list[index]) {
        limited_list = [...limited_list, new_list[index]];
      }
    }
    return limited_list;
  } else {
    return new_list;
  }
};

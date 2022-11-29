type sortProps = {
  page?: number;
  list: any[];
  order?: "desc" | "asc";
  sort?: string;
  limit?: number;
};
export const sortNFTs = (args: sortProps) => {
  let new_list = [];
  let new_order = args.order == "desc" ? "asc" : "desc";
  switch (args.sort) {
    case "last_price":
      new_list = args.list.sort(function (a: any, b: any) {
        if (
          a.last_sale_price !== a.last_sale_price &&
          b.last_sale_price !== b.last_sale_price
        )
          return 0;
        if (a.last_sale_price !== a.last_sale_price) return 1;
        if (b.last_sale_price !== b.last_sale_price) return -1;

        if (a.last_sale_price == null && b.last_sale_price == null) return 0;
        if (a.last_sale_price == null) return 1;
        if (b.last_sale_price == null) return -1;

        if (a.last_sale_price === "" && b.last_sale_price === "") return 0;
        if (a.last_sale_price === "") return 1;
        if (b.last_sale_price === "") return -1;

        var sig = args.order == "desc" || !args.order ? 1 : -1;
        return a.last_sale_price < b.last_sale_price
          ? sig
          : a.last_sale_price > b.last_sale_price
          ? -sig
          : 0;
      });
      new_list = Array.from(new Set(new_list));
      break;
    case "last_sale":
      new_list = args.list.sort(function (a: any, b: any) {
        if (
          a.last_sale_created_date !== a.last_sale_created_date &&
          b.last_sale_created_date !== b.last_sale_created_date
        )
          return 0;
        if (a.last_sale_created_date !== a.last_sale_created_date) return 1;
        if (b.last_sale_created_date !== b.last_sale_created_date) return -1;

        if (
          a.last_sale_created_date == null &&
          b.last_sale_created_date == null
        )
          return 0;
        if (a.last_sale_created_date == null) return 1;
        if (b.last_sale_created_date == null) return -1;

        if (a.last_sale_created_date === "" && b.last_sale_created_date === "")
          return 0;
        if (a.last_sale_created_date === "") return 1;
        if (b.last_sale_created_date === "") return -1;

        var sig = args.order == "desc" || !args.order ? 1 : -1;
        return a.last_sale_created_date < b.last_sale_created_date
          ? sig
          : a.last_sale_created_date > b.last_sale_created_date
          ? -sig
          : 0;
      });
      new_list = Array.from(new Set(new_list));
      break;

    case "token_id":
    default:
      new_list = args.list.sort(function (a: any, b: any) {
        if (a.token_id !== a.token_id && b.token_id !== b.token_id) return 0;
        if (a.token_id !== a.token_id) return 1;
        if (b.token_id !== b.token_id) return -1;

        if (a.token_id == null && b.token_id == null) return 0;
        if (a.token_id == null) return 1;
        if (b.token_id == null) return -1;

        if (a.token_id === "" && b.token_id === "") return 0;
        if (a.token_id === "") return 1;
        if (b.token_id === "") return -1;

        var sig = args.order == "desc" || !args.order ? 1 : -1;
        return a.token_id < b.token_id
          ? sig
          : a.token_id > b.token_id
          ? -sig
          : 0;
      });
      new_list = Array.from(new Set(new_list));
  }
  console.log("new_list");
  console.log(new_list);
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
    // if (args.list.length > 0) {
    //   for (let index = 0; index < args.limit; index++) {
    //     limited_list = [...limited_list, new_list[index]];
    //   }
    // }
    return limited_list;
  } else {
    return new_list;
  }
};

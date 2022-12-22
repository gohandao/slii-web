type Props = {
  collection_slug: string;
};
export const getNFTListings = async ({ collection_slug }: Props) => {
  if (typeof window !== undefined) {
    const API_KEY = process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY;
    if (API_KEY) {
      const options = {
        headers: {
          "X-RapidAPI-Host": "opensea15.p.rapidapi.com",
          "X-RapidAPI-Key": API_KEY,
        },
        method: "GET",
      };
      let listings = [] as any[];
      const limit = 100;
      let next = "" as string;
      const fetchData = async (next: string): Promise<{ listings: any[]; next: string }> => {
        const new_next = next && next.length > 0 ? next : "";
        const next_param = new_next ? `&next=${new_next}` : "";
        const response = await fetch(
          `https://opensea15.p.rapidapi.com/v2/listings/collection/${collection_slug}/all?limit=${limit}${next_param}`,
          options
        )
          .then((response) => {
            return response.json();
          })
          .catch((error) => {
            console.log("error");
            console.log(error);
          });
        return response;
      };
      for (let index = 0; index < 10000; index++) {
        console.log(index + "times");
        const data: { listings: any[]; next: string } = await fetchData(next);
        listings = data && data.listings ? [...listings, ...data.listings] : listings;
        next = data && data.next;
        if (!data || !data.next || data.next == null) {
          break;
        }
      }
      const response = listings.map((listing) => {
        const data = {
          current_price: listing.price.current.value as number,
          symbol: listing.price.current.currency as string,
          token_id: listing.protocol_data.parameters.offer[0].identifierOrCriteria as number,
        };
        return data;
      });
      return response;
    }
  }
};

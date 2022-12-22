import { getCollections, upsertNFTPrices } from "@/libs/supabase";

export const updateAllNFTPrices = async (req: any, res: any) => {
  const { data } = await getCollections();
  const collections = data as any[];
  for (let index = 0; index < collections.length; index++) {
    await upsertNFTPrices(collections[index].slug);
  }
  console.log("finished");
  res.end();
};
export default updateAllNFTPrices;

import { slugs } from "@/data/temp";
import { createJson } from "@/utilities/createJson";

// スクレイピングしたデータの整理用
const createBaseCollectionsJson = async (req: any, res: any) => {
  const pathName = "slugs.json";
  console.log("start01");
  const collections = await getData01(slugs);
  console.log("start02");
  const users = await getData02(collections);
  const source = users;
  await createJson(pathName, source);
  res.end();
};

const callback = () => {
  return console.log("waiting...");
};
const sleep = (delay = 1000) => {
  return new Promise<void>((resolve) => {
    return setTimeout(() => {
      callback();
      return resolve();
    }, delay);
  });
};

const getData01 = async (slugs: any) => {
  let collections = [] as any[];
  for (let index = 0; index < slugs.length; index++) {
    await sleep(300);
    const data = await getCollectionData(slugs[index]);
    const new_data = {
      address:
        data &&
        data.collection &&
        data.collection.editors &&
        data.collection.editors[data.collection.editors.length - 1],
      slug: slugs[index],
    };
    collections = [...collections, new_data];
  }
  return collections;
};
const getData02 = async (collections: any[]) => {
  let users = [] as any[];
  for (let index = 0; index < collections.length; index++) {
    await sleep(300);
    const data = await getUserData(collections[index].address);
    const new_data = {
      address: collections[index].address ? collections[index].address : null,
      slug: collections[index].slug,
      username: data ? (data.username ? data.username : null) : null,
    };
    users = [...users, new_data];
  }
  return users;
};

const getCollectionData = async (slug: string) => {
  const data = await fetch(`https://api.opensea.io/collection/${slug}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  return data;
};
const getUserData = async (address: string) => {
  const data = await fetch(`https://api.opensea.io/user/${address}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  return data;
};
export default createBaseCollectionsJson;

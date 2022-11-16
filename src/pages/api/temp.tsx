const fs = require("fs");
import { slugs } from "@/data/temp";
import { createJson } from "@/utilities/createJson";
import Timeout from "await-timeout";
import { setInterval } from "timers/promises";

const createBaseCollectionsJson = async (req: any, res: any) => {
  let pathName = "slugs.json";
  console.log("start01");
  const collections = await getData01(slugs);
  console.log("start02");
  const users = await getData02(collections);
  let source = users;
  await createJson(pathName, source);
  res.end();
};

const getData01 = async (slugs: any[]) => {
  let collections = [] as any[];
  const length = slugs.length;
  const interval = 300;

  // const data = await Promise.all(
  // slugs.map(async (slug, index) => {
  for (let index = 0; index < slugs.length; index++) {
    // if (index < 10) {
    await sleep(300);
    if (index % 10 == 0) {
      console.log((index * 300) / 1000 + "seconds");
    }
    let data = await getCollectionData(slugs[index]);
    const new_data = {
      slug: slugs[index],
      address:
        data &&
        data.collection &&
        data.collection.editors &&
        data.collection.editors[data.collection.editors.length - 1],
    };
    // console.log("collection");
    // // console.log(data);
    // console.log(new_data);
    // console.log(data.collection.editors);
    collections = [...collections, new_data];
    // }
    // return new_data;
    // })
  }
  // );
  return collections;
};
const getData02 = async (collections: any[]) => {
  let users = [] as any[];
  const length = slugs.length;
  const interval = 300;

  // const data = await Promise.all(
  //   collections.map(async (collection, index) => {
  for (let index = 0; index < collections.length; index++) {
    // if (index < 10) {
    await sleep(300);
    // await Timeout.set(1001);
    if (index % 10 == 0) {
      console.log((index * 300) / 1000 + "seconds");
    }
    let data = await getUserData(collections[index].address);
    const new_data = {
      username: data ? (data.username ? data.username : null) : null,
      slug: collections[index].slug,
      address: collections[index].address ? collections[index].address : null,
    };
    // return new_data;
    // console.log("user");
    // console.log(data);
    // console.log(new_data);

    users = [...users, new_data];
  }
  // }
  //     return await ddd();
  //   })
  // );
  return users;
};

const callback = () => console.log("waiting...");
const sleep = (delay = 1000) => {
  return new Promise<void>((resolve) => {
    return setTimeout(() => {
      callback();
      return resolve();
    }, delay);
  });
};

const getCollectionData = async (slug: string) => {
  const data = await fetch(`https://api.opensea.io/collection/${slug}`)
    .then((response) => response.json())
    .then((response) => {
      //console.log("JSON.parse(response)");
      //console.log(JSON.parse(response));
      // const data = JSON.parse(response);
      return response;
      // let data = response;
      // avatar = data && (data.account.profile_img_url as string);
      //setTwitterData(JSON.parse(response));
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  return data;
};
const getUserData = async (address: string) => {
  const data = await fetch(`https://api.opensea.io/user/${address}`)
    .then((response) => response.json())
    .then((response) => {
      //console.log("JSON.parse(response)");
      //console.log(JSON.parse(response));
      // const data = JSON.parse(response);

      return response;
      // let data = response;
      // avatar = data && (data.account.profile_img_url as string);
      //setTwitterData(JSON.parse(response));
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  return data;
};

export default createBaseCollectionsJson;

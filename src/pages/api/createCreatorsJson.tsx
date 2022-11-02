const fs = require("fs");
import socials from "@/json/socials.json";

import { Creator } from "@/types/creator";
import { base } from "@/libs/airtable";
import { getSocials } from "@/utilities/getSocials";
import { sortList } from "@/libs/sortList";

import { getImageUrl, supabase } from "@/libs/supabase";
import { getOSUserAvatar } from "@/utilities/getOSUserAvatar";
import { getOSUserBackground } from "@/utilities/getOSUserBackground";
import { createJson } from "@/utilities/createJson";

const createCreatorJson = async () => {
  let pathName = "creators.json";
  let creators = await getCreators();
  let data = await getCreatorOptions(creators);
  let update_data = await updateSocial(data);
  let source = await sortCreators(update_data);
  await createJson(pathName, source);
  return;
};

const getCreators = async () => {
  let creators = [] as Creator[];
  let new_records: Creator[] = [...creators];
  await base("creators")
    .select({
      // Selecting the first 3 records in All:
      maxRecords: 100,
      view: "All",
    })
    .eachPage(
      //@ts-ignore
      function page(records: any[], fetchNextPage: () => void) {
        records.forEach(async function (record) {
          const fields = record.fields;
          new_records = [
            ...new_records,
            {
              username: fields.username,
              description: fields.description,
              // avatar: OSUserAvatar,
              // background: OSUserBackground,
              address: fields.address,
              website_url: fields.website_url,
              twitter_id: fields.twitter_id,
              instagram_id: fields.instagram_id,
              discord_url: fields.discord_url,
              type: fields.type,
              verified: fields.verified,
              updatedAt: fields.updatedAt,
              collections: fields.collections,
              category: fields.category,
              tags: fields.tags,
              //掲載された日
              listed_at: fields.listedAt,
            } as Creator,
          ];
          //console.log("creators", new_records);
          //console.log("Retrieved", record.fields);
        });
        try {
          fetchNextPage();
        } catch (error) {
          console.log(error);
          return;
        }
        return new_records as Creator[];
      }
    );
  return new_records;
};

const getCreatorOptions = async (creators: Creator[]) => {
  await Promise.all(
    creators.map(async (creator) => {
      const OSUserAvatar = await getOSUserAvatar(creator.username);
      const OSUserBackground = await getOSUserBackground(creator.username);
      creator.avatar = OSUserAvatar as string | undefined;
      creator.background = OSUserBackground as string | undefined;
    })
  );
  return creators;
};

const updateSocial = async (creators: Creator[]) => {
  // const socials = await getSocials();
  let new_creators = [] as any[];
  await Promise.all(
    creators.map(async (creator, index) => {
      let new_creator;
      //1.add twitter followers
      const socials_filter = socials.filter(
        (social) => social.creator_username === creator.username
      );
      const twitter_followers = socials_filter[0]
        ? socials_filter[0].twitter_followers
        : null;
      new_creator = creator;
      new_creator.twitter_followers = twitter_followers
        ? twitter_followers
        : null;
      //2.add upvotes
      const { data, error, status } = await supabase
        .from("upvotes")
        .select("id", {
          count: "exact",
          head: false,
        })
        .eq("creator_id", creator.username);
      new_creator.upvotes_count = data ? data.length : 0;
      new_creators = [...new_creators, new_creator];
    })
  );
  return new_creators;
};
const sortCreators = async (creators: Creator[]) => {
  const args = {
    property: "creators" as "creators" | "collections",
    list: creators,
    order: "desc" as "desc" | "asc" | undefined,
  };
  const data = sortList(args);
  return data;
};
export default createCreatorJson;

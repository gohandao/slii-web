import React, { createContext, useState } from "react";

/*types*/
import { Creator } from "@/types/creator";
import { Collection } from "@/types/collection";
import { Social } from "@/types/social";
import { Tag } from "@/types/tag";

type Props = {
  creators: any[];
  collections: any[];
  // collections: Collection[];
  // OSCollections: any[];
  tags: any[];
  // creatorTags: Tag[];
  // collectionTags: Tag[];
  // socials: Social[];
  // setSocials: React.Dispatch<React.SetStateAction<Social[]>>;
};
export const BaseContext = createContext<Props>({
  creators: [
    {
      username: "",
      description: "",
      avatar: "",
      background: "",
      address: "",
      website_url: "",
      twitter_id: "",
      instagram_id: "",
      discord_url: "",
      verified: false,
      type: "",
      listed_at: null,
      updatedAt: null,
      collections: [],
      category: "",
      tags: [],
    },
  ],
  // collections: [
  //   {
  //     record_id: "",
  //     name: "",
  //     slug: "",
  //     creator_id: "",
  //     type: "",
  //     listed_at: null,
  //     updatedAt: null,
  //     category: "",
  //     verified: false,
  //     tags: [],
  //     twitter_followers: null,
  //     discord_members: null,
  //   },
  // ],
  collections: [],
  // creatorTags: [
  //   {
  //     name: "",
  //     createdAt: null,
  //     collections_slug: [],
  //     count: 0,
  //   },
  // ],
  // collectionTags: [
  //   {
  //     name: "",
  //     createdAt: null,
  //     collections_slug: [],
  //     count: 0,
  //   },
  // ],
  tags: [
    {
      name: "",
      createdAt: null,
      creators: [],
      collections: [],
      creators_count: 0,
      collections_count: 0,
      count: 0,
    },
  ],
  // socials: [
  //   {
  //     creator_username: "",
  //     collection_slug: "",
  //     twitter_followers: null,
  //     discord_members: null,
  //     record_id: "",
  //   },
  // ],
  // setSocials: () => {},
});

/*
export const SongsContext = createContext<Song[]>([
  {
    id: '',
    title: '',
    youtube: '',
    song_title: '',
    works: '',
    artist: '',
    type: '',
    year: null,
    createdAt: null,
    updatedAt: null,
  },
])
*/

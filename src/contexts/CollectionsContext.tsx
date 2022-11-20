import React, { createContext, useState } from "react";

/*types*/
import { Collection } from "@/types/collection";

export const CollectionsContext = createContext<Collection[]>([
  {
    record_id: "",
    name: "",
    slug: "",
    creator_id: "",
    type: "",
    listed_at: null,
    updatedAt: null,
    category: "",
    verified: false,
    tags: [],
    twitter_followers: null,
    discord_members: null,
  },
]);

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

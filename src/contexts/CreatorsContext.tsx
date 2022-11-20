import React, { createContext, useState } from "react";

/*types*/
import { Creator } from "@/types/creator";

export const CreatorsContext = createContext<Creator[]>([
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

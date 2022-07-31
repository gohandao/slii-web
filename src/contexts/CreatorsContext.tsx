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
    website: "",
    twitter_id: "",
    instagram_id: "",
    discord_url: "",
    verified: false,
    type: "",
    createdAt: null,
    updatedAt: null,
    collections: [],
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

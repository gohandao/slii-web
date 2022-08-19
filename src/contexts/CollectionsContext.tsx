import React, { createContext, useState } from "react";

/*types*/
import { Collection } from "@/types/collection";

export const CollectionsContext = createContext<Collection[]>([
  {
    name: "",
    slug: "",
    creator_id: "",
    type: "",
    createdAt: null,
    updatedAt: null,
    category: "",
    verified: false,
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

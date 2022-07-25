import React, { createContext, useState } from "react";

/*types*/
import { Tag } from "@/types/tag";

export const CreatorTagsContext = createContext<Tag[]>([
  {
    name: "",
    createdAt: null,
    collections_slug: [],
    count: 0,
  },
]);
export const CollectionTagsContext = createContext<Tag[]>([
  {
    name: "",
    createdAt: null,
    collections_slug: [],
    count: 0,
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

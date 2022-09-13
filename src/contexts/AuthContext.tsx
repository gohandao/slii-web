import React, { createContext, useState } from "react";
//import { Auth } from "@/types/auth";

export const AuthContext = createContext<any>({
  profile: {},
  user: {},
  setAvatar: () => {},
});

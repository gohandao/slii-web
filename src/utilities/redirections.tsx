import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import React, { useContext } from "react";

export const redirections = () => {
  const router = useRouter();
  const { prev } = router.query;
  const currentPath = router.pathname;

  const { user } = useContext(AuthContext);

  switch (currentPath) {
    case "/account":
      if (!user) {
        router.push("/");
      }
      break;
    case "/login":
      if (user) {
        if (prev && typeof prev == "string") {
          router.push(prev);
        } else {
          router.push("/");
        }
      }
      break;

    default:
      break;
  }
};

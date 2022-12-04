import { useRouter } from "next/router";
import { useContext } from "react";

import { AuthContext } from "@/contexts/AuthContext";

export const useRedirections = () => {
  const router = useRouter();
  const { prev } = router.query;
  const currentPath = router.pathname;
  const { user } = useContext(AuthContext);
  switch (currentPath) {
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

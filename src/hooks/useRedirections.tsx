import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { authUserAtom } from "@/state/auth.state";

export const useRedirections = () => {
  const router = useRouter();
  const { prev } = router.query;
  const currentPath = router.pathname;
  const [authUser] = useAtom(authUserAtom);
  switch (currentPath) {
    case "/login":
      if (authUser) {
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

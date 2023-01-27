import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { authUserAtom } from "@/state/auth.state";

export const useRedirections = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [authUser] = useAtom(authUserAtom);
  switch (currentPath) {
    case "/account":
      if (!authUser) {
        // router.push("/");
      }
      break;

    default:
      break;
  }
};

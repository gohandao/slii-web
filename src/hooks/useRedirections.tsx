import { useAtomValue } from "jotai";
import { useRouter } from "next/router";

import { getAuthUserAtom } from "@/state/auth.state";

export const useRedirections = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const authUser = useAtomValue(getAuthUserAtom);
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

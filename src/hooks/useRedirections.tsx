import { useAtomValue } from "jotai";
import { useRouter } from "next/router";

import { readOnlyAuthUserAtom } from "@/state/auth.state";

export const useRedirections = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const authUser = useAtomValue(readOnlyAuthUserAtom);
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

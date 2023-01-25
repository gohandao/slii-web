import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { userAtom } from "@/state/auth.state";

export const useRedirections = () => {
  const router = useRouter();
  const { prev } = router.query;
  const currentPath = router.pathname;
  const [user] = useAtom(userAtom);
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

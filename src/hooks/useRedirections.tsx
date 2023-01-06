import { useRouter } from "next/router";

import { useGetUser } from "@/hooks/useGetUser";

export const useRedirections = () => {
  const router = useRouter();
  const { prev } = router.query;
  const currentPath = router.pathname;
  const { user } = useGetUser();
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

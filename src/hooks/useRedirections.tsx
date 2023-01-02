import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { supabase } from "@/libs/supabase";

export const useRedirections = () => {
  const router = useRouter();
  const { prev } = router.query;
  const currentPath = router.pathname;
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchDate = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    fetchDate();
  }, []);
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

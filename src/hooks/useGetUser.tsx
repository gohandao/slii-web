import type { User } from "@supabase/gotrue-js";
import { useEffect, useState } from "react";

import { supabase } from "@/libs/supabase";

export const useGetUser = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        if (user) {
          setUser(user);
        }
      } catch {
        console.log("error at fetchUser");
      }
    };
    fetchUser();
  }, []);

  return { user };
};

import type { User } from "@supabase/gotrue-js";
import { useEffect, useState } from "react";

import { supabase } from "@/libs/supabase";

export const useGetUser = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchDate = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    fetchDate();
  }, [user]);

  return { user };
};

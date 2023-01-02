import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from "@/libs/supabase";

export const useGetSessionUser = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) setUser(session.user);
    };
    fetchUser();
  }, [user]);

  return { user };
};

import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from "@/libs/supabase";

export const useGetSession = () => {
  const [session, setSession] = useState<Session>();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) setSession(session);
    };
    fetchUser();
  }, []);

  return { session };
};

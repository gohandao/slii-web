/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import type { Creator } from "@/types/creator";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY;
if (!supabaseUrl) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
if (!supabaseAnonKey) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useGetCreator = async () => {
  const router = useRouter();
  const { username } = router.query;
  const current_username = username as string;
  const [creator, setCreator] = useState();
  const getCreator = useCallback(async () => {
    const { data, error } = await supabase.from("creators").select("*").eq("username", current_username).single();
    if (error) {
      console.log("error at getCreator");
      console.log(error);
    }
    if (data) {
      data as Creator;
      setCreator(data);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);
  return { getCreator };
};

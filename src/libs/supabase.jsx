import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getImageUrl = async (path) => {
  let url;
  if (path) {
    const storage_name = path.substr(0, path.indexOf("/"));
    const file_path = path.substr(path.indexOf("/") + 1);
    const res = await supabase.storage.from(storage_name).download(file_path);
    url = res.data && res.data;
  } else {
    return;
  }
  return url;
};

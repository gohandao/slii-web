import { supabase } from "@/libs/supabase";
import React, { useEffect } from "react";

const Test = () => {
  const hhh = async () => {
    const { data, error, status } = await supabase
      .from("upvotes")
      .select("id", {
        count: "exact",
        head: false,
      })
      .eq("creator_id", `onigiriman`);
    console.log("upvote datannnnn");
    console.log(data);
    console.log(data.length);
  };
  useEffect(() => {
    hhh();
  }, []);

  return (
    <div>
      <p>hhhhh</p>
    </div>
  );
};

export default Test;

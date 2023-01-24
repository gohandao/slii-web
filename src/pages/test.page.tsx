const TEST = () => {
  return <div>test.page</div>;
};

export default TEST;
// import type { NextPage } from "next";
// import { toast } from "react-toastify";

// const Home: NextPage = () => {
//   const fetchData = async () => {
//     // const { data } = await supabase
//     //   .from("collections")
//     //   .select(`"*"`, {
//     //     count: "exact",
//     //     head: false,
//     //   })
//     //   .order("upvotes_count")
//     //   .limit(10);

//     // const { data } = await supabase
//     //   .from("bookmarks")
//     //   .select("*, profiles(*)", {
//     //     count: "exact",
//     //     head: false,
//     //   })
//     //   .eq("user_id", `${user.id}`);
//     // const { data } = await supabase
//     //   .from("collections")
//     //   .select(`"slug", collection_bookmarks(count)`, {
//     //     count: "exact",
//     //     head: false,
//     //   })
//     //   .eq("slug", "bonsaiboyz");

//     // const { data } = await supabase
//     //   .from("collection_bookmarks")
//     //   .select("*, profiles(*)", {
//     //     count: "exact",
//     //     head: false,
//     //   })
//     //   .eq("collection_slug", "bonsaiboyz");

//     console.log("fetched data");
//     // console.log(data);
//   };
//   // useEffect(() => {
//   //   const uid = "e1d57531-a815-4993-940e-1f9432c8b146";
//   //   const subscription = supabase
//   //     .channel(`public:profiles:id=eq.${user.id}`)
//   //     .on(
//   //       "postgres_changes",
//   //       { event: "*", filter: `id=eq.${user.id}`, schema: "public", table: "profiles" },
//   //       (payload) => {
//   //         console.log("Change received!", payload);
//   //       }
//   //     )
//   //     .subscribe();

//   //   console.log("subscription");
//   //   console.log(subscription);
//   //   fetchData();
//   //   return () => {
//   //     supabase.removeSubscription(subscription);
//   //   };
//   // }, []);

//   const notify = () => {
//     //icons
//     // toast.info("Lorem ipsum dolor"); // same as toast(message, {type: "info"});
//     // toast.error("Lorem ipsum dolor");
//     // toast.success("Lorem ipsum dolor");
//     // toast.success("Lorem ipsum dolor", {
//     //   theme: "colored",
//     // });
//     // toast.warn("Lorem ipsum dolor");
//     // toast.warn("Lorem ipsum dolor", {
//     //   theme: "dark",
//     // });
//     //promise
//     // toast.promise(resolveAfter3Sec, {
//     //   error: "Promise rejected 🤯",
//     //   pending: "Promise is pending",
//     //   success: "Promise resolved 👌",
//     // });
//     return toast.success("Wow so error !", {
//       // icon: <AiOutlineCheckCircle />,
//     });
//   };

//   return (
//     <div>
//       <button
//         className="text-white"
//         onClick={() => {
//           notify();
//         }}
//       >
//         yoast
//       </button>
//       {/* <Alert /> */}
//     </div>
//   );
// };

// export default Home;

import { useRouter } from "next/router";

export const ProfileTabs = () => {
  const router = useRouter();
  const { order, page, search, sort, tab, term, type, username } = router.query;
  console.log(order, page, search, sort, tab, term, type, username);

  return (
    <div className="flex justify-center gap-5">
      <button className="relative pb-3 text-xl">
        {!tab && <div className="absolute bottom-0 left-0 right-0 mx-auto h-[5px] w-10 rounded-full bg-sky-600"></div>}
        Liked
      </button>
      <button className="relative pb-3 text-xl">
        {tab == "stars" && (
          <div className="absolute bottom-0 left-0 right-0 mx-auto h-[5px] w-10 rounded-full bg-sky-600"></div>
        )}
        Stars
      </button>
    </div>
  );
};

import { useAtom } from "jotai";

import { authUserAtom } from "@/state/auth.state";
import { profileTabAtom } from "@/state/utilities.state";

export const ProfileTabs = () => {
  const [authUser] = useAtom(authUserAtom);
  const [profileTab, setProfileTab] = useAtom(profileTabAtom);

  const checkLiked =
    (authUser && (!profileTab || profileTab == "liked")) || (!authUser && (!profileTab || profileTab == "liked"));
  const checkStars =
    (authUser && (!profileTab || profileTab == "stars")) || (!authUser && (!profileTab || profileTab == "stars"));
  const likedStatusClass = checkLiked ? "text-gray-900" : "text-gray-500";
  const starsStatusClass = checkStars ? "text-gray-900" : "text-gray-500";
  return (
    <div className="flex justify-center gap-5">
      <button
        className={`relative pb-3 text-xl font-medium ${likedStatusClass}`}
        onClick={() => {
          setProfileTab("liked");
          // authUser && setUserProfileTab("liked");
          // !authUser && setGuestProfileTab("liked");
        }}
      >
        {checkLiked && (
          <div className="absolute bottom-0 left-0 right-0 mx-auto h-[5px] w-10 rounded-full bg-sky-600"></div>
        )}
        Liked
      </button>
      <button
        className={`relative pb-3 text-xl font-medium ${starsStatusClass}`}
        onClick={() => {
          setProfileTab("stars");
          // authUser && setUserProfileTab("stars");
          // !authUser && setGuestProfileTab("stars");
        }}
      >
        {checkStars && (
          <div className="absolute bottom-0 left-0 right-0 mx-auto h-[5px] w-10 rounded-full bg-sky-600"></div>
        )}
        Stars
      </button>
    </div>
  );
};

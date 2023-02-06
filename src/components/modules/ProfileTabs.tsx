import { useAtom } from "jotai";

import { userProfileTabAtom } from "@/state/user.state";

export const ProfileTabs = () => {
  const [userProfileTab, setUserProfileTab] = useAtom(userProfileTabAtom);

  const likedStatusClass = !userProfileTab || (userProfileTab == "liked" ? "text-gray-900" : "text-gray-500");
  const starsStatusClass = !userProfileTab || (userProfileTab == "stars" ? "text-gray-900" : "text-gray-500");
  return (
    <div className="flex justify-center gap-5">
      <button
        className={`relative pb-3 text-xl font-medium ${likedStatusClass}`}
        onClick={() => {
          setUserProfileTab("liked");
        }}
      >
        {!userProfileTab ||
          (userProfileTab == "liked" && (
            <div className="absolute bottom-0 left-0 right-0 mx-auto h-[5px] w-10 rounded-full bg-sky-600"></div>
          ))}
        Liked
      </button>
      <button
        className={`relative pb-3 text-xl font-medium ${starsStatusClass}`}
        onClick={() => {
          setUserProfileTab("stars");
        }}
      >
        {userProfileTab == "stars" && (
          <div className="absolute bottom-0 left-0 right-0 mx-auto h-[5px] w-10 rounded-full bg-sky-600"></div>
        )}
        Stars
      </button>
    </div>
  );
};

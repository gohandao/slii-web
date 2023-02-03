import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";

import { userProfileCategoryAtom } from "@/state/user.state";

const tabs = [
  {
    param: "all",
    path: "/",
    title: "All",
  },
  {
    param: "creators",
    path: "/creators",
    title: "Creators",
  },
  {
    param: "collections",
    path: "/collections",
    title: "Collections",
  },
];
export const IndexCategoryTabs = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <ul className="flex rounded-full bg-white px-2 py-[5px] shadow-lg shadow-gray-200">
      {tabs.map((tab, index) => {
        const status = tab.path == currentPath ? "bg-sky-600 text-white" : "text-sky-600";
        return (
          <li key={index} className="px-1">
            <Link
              href={tab.path}
              className={`flex cursor-pointer rounded-full px-[14px] py-[5px] font-medium transition-all duration-200 hover:bg-sky-600 hover:text-white ${status}`}
            >
              {tab.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export const CategoryTabs = () => {
  const [userProfileCategory, setUserProfileCategory] = useAtom(userProfileCategoryAtom);
  return (
    <ul className="flex rounded-full bg-white px-2 py-[5px] shadow-lg shadow-gray-200">
      {tabs.map((tab, index) => {
        const status =
          tab.param == userProfileCategory || (tab.param == "all" && !userProfileCategory)
            ? "bg-sky-600 text-white"
            : "text-sky-600";
        return (
          <li key={index} className="px-1">
            <button
              className={`flex cursor-pointer rounded-full px-[14px] py-[5px] font-medium transition-all duration-200 hover:bg-sky-600 hover:text-white ${status}`}
              onClick={() => {
                setUserProfileCategory((tab.param as "all") || "creator" || "collections");
              }}
            >
              {tab.title}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

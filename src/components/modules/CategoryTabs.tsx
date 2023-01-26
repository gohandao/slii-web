import Link from "next/link";
import { useRouter } from "next/router";

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
  // {
  //   param: "nfts",
  //   path: "/nfts",
  //   title: "NFTs",
  // },
];
export const IndexCategoryTabs = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <ul className="flex rounded-full bg-white px-2 py-1 shadow-lg shadow-gray-200">
      {tabs.map((tab, index) => {
        const status = tab.path == currentPath ? "bg-sky-600 text-white" : "text-sky-600";
        return (
          <li key={index} className="py-[5px] px-1">
            <Link
              href={tab.path}
              className={`cursor-pointer rounded-full px-[14px] py-[5px] transition-all duration-200 hover:bg-sky-600 hover:text-white ${status}`}
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
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <ul className="flex rounded-full bg-white px-2 py-1 shadow-lg shadow-gray-200">
      {tabs.map((tab, index) => {
        const status = tab.path == currentPath ? "bg-sky-600 text-white" : "text-sky-600";
        return (
          <li key={index} className="py-[5px] px-1">
            <Link
              href={tab.path}
              className={`cursor-pointer rounded-full px-[14px] py-[5px] transition-all duration-200 hover:bg-sky-600 hover:text-white ${status}`}
            >
              {tab.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";

import { SplitLayout } from "@/components/layouts/SplitLayout";
import { ScreenModal } from "@/components/modules/ScreenModal";
import { CreatorScreen } from "@/components/templates/CreatorScreen";
import { CreatorsTinderCard } from "@/components/templates/CreatorsTinderCard";

const Home: NextPage = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { username } = router.query;
  const [screenModal, setScreenModal] = useState(false);

  useEffect(() => {
    setScreenModal(username ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const tabs = [
    {
      path: "/",
      title: "All",
    },
    {
      path: "/creators",
      title: "Creators",
    },
    {
      path: "/collections",
      title: "Collections",
    },
    {
      path: "/nfts",
      title: "NFTs",
    },
  ];
  return (
    <div>
      <ScreenModal modalIsOpen={screenModal} setModalIsOpen={setScreenModal} path="/">
        <CreatorScreen />
      </ScreenModal>
      <SplitLayout>
        <div className="relative mx-auto flex w-[420px] flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="items-baseline text-2xl">
              Discover <span className="text-lg">with</span>
              <Image src="/logo.svg" width={55} height={22} alt="title" className="mt-[2px] ml-2 inline" />
            </h2>
            <ul className="flex rounded-full bg-white px-2 py-1 shadow-lg shadow-gray-200">
              {tabs.map((tab, index) => {
                const status = tab.path == currentPath ? "bg-sky-600 text-white" : "text-sky-600";
                return (
                  <li key={index} className="py-[5px] px-1">
                    <Link
                      to={tab.path}
                      className={`cursor-pointer rounded-full px-[14px] py-[5px] transition-all duration-200 hover:bg-sky-600 hover:text-white ${status}`}
                    >
                      {tab.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <CreatorsTinderCard />
        </div>
      </SplitLayout>
    </div>
  );
};

export default Home;

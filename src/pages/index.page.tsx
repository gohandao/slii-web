import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

import { SplitLayout } from "@/components/layouts/SplitLayout";
import { IndexCategoryTabs } from "@/components/modules/CategoryTabs";
import { DropdownBox } from "@/components/modules/DropdownBox";
import { CreatorsTinderCard } from "@/components/templates/CreatorsTinderCard";

const Home: NextPage = () => {
  const [requestDropdown, setRequestDropdown] = useState(false);
  const [filterType, setFilterType] = useState<string | undefined>();
  const filterMenus = {
    //順番に意味がある
    /*eslint-disable*/
    type: [
      {
        param: "creator",
        title: "Creator",
      },
      {
        param: "project",
        title: "Project",
      },
      {
        param: "company",
        title: "Company",
      },
    ],
    sort: [
      {
        param: "upvotes_count",
        title: "Popular",
      },
      {
        param: "name",
        title: "Name",
      },
    ],
    /*eslint-enable*/
  };
  const filterKeys = Object.keys(filterMenus);

  return (
    <div>
      <SplitLayout>
        <div className="relative mx-auto flex w-[420px] flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="items-baseline text-2xl">
                Discover <span className="text-lg">with</span>
                <Image src="/logo.svg" width={55} height={22} alt="title" className="mt-[2px] ml-2 inline" />
              </h2>
              <DropdownBox
                icon={<HiOutlineAdjustmentsHorizontal className="!text-gray-900" />}
                title="Filter"
                dropdown={requestDropdown}
                setDropdown={setRequestDropdown}
              >
                <>
                  <div className="flex flex-col gap-4">
                    {filterKeys.map((key: string, index: number) => {
                      const menus = key == "type" ? filterMenus.type : key == "sort" ? filterMenus.sort : [];
                      return (
                        <div key={index} className="flex flex-col gap-2">
                          <h4 className="text-sm font-bold capitalize">{key}</h4>
                          <div className="flex flex-col gap-2">
                            {menus.map((menu, index) => {
                              return (
                                <div key={index} className="w-full">
                                  <label
                                    className="flex cursor-pointer select-none items-center text-sm font-bold"
                                    htmlFor={menu.param}
                                  >
                                    <input
                                      type="radio"
                                      onClick={() => {
                                        setFilterType(filterType == menu.param ? undefined : menu.param);
                                      }}
                                      id={menu.param}
                                      name={key}
                                      className="peer/published sr-only"
                                    />
                                    <div
                                      className={`box -mt[1px] mr-[10px] flex h-5 w-5 items-center justify-center rounded border-2 border-sky-600 bg-sky-100`}
                                    >
                                      {filterType == menu.param && (
                                        <span className={`dot h-[10px] w-[10px] rounded-sm bg-sky-400`}></span>
                                      )}
                                    </div>
                                    {menu.title}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3 flex justify-center">
                    <button className="flex w-[200px] items-center justify-center rounded bg-sky-500 py-3 text-sm font-bold text-white">
                      Search
                    </button>
                  </div>
                </>
              </DropdownBox>
            </div>
            <IndexCategoryTabs />
          </div>
          <CreatorsTinderCard />
        </div>
      </SplitLayout>
    </div>
  );
};

export default Home;

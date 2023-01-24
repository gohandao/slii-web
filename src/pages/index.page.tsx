import type { NextPage } from "next";
import Image from "next/image";

import { SplitLayout } from "@/components/layouts/SplitLayout";
import { IndexCategoryTabs } from "@/components/modules/CategoryTabs";
import { CreatorsTinderCard } from "@/components/templates/CreatorsTinderCard";

const Home: NextPage = () => {
  // const filterMenus = {
  //   //順番に意味がある
  //   /*eslint-disable*/
  //   type: [
  //     {
  //       param: "creator",
  //       title: "Creator",
  //     },
  //     {
  //       param: "project",
  //       title: "Project",
  //     },
  //     {
  //       param: "company",
  //       title: "Company",
  //     },
  //   ],
  //   sort: [
  //     {
  //       param: "upvotes_count",
  //       title: "Popular",
  //     },
  //     {
  //       param: "name",
  //       title: "Name",
  //     },
  //   ],
  //   /*eslint-enable*/
  // };
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
              {/* <DropdownBox
                icon={<HiOutlineAdjustmentsHorizontal className="!text-gray-700" />}
                title="Filter"
                dropdown={requestDropdown}
                setDropdown={setRequestDropdown}
              >
                {filterMenus.type.map((menu, index) => {
                  return (
                    <div key={index} className="w-full">
                      <label htmlFor={`mmm_${index}`} className="flex cursor-pointer select-none items-center">
                        <div className="relative">
                          <input type="checkbox" id={`mmm_${index}`} className="sr-only" />
                          <div
                            className={`box mr-4 flex h-5 w-5 items-center justify-center rounded border peer-checked/mmm_${index}:text-sky-500`}
                          >
                            <span className="dot h-[10px] w-[10px] rounded-sm"></span>
                          </div>
                        </div>
                        Checkbox Text
                      </label>
                    </div>
                  );
                })}
              </DropdownBox> */}
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

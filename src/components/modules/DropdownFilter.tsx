import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

import { Searchbox } from "@/components/elements/Searchbox";
import { DropdownBox } from "@/components/modules/DropdownBox";
import { collectionsFilterMenus, combinedFilterMenus, creatorsFilterMenus } from "@/constant/filter.const";
import {
  collectionsFilterParamsAtom,
  collectionsKeywordAtom,
  combinedFilterParamsAtom,
  combinedKeywordAtom,
  creatorsFilterParamsAtom,
  creatorsKeywordAtom,
} from "@/state/utilities.state";
import type { Filter } from "@/types/filter";

export const DropdownFilter = () => {
  const router = useRouter();
  const current_path = router.pathname;
  const [requestDropdown, setRequestDropdown] = useState(false);
  const [combinedKeyword] = useAtom(combinedKeywordAtom);
  const [creatorsKeyword] = useAtom(creatorsKeywordAtom);
  const [collectionsKeyword] = useAtom(collectionsKeywordAtom);
  const [combinedFilterParams, setCombinedFilterParams] = useAtom(combinedFilterParamsAtom);
  const [creatorsFilterParams, setCreatorsFilterParams] = useAtom(creatorsFilterParamsAtom);
  const [collectionsFilterParams, setCollectionsFilterParams] = useAtom(collectionsFilterParamsAtom);
  const [filterType, setFilterType] = useState<string | undefined>();
  const [filterSort, setFilterSort] = useState<string | undefined>();
  const [filterOrder, setFilterOrder] = useState<string | undefined>();
  const [filterMenus, setFilterMenus] = useState<Filter>();
  const keyword =
    current_path == "/"
      ? combinedKeyword
      : current_path == "/creators"
      ? creatorsKeyword
      : current_path == "/collections"
      ? collectionsKeyword
      : "";
  const setParamsHandler = () => {
    const new_params = { order: filterOrder, search: keyword, sort: filterSort, type: filterType };
    switch (current_path) {
      case "/":
        setCombinedFilterParams(new_params);
        break;
      case "/creators":
        setCreatorsFilterParams(new_params);
        break;
      case "/collections":
        setCollectionsFilterParams(new_params);
        break;
    }
  };
  useEffect(() => {
    switch (current_path) {
      case "/":
        setFilterType(combinedFilterParams.type);
        setFilterSort(combinedFilterParams.sort);
        setFilterOrder(combinedFilterParams.order);
        setFilterMenus(combinedFilterMenus);
        break;
      case "/creators":
        setFilterType(creatorsFilterParams.type);
        setFilterSort(creatorsFilterParams.sort);
        setFilterOrder(creatorsFilterParams.order);
        setFilterMenus(creatorsFilterMenus);
        break;
      case "/collections":
        setFilterType(collectionsFilterParams.type);
        setFilterSort(collectionsFilterParams.sort);
        setFilterOrder(collectionsFilterParams.order);
        setFilterMenus(collectionsFilterMenus);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const filterKeys = filterMenus && Object.keys(filterMenus);

  return (
    <DropdownBox
      icon={<HiOutlineAdjustmentsHorizontal className="!text-gray-900" />}
      title="Filter"
      dropdown={requestDropdown}
      setDropdown={setRequestDropdown}
    >
      <>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold">Keyword</h4>
            <Searchbox id={"keyword"} />
          </div>
          {filterKeys &&
            filterKeys.map((key: string, index: number) => {
              const menus =
                key == "type"
                  ? filterMenus.type
                  : key == "sort"
                  ? filterMenus.sort
                  : key == "order" && filterMenus.order;
              return (
                <div key={index} className="flex flex-col gap-2">
                  <h4 className="text-sm font-bold capitalize">{key}</h4>
                  <div className="flex flex-col gap-2">
                    {menus &&
                      menus.map((menu, index) => {
                        return (
                          <div key={index} className="w-full">
                            <label
                              className="flex cursor-pointer select-none items-center text-sm font-bold"
                              htmlFor={menu.param}
                            >
                              <input
                                type="radio"
                                onClick={() => {
                                  switch (key) {
                                    case "type":
                                      setFilterType(filterType !== menu.param ? menu.param : menu.param);
                                      break;
                                    case "sort":
                                      setFilterSort(filterSort != menu.param ? menu.param : menu.param);
                                      break;
                                    case "order":
                                      setFilterOrder(filterOrder != menu.param ? menu.param : menu.param);
                                      break;
                                  }
                                }}
                                id={menu.param}
                                name={key}
                                className={`sr-only`}
                              />
                              <div
                                className={`box -mt[1px] mr-[10px] flex h-5 w-5 items-center justify-center rounded border-2 border-sky-600 bg-sky-100`}
                              >
                                {(filterType == menu.param ||
                                  filterSort == menu.param ||
                                  filterOrder == menu.param) && (
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
          <button
            className="flex w-[200px] items-center justify-center rounded bg-sky-500 py-3 text-sm font-bold text-white"
            onClick={() => {
              setParamsHandler();
              setRequestDropdown(false);
            }}
          >
            Search
          </button>
        </div>
      </>
    </DropdownBox>
  );
};

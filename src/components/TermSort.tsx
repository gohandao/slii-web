import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { setParams } from "@/utilities/setParams";
import { useQueryState } from "next-usequerystate";
import { useRouter } from "next/router";
import React, { ReactNode, useContext } from "react";

type Props = {
  term?: string;
};
export const TermSort = ({ term }: Props) => {
  //const [termParam, setTermParam] = useQueryState("term");
  const router = useRouter();
  const { order, sort, page, type, search, screen } = router.query;
  // const { hiddenUrl } = useContext(UtilitiesContext);

  type Props = {
    title: string;
  };

  const Button = ({ title }: Props) => {
    let activeClass;
    if (title == term || (!term && title == "all")) {
      activeClass = "border-gray-600 bg-gray-700";
    } else {
      activeClass = "border-gray-600 bg-gray-800";
    }
    let new_order = order ? order : "desc";
    return (
      <button
        className={`flex h-[46px] w-[44px] items-center justify-center border-r text-sm capitalize text-gray-300 last:border-r-0 ${activeClass}`}
        onClick={() => {
          setParams({
            sort: sort as string,
            order: new_order as string,
            term: title,
            type: type as string,
            search: search as string,
            screen: screen as string,
          });
          //setTermParam(title);
        }}
      >
        {title}
      </button>
    );
  };
  return (
    <div className="flex items-center overflow-hidden rounded border border-gray-600">
      <Button title="1h" />
      <Button title="6h" />
      <Button title="24h" />
      <Button title="7d" />
      <Button title="30d" />
      <Button title="all" />
    </div>
  );
};

import { useRouter } from "next/router";
import type { FC } from "react";

import { setParams } from "@/utilities/setParams";

type Props = {
  term?: string;
};
export const TermSort: FC<Props> = ({ term }) => {
  const router = useRouter();
  const { order, screen, search, sort, type } = router.query;

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
    const new_order = order ? order : "desc";
    return (
      <button
        className={`flex h-[46px] w-[44px] items-center justify-center border-r text-sm capitalize text-gray-300 last:border-r-0 ${activeClass}`}
        onClick={() => {
          setParams({
            order: new_order as string,
            screen: screen as string,
            search: search as string,
            sort: sort as string,
            term: title,
            type: type as string,
          });
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

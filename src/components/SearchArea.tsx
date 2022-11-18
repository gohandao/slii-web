import React from "react";
import { Searchbox } from "@/components/Searchbox";

type Props = {
  id: string;
};
export const SearchArea = ({ id }: Props) => {
  return (
    <div className="bg-blue-100 block py-12 px-5 md:px-8">
      <div className="mx-auto max-w-md flex justify-center items-center">
        <Searchbox id={id} />
      </div>
    </div>
  );
};

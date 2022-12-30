import type { FC } from "react";

import { Searchbox } from "@/components/elements/Searchbox";

type Props = {
  id: string;
};
export const SearchArea: FC<Props> = ({ id }) => {
  return (
    <div className="block bg-blue-100 py-12 px-5 md:px-8">
      <div className="mx-auto flex max-w-md items-center justify-center">
        <Searchbox id={id} />
      </div>
    </div>
  );
};

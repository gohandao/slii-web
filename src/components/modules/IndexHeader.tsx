import Image from "next/image";
import type { FC } from "react";

import { DropdownFilter } from "@/components/modules/DropdownFilter";

export const IndexHeader: FC = () => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="items-baseline text-2xl font-bold">
        Discover <span className="text-lg">with</span>
        <Image src="/logo.svg" width={55} height={22} alt="title" className="mt-[2px] ml-2 inline" />
      </h2>
      <DropdownFilter />
    </div>
  );
};

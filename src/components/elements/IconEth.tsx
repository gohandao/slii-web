import Image from "next/image";
import type { FC } from "react";

export const IconEth: FC = () => {
  return (
    <div className="flex w-4 items-center">
      <Image
        src="/icon-eth.svg"
        width={16}
        height={16}
        alt=""
        className=""
        style={{
          height: "auto",
          maxWidth: "100%",
        }}
      />
    </div>
  );
};

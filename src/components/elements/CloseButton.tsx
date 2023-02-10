import type { FC } from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

type Props = {
  property?: "cross" | "arrow";
};
export const CloseButton: FC<Props> = ({ property = "cross" }) => {
  const Icon = () => {
    if (property != "arrow") {
      return <IoClose className="" />;
    } else {
      return <HiArrowSmLeft className="" />;
    }
  };
  return (
    <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black text-lg text-white">
      <Icon />
    </div>
  );
};

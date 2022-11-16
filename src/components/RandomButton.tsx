import { setParams } from "@/utilities/setParams";
import { useRouter } from "next/router";
import React from "react";
import { FaRandom } from "react-icons/fa";
import { TbArrowBigDownLine, TbArrowBigUpLine } from "react-icons/tb";

type Props = {
  random: boolean;
  setRandom: React.Dispatch<React.SetStateAction<boolean>>;
};
export const RandomButton = ({ random, setRandom }: Props) => {
  return (
    <button
      onClick={() => {
        setRandom(!random);
      }}
    >
      <FaRandom className="text-gray-400 " />
    </button>
  );
};

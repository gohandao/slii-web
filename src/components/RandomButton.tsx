import type { FC } from "react";
import { FaRandom } from "react-icons/fa";

type Props = {
  random: boolean;
  setRandom: React.Dispatch<React.SetStateAction<boolean>>;
};
export const RandomButton: FC<Props> = ({ random, setRandom }) => {
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

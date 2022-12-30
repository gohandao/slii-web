import { FaRandom } from "react-icons/fa";

type Props = {
  count?: number;
  random: boolean;
  setRandom: React.Dispatch<React.SetStateAction<boolean>>;
};
export const RandomButton = ({ count, random, setRandom }: Props) => {
  return (
    <button
      onClick={() => {
        setRandom(!random);
      }}
      className="flex w-full items-center justify-between rounded border-2 border-gray-500 py-2 px-5 text-gray-500 transition-all duration-200 hover:bg-gray-800 hover:text-gray-300"
    >
      <FaRandom className="flex h-full items-center justify-center text-gray-500 " />
      Shuffle {count} NFTs
    </button>
  );
};

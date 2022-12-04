import { FaRandom } from "react-icons/fa";

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

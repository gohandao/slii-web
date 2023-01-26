import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiFillStar } from "react-icons/ai";

type Props = {
  image?: string;
  label: string;
  likeHandler: () => void;
  path: string;
  starHandler: () => void;
};
export const LikedItem = ({ image, label, likeHandler, path, starHandler }: Props) => {
  const image_src = image ? image : "/dummy-nft.jpg";
  type ButtonProps = {
    active_color: string;
    icon: any;
    onClickHandler: () => void;
  };
  const Button = ({ active_color, icon, onClickHandler }: ButtonProps) => {
    return (
      <button
        className={`flex w-full items-center justify-center bg-black py-2 text-white opacity-60 backdrop-blur-sm !${active_color}`}
        onClick={() => {
          onClickHandler();
        }}
      >
        {icon}
      </button>
    );
  };
  return (
    <Link href={path} className="relative flex w-full flex-col overflow-hidden rounded-lg shadow-xl">
      <p className="absolute left-1 top-1 rounded-full  bg-black px-3 py-[2px] text-sm text-white opacity-50">
        {label}
      </p>
      <Image src={image_src} alt="" width={150} height={150} sizes="200px" quality={10} className="w-full" />
      <div className="absolute -left-0 bottom-0 flex w-full">
        <Button
          active_color={"text-pink-500 border-r border-dotted border-gray-700"}
          icon={<AiFillHeart />}
          onClickHandler={() => {
            likeHandler();
          }}
        />
        <Button
          active_color={"text-yellow-300"}
          icon={<AiFillStar />}
          onClickHandler={() => {
            starHandler();
          }}
        />
      </div>
    </Link>
  );
};

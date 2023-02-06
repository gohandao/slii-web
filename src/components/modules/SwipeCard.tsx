import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { MdVerified } from "react-icons/md";

import type { TCard } from "@/types/tinder";

export const SwipeCard: FC<TCard> = ({ above_tags, below_tags, image, name, path, type, verified = false }) => {
  const image_src = image ? image : "/dummy-nft.jpg";
  const router = useRouter();
  const currentPath = router.pathname;

  const category = path.split("/")[1];
  const param = path.split("/").pop();
  const query = category == "creator" ? "username" : category == "collection" && "slug";
  const newPath = currentPath + `?${query}=` + param;

  console.log("paramparamparam");
  console.log(path);
  console.log(category);
  console.log(param);
  console.log(query);
  console.log(newPath);

  return (
    <Link href={newPath} as={path} className="flex flex-col rounded-lg bg-white p-2">
      <div
        className="relative flex"
        style={{
          paddingTop: "100%",
        }}
      >
        {above_tags && (
          <div className="absolute top-3 left-3">
            {above_tags.map((tag, index) => {
              return (
                <div className="flex bg-black bg-opacity-50 text-white" key={index}>
                  {tag}
                </div>
              );
            })}
          </div>
        )}
        {below_tags && (
          <div className="absolute bottom-3 left-3">
            {below_tags.map((tag, index) => {
              return (
                <div className="flex bg-black bg-opacity-50 text-white" key={index}>
                  {tag}
                </div>
              );
            })}
          </div>
        )}
        <Image src={image_src} className="w-full rounded-t-lg" alt="" fill sizes="300px" />
      </div>
      <div className="bg-gradient flex flex-col rounded-b-lg px-5 py-3 text-white">
        <h2 className="flex w-full text-xl font-bold line-clamp-1">
          {name}
          {verified && <MdVerified className="ml-2 inline-block" />}
        </h2>
        <p className="text-xs font-medium capitalize opacity-50">{type}</p>
      </div>
    </Link>
  );
};

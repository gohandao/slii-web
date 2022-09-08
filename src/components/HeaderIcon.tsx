import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";

export const HeaderIcon = () => {
  const router = useRouter();

  const { headerIcon } = useContext(UtilitiesContext);
  const currentPath = router.pathname;

  return (
    <div className="lg:min-w-[160px]">
      {headerIcon.emoji.length > 0 ? (
        <Link href={headerIcon.path}>
          <a className="relative flex h-7 font-bold text-2xl text-white tracking-wider flex items-center">
            {headerIcon.emoji && (
              <span className="text-xl mr-2">{headerIcon.emoji}</span>
            )}
            {headerIcon.title}
          </a>
        </Link>
      ) : headerIcon.avatar.length > 0 ? (
        <Link href={headerIcon.path}>
          <a className="relative flex h-7 font-bold text-2xl text-white tracking-wider flex items-center gap-2">
            {headerIcon.avatar && (
              <div className="w-[44px] h-[44px] rounded-sm overflow-hidden relative border-[3px] border-gray-800">
                <Image
                  src={headerIcon.avatar}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </div>
            )}
            <p className="text-sm ellipsis max-w-[120px]">{headerIcon.title}</p>
          </a>
        </Link>
      ) : (
        <Link href="/">
          <a className="relative flex h-7">
            <Image src="/logo.svg" width={142} height={20} alt="" />
          </a>
        </Link>
      )}
    </div>
  );
};

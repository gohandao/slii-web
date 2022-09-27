import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { DrawerMenu } from "@/components/DrawerMenu";

export const HeaderIcon = () => {
  const router = useRouter();
  const [status, setStatus] = useState<boolean>(false);

  const { headerIcon } = useContext(UtilitiesContext);
  const currentPath = router.pathname;

  return (
    <>
      <DrawerMenu status={status} setStatus={setStatus} />
      <div className="lg:min-w-[160px] flex items-center gap-3">
        <button
          onClick={() => {
            setStatus(!status);
          }}
        >
          <BsArrowLeftCircle
            className={`text-gray-500 text-xl ${
              !status && "rotate-180"
            } transition-all duration-700`}
          />
        </button>
        {headerIcon.emoji.length > 0 ? (
          <Link href={headerIcon.path}>
            <a className="relative flex h-7 font-bold text-base text-white tracking-wider flex items-center mt-[2px]">
              {headerIcon.emoji && (
                <span className="text-3xl mr-2 -mt-[2px]">
                  {headerIcon.emoji}
                </span>
              )}
              {headerIcon.title}
            </a>
          </Link>
        ) : headerIcon.avatar.length > 0 ? (
          <Link href={headerIcon.path}>
            <a className="relative flex h-7 font-bold text-2xl text-white tracking-wider flex items-center gap-2">
              {headerIcon.avatar && (
                <div className="w-[44px] h-[44px] rounded-full overflow-hidden relative border-[3px] border-gray-700">
                  <Image
                    src={headerIcon.avatar}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </div>
              )}
              <p className="text-sm ellipsis max-w-[120px]">
                {headerIcon.title}
              </p>
            </a>
          </Link>
        ) : (
          <Link href="/">
            <a className="relative flex h-7 font-bold text-base text-white tracking-wider flex items-center mt-[2px]">
              <span className="text-3xl mr-2 -mt-[2px]">🏠</span>Home
            </a>
            {/*<a className="relative flex h-7">
            <Image src="/logo.svg" width={142} height={20} alt="" />
      </a>*/}
          </Link>
        )}
      </div>
    </>
  );
};

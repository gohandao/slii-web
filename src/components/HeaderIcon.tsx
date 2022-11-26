import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { DrawerMenu } from "@/components/DrawerMenu";
import { BiHomeAlt } from "react-icons/bi";

export const HeaderIcon = () => {
  const router = useRouter();
  const [status, setStatus] = useState<boolean>(false);

  const { headerIcon } = useContext(UtilitiesContext);

  const currentPath = router.pathname;

  let uri;
  let uri_domain: string;
  let ref;
  let ref_uri;
  let ref_domain: string;
  if (typeof window != "undefined") {
    uri = new URL(window.location.href);
    uri_domain = uri.hostname;
    ref = document.referrer && new URL(document.referrer);
    ref_domain = ref && ref.hostname;
    //@ts-ignore

    // console.log("uri_domain");
    // console.log(uri_domain);
    // console.log(ref_domain);
    // console.log(document.referrer);
  }

  type Props = {
    property: "back" | "next";
  };
  const BackButton = ({ property }: Props) => {
    let showClassName = "";
    let to = "";
    if (currentPath != "/") {
      if (typeof window != "undefined") {
        if (window.history.length >= 2) {
          // 履歴が2個以上あれば、戻るリンクを表示
          to = "back";
        } else {
          // document.write("履歴がないよ");
          // showClassName = "hidden";
          to = "top";
        }
      }
    } else {
      if (typeof window != "undefined") {
        if (window.history.length >= 2) {
          // 履歴が2個以上あれば、戻るリンクを表示
          to = "back";
        } else {
          showClassName = "hidden";
        }
      }
    }
    // if (uri_domain != ref_domain || !ref_domain) {
    //   showClassName = "hidden";
    // }
    return (
      <button
        onClick={() => {
          // setStatus(!status);
          if (property == "back") {
            if (to == "back") {
              router.back();
            }
            if ((to = "top")) {
              router.push("/");
            }
          } else {
            history.forward();
          }
        }}
        className={`${showClassName}`}
      >
        {property == "back" && (
          <BsFillArrowLeftCircleFill className={`text-xl text-gray-500 `} />
        )}
        {property == "next" && (
          <BsFillArrowRightCircleFill className={`text-xl text-gray-500 `} />
        )}
      </button>
    );
  };
  return (
    <>
      {/* <DrawerMenu status={status} setStatus={setStatus} /> */}
      <div className="flex items-center gap-3 lg:min-w-[160px]">
        <div className="flex gap-3 md:hidden">
          <BackButton property="back" />
        </div>
        {/* <NextButton /> */}
        {headerIcon.emoji.length > 0 ? (
          <Link href={headerIcon.path} legacyBehavior>
            <a className="relative mt-[2px] flex h-7 items-center text-base font-bold tracking-wider text-white">
              {headerIcon.emoji && (
                <span className="mr-2 -mt-[2px] text-3xl">
                  {headerIcon.emoji}
                </span>
              )}
              {headerIcon.title}
            </a>
          </Link>
        ) : headerIcon.element ? (
          <Link href={headerIcon.path} legacyBehavior>
            <a className="relative mt-[2px] flex h-7 items-center text-base font-bold tracking-wider text-white">
              {headerIcon.element && (
                <span className="mr-2 -mt-[2px] text-3xl">
                  {headerIcon.element}
                </span>
              )}
              {headerIcon.title}
            </a>
          </Link>
        ) : headerIcon.avatar.length > 0 ? (
          <Link href={headerIcon.path} legacyBehavior>
            <a className="relative flex h-7 items-center gap-2 text-2xl font-bold tracking-wider text-white">
              {headerIcon.avatar && (
                <div className="relative h-[44px] w-[44px] overflow-hidden rounded-full border-[3px] border-gray-700">
                  <Image
                    src={headerIcon.avatar}
                    alt=""
                    quality={40}
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <p className="ellipsis max-w-[180px] text-sm">
                {headerIcon.title}
              </p>
            </a>
          </Link>
        ) : headerIcon.type != "home" ? (
          <Link href={headerIcon.path} legacyBehavior>
            <a className="relative flex items-center gap-2 py-[2px] tracking-wider">
              <div className="flex flex-col gap-[2px]">
                <p className="ellipsis max-w-[180px] text-lg font-bold leading-none text-gray-100">
                  {headerIcon.title}
                </p>
                <div className="text-sm  text-gray-300 opacity-70">
                  {headerIcon.subTitle && headerIcon.subTitle}
                </div>
              </div>
            </a>
          </Link>
        ) : (
          <Link href="/" legacyBehavior>
            <a className="relative mt-[2px] flex h-7 items-center text-base font-bold tracking-wider text-gray-100">
              <span className="mr-2 -mt-[2px] text-3xl">
                <BiHomeAlt />
              </span>
              Home
            </a>
            {/* <a className="relative flex h-7">
            <Image src="/logo.svg" width={142} height={20} alt="" />
          </a> */}
          </Link>
        )}
      </div>
    </>
  );
};

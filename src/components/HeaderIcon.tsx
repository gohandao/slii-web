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
          <BsFillArrowLeftCircleFill className={`text-gray-500 text-xl `} />
        )}
        {property == "next" && (
          <BsFillArrowRightCircleFill className={`text-gray-500 text-xl `} />
        )}
      </button>
    );
  };
  return (
    <>
      {/* <DrawerMenu status={status} setStatus={setStatus} /> */}
      <div className="lg:min-w-[160px] flex items-center gap-3">
        <div className="flex gap-3 md:hidden">
          <BackButton property="back" />
        </div>
        {/* <NextButton /> */}
        {headerIcon.emoji.length > 0 ? (
          <Link href={headerIcon.path} legacyBehavior>
            <a className="relative h-7 font-bold text-base text-white tracking-wider flex items-center mt-[2px]">
              {headerIcon.emoji && (
                <span className="text-3xl mr-2 -mt-[2px]">
                  {headerIcon.emoji}
                </span>
              )}
              {headerIcon.title}
            </a>
          </Link>
        ) : headerIcon.element ? (
          <Link href={headerIcon.path} legacyBehavior>
            <a className="relative h-7 font-bold text-base text-white tracking-wider flex items-center mt-[2px]">
              {headerIcon.element && (
                <span className="text-3xl mr-2 -mt-[2px]">
                  {headerIcon.element}
                </span>
              )}
              {headerIcon.title}
            </a>
          </Link>
        ) : headerIcon.avatar.length > 0 ? (
          <Link href={headerIcon.path} legacyBehavior>
            <a className="relative h-7 font-bold text-2xl text-white tracking-wider flex items-center gap-2">
              {headerIcon.avatar && (
                <div className="w-[44px] h-[44px] rounded-full overflow-hidden relative border-[3px] border-gray-700">
                  <Image
                    src={headerIcon.avatar}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                    quality={40}
                  />
                </div>
              )}

              <p className="text-sm ellipsis max-w-[180px]">
                {headerIcon.title}
              </p>
            </a>
          </Link>
        ) : currentPath != "/" &&
          currentPath != "/collections" &&
          currentPath != "/creator/[username]" ? (
          <Link href={headerIcon.path} legacyBehavior>
            <a className="relative tracking-wider flex items-center gap-2 py-[2px]">
              <div className="flex flex-col gap-[2px]">
                <p className="text-lg ellipsis max-w-[180px] font-bold text-gray-100 leading-none">
                  {headerIcon.title}
                </p>
                <div className="opacity-70  text-gray-300 text-sm">
                  {headerIcon.subTitle && headerIcon.subTitle}
                </div>
              </div>
            </a>
          </Link>
        ) : (
          <Link href="/" legacyBehavior>
            <a className="relative flex h-7 font-bold text-base text-gray-100 tracking-wider items-center mt-[2px]">
              <span className="text-3xl mr-2 -mt-[2px]">
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

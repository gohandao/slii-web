import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

export const HeaderIcon = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  type Props = {
    property: "back" | "next";
  };

  let showClassName = "";
  let to = "";
  const BackButton = ({ property }: Props) => {
    if (currentPath != "/") {
      if (typeof window != "undefined") {
        if (window.history.length >= 2) {
          // 履歴が2個以上あれば、戻るリンクを表示
          to = "back";
        } else {
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
        {property == "back" && <BsFillArrowLeftCircleFill className={`text-xl text-gray-500 `} />}
        {property == "next" && <BsFillArrowRightCircleFill className={`text-xl text-gray-500 `} />}
      </button>
    );
  };
  return (
    <>
      <div className="flex items-center gap-3">
        <div className={`flex gap-3 md:hidden ${showClassName}`}>
          <BackButton property="back" />
        </div>
        {/* <NextButton /> */}
        <Link href="/" legacyBehavior>
          <a className="relative mt-[2px] flex h-7 items-center text-base font-bold tracking-wider text-gray-100">
            <Image src="/logo-icon.svg" width={18} height={18} alt="" />
          </a>
        </Link>
      </div>
    </>
  );
};

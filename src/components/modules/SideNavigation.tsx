import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLink } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";

import { ProfileCount } from "@/components/modules/ProfileCount";

export const SideNavigation = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  type Menu = {
    icon: JSX.Element;
    path: string;
    text: string;
  };
  const menus = [
    { icon: <HiHome />, path: "/", text: "Home" },
    { icon: <FaUserAlt />, path: "/ik_takagishi", text: "Profile" },
    { icon: <BsGearFill />, path: "/settings", text: "Settings" },
  ] as Menu[];
  return (
    <div className="flex w-full flex-col p-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-2">
            <div className="flex h-[44px] w-[44px] overflow-hidden rounded-full shadow-lg">
              <Image src="/default-avatar.jpg" alt="avatar" width={44} height={44} />
            </div>
            <div className="flex flex-col">
              <p className="text-xl text-sky-800">Alan Smithee</p>
              <p className="text-sm text-sky-800 opacity-50">@alan_smithee</p>
            </div>
          </div>
          <div className="flex gap-5">
            <ProfileCount label="Liked" count={327} />
            <ProfileCount label="Stars" count={18} />
          </div>
        </div>
        <nav>
          <ul className="flex flex-col">
            {menus.map((menu: Menu, index: number) => {
              const status = currentPath == menu.path;
              const border = status ? "bg-sky-500" : "";
              const icon_color = status ? "text-sky-500" : "text-gray-400";
              const text_color = status ? "text-sky-700" : "text-gray-900";
              return (
                <li key={index}>
                  <Link
                    href={menu.path}
                    className={`${text_color} relative -mx-5 flex w-full cursor-pointer items-center gap-5 py-[15px] px-5 text-lg`}
                  >
                    <div
                      className={`absolute left-0 top-1 bottom-1 w-[6px] rounded-br-full rounded-tr-full ${border}`}
                    ></div>
                    <div className={`text-xl ${icon_color}`}>{menu.icon}</div>
                    {menu.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="mt-auto flex flex-col gap-1">
        <a
          href="https://www.google.com/"
          className="flex cursor-pointer items-center gap-2 font-normal text-sky-700 underline transition-all duration-200 hover:no-underline"
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineLink />
          Privacy policy
        </a>
        <a
          href="https://www.google.com/"
          className="flex cursor-pointer items-center gap-2 font-normal text-sky-700 underline transition-all duration-200 hover:no-underline"
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineLink />
          Join our Discord
        </a>
      </div>
    </div>
  );
};

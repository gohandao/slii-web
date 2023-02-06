import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC, ReactNode } from "react";
import { BsGearFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { HiHome, HiMail } from "react-icons/hi";

import { authProfileAtom } from "@/state/auth.state";

type FixedMenuProps = {
  blank?: boolean;
  children: ReactNode;
  href: string;
};

// const buttonClass =
//   "relative flex justify-center gap-4 items-center w-[240px] max-w-[90%] mx-auto py-2 border-2 text-sm text-center rounded transition-all duration-200 transform";

const FixedMenu: FC<FixedMenuProps> = ({ blank = false, children, href }) => {
  if (!blank) {
    return (
      <Link href={href} legacyBehavior>
        <a className="flex w-full items-center justify-center px-3 py-5 text-2xl text-gray-400 last:border-none">
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <a
        href={href}
        target="_blank"
        className="flex w-full items-center justify-center px-3 py-5 text-2xl text-gray-400 last:border-none"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }
};
export const Footer: FC = () => {
  const router = useRouter();
  const current_path = router.pathname;
  const current_asPath = router.asPath;
  const [authProfile] = useAtom(authProfileAtom);
  const profile_path = authProfile ? authProfile.username : "guest";

  const activeHomeClass =
    current_path == "/" || current_path == "/creators" || current_path == "/collections" ? "text-sky-500" : "";
  const activeUserClass =
    (authProfile && current_asPath == `/${authProfile.username}`) ||
    (!authProfile && current_path == "/guest") ||
    (authProfile && current_path == `/account`)
      ? "text-sky-500"
      : "";
  const activeSettingsClass = current_path == `/settings` ? "text-sky-500" : "";
  return (
    <>
      <div className="fixed bottom-0 left-0 z-20 mx-auto flex w-full rounded-t-2xl bg-white shadow-2xl lg:hidden">
        <FixedMenu href="/">
          <HiHome className={`${activeHomeClass}`} />
        </FixedMenu>
        <FixedMenu href={`/${profile_path}`}>
          <FaUserAlt className={`text-xl ${activeUserClass}`} />
        </FixedMenu>
        <FixedMenu href="/settings">
          <BsGearFill className={`text-xl ${activeSettingsClass}`} />
        </FixedMenu>
        <FixedMenu
          blank={true}
          href="https://docs.google.com/forms/d/e/1FAIpQLSfd0_agN6SLqM0PlYxjL4E9HiLdq6_9KN3i65Z2byNWCBj11w/viewform"
        >
          <HiMail />
        </FixedMenu>
      </div>
    </>
  );
};

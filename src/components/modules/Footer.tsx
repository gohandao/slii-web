import { useAtomValue } from "jotai";
import Link from "next/link";
import type { FC, ReactNode } from "react";
import { BiHomeAlt, BiPurchaseTagAlt } from "react-icons/bi";
import { BsMailbox } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { TbDiamond } from "react-icons/tb";

import { authUserAtom } from "../../state/auth.state";

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
        <a className="flex w-full items-center justify-center border-r border-gray-700 px-3 py-[14px] text-2xl text-gray-400 last:border-none">
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <a
        href={href}
        target="_blank"
        className="flex w-full items-center justify-center border-r border-gray-700 px-3 py-[14px] text-2xl text-gray-400 last:border-none"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }
};
export const Footer: FC = () => {
  // const [authUser] = useAtom(authUserAtom);
  const authUser = useAtomValue(authUserAtom);

  return (
    <>
      <div className="fixed bottom-0 left-0 z-20 mx-auto flex w-full border-t border-gray-700 bg-gray-800 md:hidden">
        <FixedMenu href="/">
          <BiHomeAlt />
        </FixedMenu>
        <FixedMenu href="/stats">
          <TbDiamond />
        </FixedMenu>
        <FixedMenu href="/tags">
          <BiPurchaseTagAlt />
        </FixedMenu>
        <FixedMenu
          blank={true}
          href="https://docs.google.com/forms/d/e/1FAIpQLSfd0_agN6SLqM0PlYxjL4E9HiLdq6_9KN3i65Z2byNWCBj11w/viewform"
        >
          <BsMailbox />
        </FixedMenu>
        {authUser && (
          <FixedMenu href="/account">
            <FaRegUserCircle />
          </FixedMenu>
        )}
      </div>
    </>
  );
};

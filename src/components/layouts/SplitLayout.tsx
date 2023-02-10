import { useAtom } from "jotai";
import type { ReactNode } from "react";

import { Footer } from "@/components/modules/Footer";
import { Header } from "@/components/modules/Header";
import { LoginModal } from "@/components/modules/LoginModal";
import { SideNavigation } from "@/components/modules/SideNavigation";
import { useRedirections } from "@/hooks/useRedirections";
import { showSideNavigationAtom } from "@/state/utilities.state";

type Props = {
  children: ReactNode;
};
export const SplitLayout = ({ children }: Props) => {
  useRedirections();
  const [showSideNavigation] = useAtom(showSideNavigationAtom);
  const navToggleClass = showSideNavigation ? "left-0" : "-left-[320px]";
  return (
    <div className="flex h-full min-h-screen flex-col">
      <div id="container" className="flex">
        <div
          className={`fixed top-0 z-40 h-screen w-[280px] transition-all duration-300 lg:left-0  lg:w-[320px] lg:py-5 lg:pl-5 ${navToggleClass}`}
        >
          <div className="flex h-full rounded-r-2xl bg-white shadow-2xl shadow-gray-100 lg:rounded-lg">
            <SideNavigation />
          </div>
        </div>
        <div className="flex-1 lg:ml-[320px]">
          <div className="flex flex-col">
            <LoginModal />
            {/* <NoticeBar /> */}
            <div className="">
              <Header />
              <main className="px-5 pb-[100px] lg:pb-[60px]">{children}</main>
            </div>
          </div>
        </div>
      </div>
      <div id="footer" className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

import type { ReactNode } from "react";

import { Footer } from "@/components/modules/Footer";
import { Header } from "@/components/modules/Header";
import { LoginModal } from "@/components/modules/LoginModal";
import { SideNavigation } from "@/components/modules/SideNavigation";
import { useRedirections } from "@/hooks/useRedirections";

type Props = {
  children: ReactNode;
};
export const SplitLayout = ({ children }: Props) => {
  useRedirections();
  return (
    <div className="flex h-full min-h-screen flex-col">
      <div id="container" className="flex">
        <div className="fixed h-screen w-[320px] py-5 pl-5">
          <div className="flex h-full rounded-lg bg-white shadow-lg">
            <SideNavigation />
          </div>
        </div>
        <div className="ml-[320px] flex-1">
          <div className="flex flex-col">
            <LoginModal />
            {/* <NoticeBar /> */}
            <div className="">
              <Header />
              <main className="px-5">{children}</main>
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

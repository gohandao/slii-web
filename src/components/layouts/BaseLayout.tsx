import type { ReactNode } from "react";

import { Footer } from "@/components/modules/Footer";
import { Header } from "@/components/modules/Header";
import { LoginModal } from "@/components/modules/LoginModal";
import { useRedirections } from "@/utilities/useRedirections";

type Props = {
  children: ReactNode;
};
export const BaseLayout = ({ children }: Props) => {
  useRedirections();
  return (
    <div className="flex h-full min-h-screen flex-col">
      <div id="container">
        <div className="flex flex-col">
          <LoginModal />
          {/* <NoticeBar /> */}
          <Header />
          <div className="">
            <main>{children}</main>
          </div>
        </div>
      </div>
      <div id="footer" className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

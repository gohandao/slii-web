import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LoginModal } from "@/components/LoginModal";
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

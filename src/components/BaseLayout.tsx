import React, { ReactNode } from "react";
// utilities
import { useRedirections } from "@/utilities/useRedirections";
// components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NoticeBar } from "@/components/NoticeBar";
import { LoginModal } from "@/components/LoginModal";

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

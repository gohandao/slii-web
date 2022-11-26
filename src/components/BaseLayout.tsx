import React, { ReactNode, useContext } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NoticeBar } from "@/components/NoticeBar";
import Head from "next/head";
import { useRedirections } from "@/utilities/useRedirections";
import { LoginModal } from "./LoginModal";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";

type Props = {
  children: ReactNode;
};
export const BaseLayout = ({ children }: Props) => {
  useRedirections();

  return (
    <div className="flex flex-col h-full min-h-screen">
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

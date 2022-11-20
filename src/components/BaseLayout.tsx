import React, { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NoticeBar } from "@/components/NoticeBar";
import Head from "next/head";
import { useRedirections } from "@/utilities/useRedirections";
import { LoginModal } from "./LoginModal";

type Props = {
  children: ReactNode;
};
export const BaseLayout = ({ children }: Props) => {
  useRedirections();

  return (
    <>
      <LoginModal />
      {/* <NoticeBar /> */}
      <Header />
      <div className=""></div>
      <main>{children}</main>
    </>
  );
};

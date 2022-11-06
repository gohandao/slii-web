import React, { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NoticeBar } from "@/components/NoticeBar";
import Head from "next/head";
import { redirections } from "@/utilities/redirections";

type Props = {
  children: ReactNode;
};
export const BaseLayout = ({ children }: Props) => {
  redirections();

  return (
    <>
      <NoticeBar />
      <Header />
      <div className=""></div>
      <main>{children}</main>
    </>
  );
};

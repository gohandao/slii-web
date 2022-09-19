import React, { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NoticeBar } from "@/components/NoticeBar";

type Props = {
  children: ReactNode;
};
export const BaseLayout = ({ children }: Props) => {
  return (
    <>
      <NoticeBar />
      <Header />
      <div className=""></div>
      <main>{children}</main>
    </>
  );
};

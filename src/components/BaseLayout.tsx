import React, { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Props = {
  children: ReactNode;
};
export const BaseLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="bg-line"></div>
      <main>{children}</main>
      <Footer />
    </>
  );
};

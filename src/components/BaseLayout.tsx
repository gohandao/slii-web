import React, { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AlertBar } from "@/components/AlertBar";

type Props = {
  children: ReactNode;
};
export const BaseLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <AlertBar />
      <div className=""></div>
      <main>{children}</main>
    </>
  );
};

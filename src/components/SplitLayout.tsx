import React, { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NoticeBar } from "@/components/NoticeBar";
import { Mainvisual } from "./Mainvisual";
import { Searchbox } from "./Searchbox";
import { Tab } from "./Tab";
import { FaDiscord } from "react-icons/fa";
import { IconType } from "react-icons";
import { BsMailbox, BsMailbox2 } from "react-icons/bs";

type Props = {
  children: ReactNode;
};
export const SplitLayout = ({ children }: Props) => {
  type Props = {
    icon: any;
    title: string;
    link: string;
    className: string;
  };
  const Button = ({ icon, title, link, className }: Props) => {
    return (
      <a
        href={link}
        target="_blank"
        className={`flex items-center gap-3 w-full max-w-[480px] mx-auto px-5 py-3 rounded ${className}`}
      >
        <>
          {icon}
          <div className="flex-1 w-full text-center -ml-5">{title}</div>
        </>
      </a>
    );
  };
  return (
    <>
      <NoticeBar />
      <Header />
      <div className="flex gap-16 max-w-screen-xl mx-auto">
        <main className="flex-1 px-5 md:px-8 lg:px-0 mx-auto w-full">
          <Mainvisual />
          <div className="w-full mb-4">
            <Searchbox />
          </div>
          <div className="flex gap-3 mb-3 overscroll-x-auto">
            <Tab title="Creators" path="/" emoji="🎨" />
            <Tab title="Collections" path="/collections" emoji="🗂" />
            {/* <Tab title="Users" path="/users" emoji="😎" /> */}
          </div>
          {children}
        </main>
        <div className="w-[280px]">
          <div className="flex flex-col gap-4 pt-5">
            <Button
              title="Join our Discord"
              icon={<FaDiscord className="text-white" />}
              link="https://docs.google.com/forms/d/e/1FAIpQLSems7nn8p_Ki_u-y7KBDbNb4IoltypQ0tWvnyoayNjdcxMfNA/viewform"
              className="bg-purple-600 text-white"
            />
            <Button
              title="Request form"
              icon={<BsMailbox2 className="text-white" />}
              link="https://docs.google.com/forms/d/e/1FAIpQLSfd0_agN6SLqM0PlYxjL4E9HiLdq6_9KN3i65Z2byNWCBj11w/viewform"
              className="bg-green-600 text-white"
            />
            <p className="text-gray-400 text-xs leading-loose">
              NFT OTAKUは
              <a
                href="https://twitter.com/ik_takagishi"
                target="_blank"
                className="text-blue-400 underline"
              >
                @ik_takagishi
              </a>
              の個人開発アプリです。今後さまざまな機能を追加していきます!!
              お気軽にご意見・ご要望などDMください。
              また、一緒に活動いただける方を絶賛募集中です。ジェネラティブNFTなどに興味あるクリエイターさんもいたらぜひ！！
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

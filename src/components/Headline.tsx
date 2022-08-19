import React from "react";

import { Title } from "@/components/Title";

type Props = {
  pageTitle: string;
  title: string;
};
export const Headline = ({ pageTitle, title }: Props) => {
  return (
    <div className=" mb-4">
      <div className="flex gap-3">
        <div className="flex items-center">
          <div className="animated-dot"></div>
        </div>
        <div className="flex flex-col gap-2">
          <Title property="h2">{pageTitle}</Title>
        </div>
      </div>
      <h1 className="text-gray-500 text-sm tracking-[0.2em]">{title}</h1>
    </div>
  );
};

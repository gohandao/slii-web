import React from "react";

import { Title } from "@/components/Title";

type Props = {
  pageTitle: string;
  title: string;
  emoji?: string;
  length?: number;
  label?: string;
};
export const Headline = ({ pageTitle, title, emoji, length, label }: Props) => {
  return (
    <div className=" mb-4">
      <div className="mb-4 flex gap-3">
        {/*<div className="flex items-center">
          <div className="animated-dot"></div>
  </div>*/}
        <div className="flex items-baseline gap-3">
          <Title property="h2" addClass="">
            {emoji && <span className="mr-2 text-xl">{emoji}</span>}
            {pageTitle}
          </Title>
          {label && (
            <p className="text-sm text-gray-400">
              {length} {label}
            </p>
          )}
        </div>
      </div>
      <h1 className="text-sm tracking-[0.2em] text-gray-500">{title}</h1>
    </div>
  );
};

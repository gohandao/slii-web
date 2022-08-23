import React from "react";

import { Title } from "@/components/Title";

type Props = {
  pageTitle: string;
  title: string;
  length?: number;
  label?: string;
};
export const Headline = ({ pageTitle, title, length, label }: Props) => {
  return (
    <div className=" mb-4">
      <div className="flex gap-3 mb-4">
        <div className="flex items-center">
          <div className="animated-dot"></div>
        </div>
        <div className="flex gap-3 items-baseline">
          <Title property="h2" addClass="">
            {pageTitle}
          </Title>
          {label && (
            <p className="text-gray-400 text-sm">
              {length} {label}
            </p>
          )}
        </div>
      </div>
      <h1 className="text-gray-500 text-sm tracking-[0.2em]">{title}</h1>
    </div>
  );
};

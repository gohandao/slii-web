import React from "react";

type Props = {
  field: any;
  value: any;
};
export const Stats = ({ field, value }: Props) => {
  return (
    <div className="flex justify-between border-dotted border-b border-gray-700 py-2 last:border-0 text-sm">
      <dt className="w-30 text-gray-500">{field}</dt>
      <dd className="w-full flex-1 text-gray-400 text-right pl-5">{value}</dd>
    </div>
  );
};

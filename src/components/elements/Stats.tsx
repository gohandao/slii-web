import type { FC } from "react";

type Props = {
  field: any;
  value: any;
};
export const Stats: FC<Props> = ({ field, value }) => {
  return (
    <div className="">
      <dt className="sp:text-sm text-xs font-bold text-gray-500">{field}</dt>
      <dd className="flex items-center gap-1 text-lg font-bold text-gray-400">{value}</dd>
    </div>
  );
};

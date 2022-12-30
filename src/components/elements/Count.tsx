import type { FC } from "react";

type Props = {
  count: number;
  maxLength: number;
  property?: "input" | "textarea";
};
export const Count: FC<Props> = ({ count, maxLength, property }) => {
  const propertyClass = property === "input" ? "" : property === "textarea" ? "mb-2" : "";
  return (
    <p
      className={`absolute bottom-1 right-1 rounded-tl py-1 pl-3 pr-2 text-right text-xs text-gray-300 ${propertyClass}`}
    >
      {count}/{maxLength}
    </p>
  );
};

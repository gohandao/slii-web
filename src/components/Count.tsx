import React from "react";

type Props = {
  count: number;
  maxLength: number;
  property?: string;
};
export const Count = ({ count, maxLength, property }: Props) => {
  let propertyClass = "";
  switch (property) {
    case "input": {
      propertyClass = "";
      break;
    }
    case "textarea": {
      propertyClass = "mb-2";
      break;
    }
  }
  return (
    <p
      className={`absolute bottom-1 right-1 rounded-tl py-1 pl-3 pr-2 text-right text-xs text-gray-300 ${propertyClass}`}
    >
      {count}/{maxLength}
    </p>
  );
};

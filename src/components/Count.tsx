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
      className={`absolute bottom-1 right-1 pl-3 pr-2 py-1 text-right text-xs rounded-tl text-gray-300 ${propertyClass}`}
    >
      {count}/{maxLength}
    </p>
  );
};

import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  addClass?: string;
  property?: "h1" | "h2" | "h3" | "h4" | "h5";
};
export const Title = ({ children, addClass, property = "h2" }: Props) => {
  switch (property) {
    case "h1": {
      return <h1 className={`${addClass}`}>{children}</h1>;
      break;
    }
    case "h2": {
      return <h2 className={`font-bold text-2xl ${addClass}`}>{children}</h2>;
      break;
    }
    case "h3": {
      return <h3 className={`${addClass}`}>{children}</h3>;
      break;
    }
    case "h4": {
      return <h4 className={`${addClass}`}>{children}</h4>;
      break;
    }
  }
  return <p>add title</p>;
};

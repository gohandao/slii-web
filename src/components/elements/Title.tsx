import type { FC, ReactNode } from "react";

type Props = {
  addClass?: string;
  children: ReactNode;
  property?: "h1" | "h2" | "h3" | "h4" | "h5";
};
export const Title: FC<Props> = ({ addClass, children, property = "h2" }) => {
  switch (property) {
    case "h1": {
      return <h1 className={`${addClass}`}>{children}</h1>;
      break;
    }
    case "h2": {
      return (
        <h2 className={`flex items-center text-2xl font-bold tracking-wider text-white ${addClass}`}>{children}</h2>
      );
      break;
    }
    case "h3": {
      return <h3 className={`text-xl font-bold tracking-wider text-white ${addClass}`}>{children}</h3>;
      break;
    }
    case "h4": {
      return <h4 className={`${addClass}`}>{children}</h4>;
      break;
    }
  }
  return <p>add title</p>;
};

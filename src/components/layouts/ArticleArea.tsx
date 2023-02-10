import type { ReactNode } from "react";

type Props = {
  addClass?: string;
  children: ReactNode;
};
export const ArticleArea = ({ addClass, children }: Props) => {
  return (
    <article className={`relative mx-auto flex w-full max-w-[540px] flex-col rounded-2xl ${addClass}`}>
      {children}
    </article>
  );
};

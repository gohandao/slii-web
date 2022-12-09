import Link from "next/link";

type Props = {
  name: string;
  type: "creator" | "collection";
};
export const Label = ({ name, type }: Props) => {
  const typeClass = " border-gray-500 text-gray-600";
  return (
    <object>
      <Link href={`/tags/${name}?type=${type}`} legacyBehavior>
        <a className={`rounded py-1 text-xs md:text-sm ${typeClass}`}>#{name}</a>
      </Link>
    </object>
  );
};

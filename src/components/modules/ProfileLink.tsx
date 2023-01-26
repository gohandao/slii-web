import { AiFillInstagram, AiOutlineLink, AiOutlineTwitter } from "react-icons/ai";

type TLink = {
  label?: string;
  property: "default" | "twitter" | "instagram";
  url: string;
};
export const ProfileLink = ({ label, property = "default", url }: TLink) => {
  const linkIcon_class = "flex justify-center items-center h-5 w-5 rounded text-white";
  return (
    <div className="flex gap-3">
      {property == "default" && (
        <div className={`bg-gray-700 ${linkIcon_class}`}>
          <AiOutlineLink />
        </div>
      )}
      {property == "twitter" && (
        <div className={`bg-sky-500 ${linkIcon_class}`}>
          <AiOutlineTwitter />
        </div>
      )}
      {property == "instagram" && (
        <div className={`bg-pink-500 ${linkIcon_class}`}>
          <AiFillInstagram />
        </div>
      )}
      <div className="flex flex-1 flex-col">
        {label && <p className="text-sm">{label}</p>}
        <div className="flex">
          <a
            href={`${url}`}
            className="inline text-sm text-sky-700 underline transition-all duration-300 hover:no-underline"
            target="_blank"
            rel="noreferrer"
          >
            {url}
          </a>
        </div>
      </div>
    </div>
  );
};

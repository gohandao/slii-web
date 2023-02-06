import { AiFillInstagram, AiOutlineLink, AiOutlineTwitter } from "react-icons/ai";

type TLink = {
  label?: string;
  property: "default" | "twitter" | "instagram";
  url: string;
};
export const ProfileLink = ({ label, property = "default", url }: TLink) => {
  const linkIcon_class = "flex justify-center items-center h-5 w-5 rounded text-white";
  const url_text = property == "default" ? url : "@" + label;
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
        {property == "default" && label && <p className="text-sm">{label}</p>}
        <div className="flex items-center gap-1">
          <a
            href={`${url}`}
            className="inline text-sm text-sky-700 transition-all duration-300 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {url_text}
          </a>
        </div>
      </div>
    </div>
  );
};

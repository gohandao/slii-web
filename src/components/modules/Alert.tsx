import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { BiError, BiLoader } from "react-icons/bi";

type Props = {
  id: string;
  property: "success" | "progress" | "error" | "caution" | "info";
  setShow: (value: React.SetStateAction<boolean>) => void;
  show: boolean;
  text: string;
};
export const Alert = ({ id, property, setShow, show, text }: Props) => {
  let containerClass = "";
  let icon = <AiOutlineInfoCircle />;
  const iconBaseClass = "h-5 w-5 flex-shrink-0";
  let iconClass = "";
  let textClass = "";
  let hoverClass = "";
  let buttonClass = "";
  switch (property) {
    case "success":
      containerClass = "bg-green-100 p-4 dark:bg-green-200";
      iconClass = "text-green-700 dark:text-green-800";
      icon = <AiOutlineCheckCircle className={`${iconBaseClass} ${iconClass}`} />;
      textClass = "text-green-700 dark:text-green-800";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      hoverClass = "hover:text-green-800 dark:hover:text-green-900";
      buttonClass =
        "bg-green-100 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300";
      break;
    case "progress":
      containerClass = "bg-blue-100 dark:bg-blue-200";
      iconClass = "text-blue-700 dark:text-blue-800";
      icon = <BiLoader className={`${iconBaseClass} ${iconClass}`} />;
      textClass = "text-blue-700 dark:text-blue-800";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      hoverClass = "hover:text-blue-800 dark:hover:text-blue-900";
      buttonClass =
        "bg-blue-100 text-blue-500 hover:bg-blue-200 focus:ring-blue-400 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300";
      break;
    case "error":
      containerClass = "bg-red-100 p-4 dark:bg-red-200";
      iconClass = "text-red-700 dark:text-red-800";
      icon = <AiOutlineCloseCircle className={`${iconBaseClass} ${iconClass}`} />;
      textClass = "text-red-700 dark:text-red-800";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      hoverClass = "hover:text-red-800 dark:hover:text-red-900";
      buttonClass =
        "bg-red-100 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300";
      break;
    case "caution":
      containerClass = "bg-yellow-100 dark:bg-yellow-200";
      iconClass = "text-yellow-700 dark:text-yellow-800";
      icon = <BiError className={`${iconBaseClass} ${iconClass}`} />;
      textClass = "text-yellow-700 dark:text-yellow-800";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      hoverClass = "hover:text-yellow-800 dark:hover:text-yellow-900";
      buttonClass =
        "bg-yellow-100 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-400 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300";
      break;
    case "info":
      containerClass = "bg-gray-100 p-4 dark:bg-gray-700";
      iconClass = "text-gray-700 dark:text-gray-300";
      icon = <AiOutlineInfoCircle className={`${iconBaseClass} ${iconClass}`} />;
      textClass = "text-gray-700 dark:text-gray-300";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      hoverClass = "hover:text-gray-800 dark:hover:text-white";
      buttonClass =
        "bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white";
      break;
  }
  return (
    <>
      {show && (
        <div id={id} className={`mb-4 flex rounded p-4 ${containerClass}`} role="alert">
          {icon}
          <span className="sr-only">{property}</span>
          <div className={`ml-3 text-sm font-medium ${textClass}`}>
            {text}
            {/*
          //only here
          <a href="#" className={`font-semibold underline ${hoverClass}`}>
            example link
          </a>
          */}
          </div>
          <button
            type="button"
            className={`-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded p-1.5 focus:ring-2 ${buttonClass}`}
            data-dismiss-target={`#${id}`}
            aria-label="Close"
            onClick={() => {
              setShow(false);
            }}
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

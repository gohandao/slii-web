import type { FC } from "react";

type Props = {
  dropdown: boolean;
  icon: any;
  menus: {
    icon?: any;
    title: string;
    url: string;
  }[];
  position: "left" | "right";
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ProfileDropdown: FC<Props> = ({ dropdown, icon, menus, position, setDropdown }) => {
  let possitionClass = "";
  switch (position) {
    case "left":
      possitionClass = "origin-top-left left-0 ";
      break;
    case "right":
      possitionClass = "origin-top-right right-0 ";
      break;
  }
  const onClickHandler = (url: string) => {
    window.open(`${url}`, "_blank");
    setDropdown(false);
  };
  return (
    <div className="relative">
      <button
        onClick={() => {
          setDropdown(!dropdown);
        }}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sky-500 shadow-xl shadow-sky-50"
      >
        {icon}
      </button>
      {dropdown && (
        <div className={`absolute z-20 w-48 rounded border border-gray-700 bg-gray-800 ${possitionClass}`}>
          {menus.map((menu, index) => {
            return (
              <button
                onClick={() => {
                  onClickHandler(menu.url);
                }}
                className="flex items-center gap-3 px-5 py-3 text-sm normal-case text-gray-400"
                key={index}
              >
                {menu.icon}
                {menu.title}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

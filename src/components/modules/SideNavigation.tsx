import Image from "next/image";
import { BsGearFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { Link } from "react-scroll";

export const SideNavigation = () => {
  const menus = [
    { icon: <HiHome />, path: "/", text: "Home" },
    { icon: <FaUserAlt />, path: "/", text: "Profile" },
    { icon: <BsGearFill />, path: "/", text: "Settings" },
  ];
  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-col">
        <div className="flex h-[44px] w-[44px] shadow-lg">
          <Image src="/default-avatar.jpg" alt="avatar" width={44} height={44} />
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="text-lg text-sky-800">Alan Smithee</p>
          <p className="text-sm text-sky-800 opacity-50">@alan_smithee</p>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col">
            <p className="text-sm text-sky-800 opacity-50">Liked</p>
            <p className="text-lg text-sky-800">18</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-sky-800 opacity-50">Stars</p>
            <p className="text-lg text-sky-800">327</p>
          </div>
        </div>
        <nav>
          <ul className="flex flex-col">
            {menus.map((menu: any, index: number) => {
              return (
                <li key={index}>
                  <Link to={menu.path}>{menu.text}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="mt-auto">
        <a href="">Privacy policy</a>
        <a href="">Join our Discord</a>
      </div>
    </div>
  );
};

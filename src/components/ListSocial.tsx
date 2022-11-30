type StatsProps = {
  icon: JSX.Element | JSX.Element[];
  text: JSX.Element | JSX.Element[] | number;
};
export const ListSocial = ({ icon, text }: StatsProps) => {
  return (
    <div
      className={`relative left-0 top-0 z-10 flex items-center justify-center gap-2 rounded py-[2px] px-[2px] text-xs capitalize text-gray-500 md:text-xs `}
    >
      {icon}
      {text}
    </div>
  );
};

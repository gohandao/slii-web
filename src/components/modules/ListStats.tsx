type Props = {
  field: any;
  label: any;
};
export const ListStats = ({ field, label }: Props) => {
  return (
    <div className="">
      <p className="sp:text-sm text-xs font-bold text-gray-500">{label}</p>
      <div className="flex items-center gap-1 font-bold text-gray-400">{field}</div>
    </div>
  );
};

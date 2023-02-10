type Props = {
  count?: number;
  label: string;
};
export const ProfileCount = ({ count, label }: Props) => {
  // count = count ? count : 0;
  return (
    <div className="flex flex-col">
      <p className="text-sm font-medium text-sky-800 opacity-50 line-clamp-1">{label}</p>
      <p className="text-lg font-medium text-sky-800">{count}</p>
    </div>
  );
};

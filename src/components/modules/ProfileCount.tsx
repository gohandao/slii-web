type Props = {
  count: number;
  label: string;
};
export const ProfileCount = ({ count, label }: Props) => {
  return (
    <div className="flex flex-col">
      <p className="text-sm text-sky-800 opacity-50">{label}</p>
      <p className="text-lg text-sky-800">{count}</p>
    </div>
  );
};

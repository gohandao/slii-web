import { Tab } from "@/components/Tab";

type Props = {
  property?: "tag" | "user";
};
export const TabIndex = ({ property }: Props) => {
  return (
    <div className="flex gap-5">
      {property == "tag" ? (
        <>
          <Tab title="Creators" param="creator" />
          <Tab title="Collections" param="collection" />
        </>
      ) : property == "user" ? (
        <>
          <Tab title="Creators" param="creator" />
          <Tab title="Collections" param="collection" />
        </>
      ) : (
        <>
          <Tab title="Creators" path="/" />
          <Tab title="Collections" path="/collections" />
        </>
      )}
    </div>
  );
};

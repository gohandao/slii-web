// kata: creatorのコンポーネントのひとつ
import type { FC, ReactNode } from "react";
import TinderCard from "react-tinder-card";

type Props = {
  children: ReactNode;
  // onChangeLeft: any;
};
export const CreatorList: FC<Props> = ({ children }) => {
  const onSwipe = (direction: any) => {
    console.log("You swiped: " + direction);
  };
  const onCardLeftScreen = (myIdentifier: any) => {
    console.log(myIdentifier + " left the screen");
  };

  return (
    <div className="flex w-full">
      <TinderCard
        onSwipe={onSwipe}
        onCardLeftScreen={() => {
          return onCardLeftScreen("fooBar");
        }}
        preventSwipe={["right", "left"]}
        className="cursor-pointer"
      >
        {children}
      </TinderCard>
    </div>
  );
};

import React, { useMemo, useRef, useState } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import TinderCard from "react-tinder-card";

import { SwipeCard } from "@/components/modules/SwipeCard";
// import { TinderButtons } from "@/components/modules/TinderButtons";
import type { TCard, TItem } from "@/types/tinder";

// const TinderButtons = dynamic(
//   () => {
//     return import("@/components/modules/TinderButtons");
//   },
//   {
//     ssr: false,
//   }
// );
// dynamic import
// const TinderCard = dynamic(
//   () => {
//     return import("react-tinder-card");
//   },
//   {
//     ssr: false,
//   }
// );
// dynamic import
// eslint-disable-next-line import/no-default-export
export default function TinderItem({ buttonHandlers, cards }: TItem) {
  const [currentIndex, setCurrentIndex] = useState(cards.length - 1);
  const [lastDirection, setLastDirection] = useState<"left" | "right" | "up" | "down">();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(() => {
    return Array(cards.length)
      .fill(0)
      .map(() => {
        return React.createRef() as any;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("s childRefs");
  console.log(childRefs);

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < cards.length - 1;
  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: "left" | "right" | "up" | "down", nameToDelete: string, index: number) => {
    console.log("swiped");

    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log("outOfFrame");

    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: string) => {
    console.log("swipe");
    const item = document.querySelector<HTMLElement>(`.swipe:nth-child(${currentIndex + 1})`);
    if (item) {
      item.classList.remove("tinder-custom-undo-card-position");
    }
    if (canSwipe && currentIndex < cards.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    console.log("goback");
    console.log(canGoBack);
    console.log(currentIndex && currentIndex + 1);

    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
  };

  console.log("currentIndex");
  console.log(currentIndexRef);
  console.log(currentIndex);
  console.log(cards && cards.length);

  const tinder_buttons = [
    {
      class: "bg-white text-orange-500 w-[40px] h-[40px]",
      icon: <VscDebugRestart />,
      onClickHandler: () => {
        const item01 = document.querySelector<HTMLElement>(`.swipe:nth-child(${currentIndex + 2})`);
        const item02 = document.querySelector<HTMLElement>(`.swipe:nth-child(${currentIndex + 2})`);
        if (item01 || item02) {
          const custom_item = item01 ? item01 : item02;
          if (custom_item) {
            // item.classList.add("tinder-custom-undo-card-position");
            // item.classList.add("tinder-custom-undo-card-position");
            custom_item.classList.add("tinder-custom-undo-card-animation");
            custom_item.style.transform = "translate3d(0px, 0px, 0px) rotate(0deg)";
            // item.style.transform = "translate3d(0px, 0px, 0px) rotate(0deg)";
            setTimeout(() => {
              custom_item.classList.remove("tinder-custom-undo-card-animation");
            }, 3000);
          }
        }
        return goBack();
      },
    },
    {
      class: "bg-purple-500 text-white w-[60px] h-[60px]",
      icon: <IoClose />,
      onClickHandler: () => {
        return swipe("left");
      },
    },
    {
      class: "bg-pink-500 text-white w-[60px] h-[60px]",
      icon: <AiFillHeart />,
      onClickHandler: () => {
        return swipe("right");
      },
    },
    {
      class: "bg-yellow-500 text-white w-[40px] h-[40px]",
      icon: <AiFillStar />,
      onClickHandler: () => {
        return swipe("down");
      },
    },
  ];
  return (
    <div className="relative flex flex-col gap-8 ">
      <div className="cardContainer h-[512px] w-full overflow-hidden rounded-lg shadow-lg">
        {cards &&
          childRefs &&
          cards.map((card: TCard, index: number) => {
            // const status = currentIndex !== index && currentIndex !== index - 1 ? "hidden" : "";
            // console.log(index);
            return (
              <TinderCard
                // onSwipe={onSwipe}
                // onCardLeftScreen={() => {
                //   return onCardLeftScreen("fooBar");
                // }}
                ref={childRefs[index]}
                className="swipe absolute w-full cursor-pointer"
                key={card.name}
                onSwipe={(dir) => {
                  console.log("at onSwipe");
                  return swiped(dir, card.name, index);
                }}
                onCardLeftScreen={() => {
                  console.log("at onCardLeftScreen");
                  return outOfFrame(card.name, index);
                }}
                // preventSwipe={["right", "left"]}
              >
                <div className="card">
                  <SwipeCard
                    label={card.label}
                    name={card.name}
                    above_tags={card.above_tags}
                    below_tags={card.below_tags}
                    verified={card.verified}
                    image={card.image}
                    order={card.order}
                  />
                </div>
              </TinderCard>
            );
          })}
      </div>
      <div className="left-0 right-0 bottom-8 mx-auto w-full ">
        <div className="flex items-center justify-center gap-4">
          {tinder_buttons.map((value: any, index: number) => {
            return (
              <button
                key={index}
                className={`flex items-center justify-center rounded-full text-lg ${value.class}`}
                onClick={value.onClickHandler}
              >
                {value.icon}
              </button>
            );
          })}
        </div>{" "}
        {/* <TinderButtons
          onClickUndo={() => {
            console.log("yyyyyy");
            swipe("left");
          }}
          onClickDisllike={() => {
            console.log("yyyyyy");
            swipe("left");
          }}
          onClickLike={() => {
            console.log("yyyyyy");
            swipe("left");
          }}
          onClickStar={() => {
            console.log("yyyyyy");
            swipe("left");
          }}
        /> */}
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            // if (cards && canSwipe && childRefs && currentIndex < cards.length) {
            //   await childRefs[currentIndex]?.current?.swipe(dir); // Swipe the card!
            // }
            console.log("canSwipe");
            console.log(canSwipe);
            console.log("childRefs");
            console.log(childRefs);
            console.log("currentIndex");
            console.log(currentIndex);
            console.log("childRefs && currentIndex && childRefs[currentIndex]");
            console.log(childRefs && currentIndex && childRefs[currentIndex]);
            console.log("childRefs && currentIndex && childRefs[currentIndex]?.current");
            console.log(childRefs && currentIndex && childRefs[currentIndex]?.current);

            return swipe("left");
          }}
        >
          Swipe left!
        </button>
        <button
          onClick={() => {
            const item01 = document.querySelector<HTMLElement>(`.swipe:nth-child(${currentIndex + 2})`);
            const item02 = document.querySelector<HTMLElement>(`.swipe:nth-child(${currentIndex + 2})`);
            if (item01 || item02) {
              const custom_item = item01 ? item01 : item02;
              if (custom_item) {
                // item.classList.add("tinder-custom-undo-card-position");
                // item.classList.add("tinder-custom-undo-card-position");
                custom_item.classList.add("tinder-custom-undo-card-animation");
                custom_item.style.transform = "translate3d(0px, 0px, 0px) rotate(0deg)";
                // item.style.transform = "translate3d(0px, 0px, 0px) rotate(0deg)";
                setTimeout(() => {
                  custom_item.classList.remove("tinder-custom-undo-card-animation");
                }, 3000);
              }
            }
            return goBack();
          }}
        >
          Undo swipe!
        </button>
        <button
          onClick={() => {
            return swipe("right");
          }}
        >
          Swipe right!
        </button>
        {lastDirection && (
          <h2 key={lastDirection} className="infoText">
            You swiped {lastDirection}
          </h2>
        )}
      </div>
    </div>
  );
}

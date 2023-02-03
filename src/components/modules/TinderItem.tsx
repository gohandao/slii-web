import { useAtom } from "jotai";
// ReactはchildRefsで使用
// eslint-disable-next-line no-restricted-imports
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import TinderCard from "react-tinder-card";

import { SwipeCard } from "@/components/modules/SwipeCard";
import { useHandleReaction } from "@/hooks/useHandleReaction";
import { resetCardsAtom } from "@/state/utilities.state";
import type { Table } from "@/types/reaction";
import type { TCard, TItem } from "@/types/tinder";

// eslint-disable-next-line import/no-default-export
export default function TinderItem({ buttonHandlers, cards }: TItem) {
  console.log(buttonHandlers);
  const [resetCards, setResetCards] = useAtom(resetCardsAtom);
  // const { addLike, removeLike } = useHandleUpvote();
  const { addReaction, checkReaction, removeReaction } = useHandleReaction();
  const [cardHeight, setCardHeight] = useState<string>();
  const [currentIndex, setCurrentIndex] = useState(cards.length - 1);
  const [lastDirection, setLastDirection] = useState<string>();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);
  type SwipedRef = {
    id: string;
    index: number;
    type: string;
  };
  const swipedRefs = useRef<SwipedRef[]>([]);

  const childRefs = useMemo(() => {
    return Array(cards.length)
      .fill(0)
      .map(() => {
        return React.createRef() as any;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCards]);

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < cards.length - 1;
  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: "left" | "right" | "up" | "down", nameToDelete: string, index: number) => {
    console.log("swiped");
    const currentIndex = currentIndexRef.current;

    switch (direction) {
      case "left":
        setLastDirection("Hidden card.");
        break;
      case "right":
        switch (cards[currentIndex].type) {
          case "creator":
            const new_creator_like = { creator_username: cards[currentIndex].id, table: "upvotes" as Table };
            const new_creator_swipedRef = { id: cards[currentIndex].id, index: currentIndex, type: "creator" };
            try {
              addReaction(new_creator_like);
            } catch (error) {
              break;
            }
            swipedRefs.current = [...swipedRefs.current, new_creator_swipedRef];
            break;
          case "collection":
            const new_collection_like = { id: cards[currentIndex].id, collection_slug: cards[currentIndex].id };
            const new_collection_swipedRef = { id: cards[currentIndex].id, index: currentIndex, type: "collection" };
            try {
              addLike(new_collection_like);
            } catch (error) {
              break;
            }
            swipedRefs.current = [...swipedRefs.current, new_collection_swipedRef];
            break;
        }
        setLastDirection("Liked card.");
        break;
      case "up":
        setLastDirection("Stared card.");
        break;
      case "down":
        setLastDirection("Skip card.");
        break;

      default:
        break;
    }
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log("outOfFrame");
    console.log(currentIndexRef);
    console.log(currentIndexRef.current);

    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: string) => {
    console.log("swipe" + dir);
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
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
  };

  const LastDirection = () => {
    return (
      <div className="absolute -top-10 left-0 right-0 mx-auto flex items-center justify-center">
        <h2 key={lastDirection} className="inline-block rounded bg-gray-900 px-3 py-1 text-center text-sm text-white">
          {lastDirection}
        </h2>
      </div>
    );
  };
  const tinder_buttons = [
    {
      class: "bg-white text-orange-500 w-[40px] h-[40px]",
      icon: <VscDebugRestart />,
      onClickHandler: () => {
        const item01 = document.querySelector<HTMLElement>(`.swipe:nth-child(${currentIndex + 2})`);
        const item02 = document.querySelector<HTMLElement>(`.swipe:nth-child(${currentIndex + 1})`);
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
          console.log("ihgdioahgioahgdiaohgoidahogah");

          console.log("swipedRefs");
          console.log(swipedRefs.current);
          console.log(currentIndex);
          console.log(swipedRefs.current[currentIndex + 2]);

          const new_swipedRefs = swipedRefs.current.filter((swipedRef) => {
            return swipedRef.index !== currentIndex + 1;
          });
          const removed_swipedRefs = swipedRefs.current.filter((swipedRef) => {
            return swipedRef.index == currentIndex + 1;
          });

          swipedRefs.current = new_swipedRefs;

          console.log("removed_swipedRefs");
          console.log(removed_swipedRefs);

          if (removed_swipedRefs.length > 0) {
            const creator_username = removed_swipedRefs[0].type == "creator" ? removed_swipedRefs[0].id : undefined;
            const collection_slug = removed_swipedRefs[0].type == "collection" ? removed_swipedRefs[0].id : undefined;

            const remove_like = {
              collection_slug: collection_slug,
              creator_username: creator_username,
            };
            console.log("remove_like");
            console.log(remove_like);

            removeLike(remove_like);
          }
          setLastDirection("Undo card.");
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

  const getCardHeight = () => {
    const card_element = document.querySelector("#cardContainer .swipe");
    const card_height = card_element ? card_element.clientHeight : 0;
    const card_height_px = card_height + "px";
    card_height && setCardHeight(card_height_px);
  };
  useEffect(() => {
    getCardHeight();
    window.addEventListener("resize", getCardHeight, false);
  }, []);

  return (
    <div className="relative mx-auto flex w-full max-w-[80%] flex-col gap-8 lg:max-w-full">
      <div
        id="cardContainer"
        className={`w-full overflow-hidden rounded-lg bg-white shadow-lg`}
        style={{
          minHeight: cardHeight,
        }}
      >
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
                    id={card.id}
                    type={card.type}
                    name={card.name}
                    upvotes_count={card.upvotes_count}
                    above_tags={card.above_tags}
                    below_tags={card.below_tags}
                    verified={card.verified}
                    image={card.image}
                    order={card.order}
                    path={card.path}
                  />
                </div>
              </TinderCard>
            );
          })}
        <div
          className="flex h-full w-full flex-col items-center justify-center"
          style={{
            minHeight: cardHeight,
          }}
        >
          <button
            className="rounded-full border-2 border-sky-500 px-5 py-2 font-bold text-sky-500 transition-all duration-300 hover:bg-sky-500 hover:text-white"
            onClick={() => {
              setResetCards(!resetCards);
            }}
          >
            Get next cards.
          </button>
        </div>
      </div>
      <div className="fixed left-0 right-0 bottom-20 mx-auto mt-5 w-full lg:relative lg:bottom-auto">
        {lastDirection && <LastDirection />}
        <div className="flex items-center justify-center gap-4">
          {tinder_buttons.map((button: any, index: number) => {
            return (
              <button
                key={index}
                className={`flex items-center justify-center rounded-full text-lg ${button.class}`}
                onClick={button.onClickHandler}
              >
                {button.icon}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

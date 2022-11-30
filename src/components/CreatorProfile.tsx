import { useRouter } from "next/router";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "react-modal";
import { FaRegFlag, FaTwitter } from "react-icons/fa";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdVerified,
} from "react-icons/md";
import { BsThreeDots, BsTwitter } from "react-icons/bs";
// components
import { ProfileLinks } from "@/components/ProfileLinks";
import { Label } from "@/components/Label";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { CopyText } from "@/components/CopyText";
import { UpvoteButton } from "@/components/UpvoteButton";
import { BookmarkButton } from "@/components/BookmarkButton";
import { StatsBox } from "@/components/StatsBox";
import { Stats } from "@/components/Stats";
// types
import { Creator } from "@/types/creator";

type Props = {
  creator: Creator;
};
export const CreatorProfile = ({ creator }: Props) => {
  const router = useRouter();
  let baseUrl = "" as string;
  if (process.env.NODE_ENV != "test") {
    baseUrl = {
      production: "https://gachi-collection.vercel.app",
      development: "http://localhost:3000",
    }[process.env.NODE_ENV];
  }
  const [requestDropdown, setRequestDropdown] = useState<boolean>(false);

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      zIndex: 9999,
    },

    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "500px",
      height: "300px",
      transform: "translate(-50%, -50%)",
    },
  };
  Modal.setAppElement("#__next");
  const [modalIsOpen, setIsOpen] = useState(false);
  // モーダルを開く処理
  const openModal = () => {
    setIsOpen(true);
  };
  const afterOpenModal = () => {
    // モーダルが開いた後の処理
  };
  // モーダルを閉じる処理
  const closeModal = () => {
    setIsOpen(false);
  };
  const [twitterFollowers, setTwitterFollowers] = useState<number>();

  // シェアボタンのリンク先
  const currentUrl = baseUrl + router.asPath;
  var twitterShareUrl = "https://twitter.com/intent/tweet";
  twitterShareUrl += "?text=" + encodeURIComponent("ツイート内容テキスト");
  twitterShareUrl += "&url=" + encodeURIComponent(currentUrl);
  const shareMenus = [
    /*{
      icon: <FiCopy />,
      title: "Copy URL",
      url: twitterShareUrl,
    },*/
    {
      icon: <BsTwitter />,
      title: "Share on Twitter",
      url: twitterShareUrl,
    },
  ];
  const requestMenus = [
    {
      icon: <FaRegFlag />,
      title: "Kaizen idea",
      url: "https://google.com",
    },
  ];

  const description = creator.description;
  const slicedDescription =
    description && description.length > 80
      ? description.slice(0, 80) + "…"
      : description;
  const [showDescription, setShowDescription] = useState<boolean>(false);
  return (
    <section className="">
      <div className="relative -mt-[70px] flex h-40 w-full overflow-hidden border-x-[10px] border-t-[10px] border-transparent opacity-20 md:h-60 ">
        {creator.background && creator.background.length > 0 && (
          <>
            {
              //@ts-ignore
              creator.background[0].thumbnails ? (
                <Image
                  //@ts-ignore
                  src={creator.background[0].thumbnails.large.url}
                  alt=""
                  loading="lazy"
                  className="rounded-lg bg-gray-800"
                  quality={10}
                  fill
                  sizes="300px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Image
                  //@ts-ignore
                  src={creator.background[0].url}
                  alt=""
                  loading="lazy"
                  className="rounded-lg bg-gray-800"
                  quality={10}
                  fill
                  sizes="300px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              )
            }
          </>
        )}
      </div>
      <div className="mx-auto px-5 lg:px-8">
        <div className="relative -mt-[58px] mb-2 flex items-end justify-between">
          <div className="relative flex">
            <div className="z-10 flex h-[110px] w-[110px] items-center justify-center overflow-hidden rounded-full border-[5px] border-gray-800 bg-gray-800">
              {creator.avatar && creator.avatar.length > 0 ? (
                <Image
                  //@ts-ignore
                  src={creator.avatar[0].thumbnails.large.url}
                  width={100}
                  height={100}
                  alt=""
                  quality={10}
                  sizes="200px"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Image
                  //@ts-ignore
                  src={creator.avatar[0].url}
                  width={100}
                  height={100}
                  alt=""
                  quality={10}
                  sizes="200px"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>

            <div className="absolute top-5 left-full ml-2 flex items-center gap-4">
              <ProfileLinks
                address={creator.address}
                twitter_id={creator.twitter_id}
                instagram_id={creator.instagram_id}
                discord_url={creator.discord_url}
                website_url={creator.website_url}
                opensea_username={creator.username}
              />
            </div>
          </div>
          <div className="ml-3 flex w-full flex-1 justify-between">
            <div className=" flex items-center justify-center gap-5 capitalize">
              {/* <ProfileDropdown
                icon={<BsFillShareFill className="text-gray-500" />}
                dropdown={shareDropdown}
                setDropdown={setShareDropdown}
                menus={shareMenus}
              /> */}
              <ProfileDropdown
                position="left"
                icon={<BsThreeDots className="text-gray-500" />}
                dropdown={requestDropdown}
                setDropdown={setRequestDropdown}
                menus={requestMenus}
              />
            </div>
            <div className="flex items-center gap-3">
              <BookmarkButton id={creator.username} type="creator" />
              <UpvoteButton
                id={creator.username}
                property="default"
                type="creator"
                count={creator.upvotes_count}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-between gap-16">
          <div className="flex flex-col gap-2">
            <h1 className="inline items-center justify-center text-2xl font-bold text-gray-100 sm:text-3xl">
              {creator.username}{" "}
              {creator.verified == true && (
                <MdVerified className="ml-1 inline text-xl text-gray-500" />
              )}
            </h1>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Image
                src="/icon-eth.svg"
                width={16}
                height={16}
                alt=""
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
              <CopyText
                text={creator.address}
                alertText="ETH address has copied!"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="mt-1 break-all text-justify text-sm text-gray-100 transition-all duration-200 sm:text-base ">
                {showDescription ? description : slicedDescription}
              </p>
              {description && description.length > 80 && (
                <>
                  <button
                    className="inline-flex items-center gap-1 text-gray-500"
                    onClick={() => {
                      showDescription
                        ? setShowDescription(false)
                        : setShowDescription(true);
                    }}
                  >
                    {showDescription ? (
                      <>
                        <MdKeyboardArrowUp />
                        Show less
                      </>
                    ) : (
                      <>
                        <MdKeyboardArrowDown />
                        Show more
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="mt-1 flex flex-col">
            <StatsBox>
              {twitterFollowers && (
                <Stats
                  field="Followers"
                  value={
                    <div className="flex w-full items-center justify-end gap-2">
                      <FaTwitter className="text-sm opacity-60" />
                      {twitterFollowers}
                    </div>
                  }
                />
              )}
              <Stats field="Collections" value={twitterFollowers} />
              <Stats field="Created" value={twitterFollowers} />
              <Stats field="Collected" value={twitterFollowers} />
              <Stats field="Views" value="100" />
              {creator.tags && (
                <Stats
                  field="Tags"
                  value={
                    <div className="flex w-full justify-end gap-2">
                      {creator.tags.map((tag, index) => (
                        <Label key={index} name={tag} type="creator" />
                      ))}
                    </div>
                  }
                />
              )}
            </StatsBox>
          </div>
        </div>
      </div>
    </section>
  );
};

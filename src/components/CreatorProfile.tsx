import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";

import { FaDiscord, FaReact, FaRegFlag, FaTwitter } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { AiOutlineClockCircle, AiOutlineTwitter } from "react-icons/ai";
import { VscChecklist } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";

import { ProfileLinks } from "@/components/ProfileLinks";
import { Label } from "@/components/Label";

import { Creator } from "@/types/creator";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdVerified,
} from "react-icons/md";
import { LikeViews } from "@/components/LikeViews";
import { JP } from "country-flag-icons/react/3x2";
import { BsFillShareFill, BsThreeDots, BsTwitter } from "react-icons/bs";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { CopyText } from "@/components/CopyText";
import { useRouter } from "next/router";
import { FiCopy } from "react-icons/fi";
import { Social } from "@/types/social";
import { BaseContext } from "@/contexts/BaseContext";
import { ViewsCount } from "@/components/ViewsCount";
import { VoteButton } from "./VoteButton";
import { BookmarkButton } from "./BookmarkButton";
import { StatsBox } from "./StatsBox";
import { Stats } from "./Stats";
import { getTwitterFollowers } from "@/libs/twitter";
import { updateSocial } from "@/utilities/updateSocial";

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
  // const { socials, setSocials } = useContext(BaseContext);

  const [social, setSocial] = useState<Social>();

  const [requestDropdown, setRequestDropdown] = useState<boolean>(false);
  const [shareDropdown, setShareDropdown] = useState<boolean>(false);
  const twitterId = creator.twitter_id && creator.twitter_id;
  const discordId =
    creator.discord_url &&
    creator.discord_url.substring(creator.discord_url.lastIndexOf("/") + 1);

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
  const [discordMembers, setDiscordMembers] = useState<number>();
  const [checkSocial, setCheckSocial] = useState<boolean>(false);
  // const getSocialCounts = async () => {
  //   const data =
  //     social &&
  //     (await updateSocial({
  //       record_id: social.record_id,
  //       creator_username: creator.username,
  //       twitter_id: twitterId,
  //       twitter_followers: social.twitter_followers,
  //       discord_id: discordId,
  //       discord_members: social.discord_members,
  //       socials: socials,
  //       setSocials: setSocials,
  //     }));
  //   setTwitterFollowers(data && data.twitter_followers);
  //   setDiscordMembers(data && data.discord_members);

  //   setCheckSocial(true);
  // };
  // !checkSocial && social && getSocialCounts();

  // useEffect(() => {
  //   if (socials && creator.username) {
  //     //set collection
  //     const socials_filter = socials.filter(
  //       (social) => creator.username === social.creator_username
  //     );
  //     socials_filter.length > 0 && setSocial(socials_filter[0]);
  //     if (socials_filter.length == 0) {
  //       setSocial({
  //         collection_slug: "",
  //         creator_username: "",
  //         twitter_followers: null,
  //         discord_members: null,
  //         record_id: null,
  //       });
  //     }
  //   }
  // }, [socials]);

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
    <section className="ttt">
      {/*<button onClick={openModal} className="text-white">
        Open Modal
  </button>*/}
      <Modal
        // isOpenがtrueならモダールが起動する
        isOpen={modalIsOpen}
        // モーダルが開いた後の処理を定義
        onAfterOpen={afterOpenModal}
        // モーダルを閉じる処理を定義
        onRequestClose={closeModal}
        //@ts-ignore
        style={customStyles}
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
      </Modal>
      <div className="flex relative w-full h-40 md:h-60 overflow-hidden -mt-[70px] opacity-20 border-t-[10px] border-x-[10px] border-transparent ">
        {creator.background && creator.background.length > 0 && (
          <>
            {
              //@ts-ignore
              creator.background[0].thumbnails ? (
                <Image
                  //@ts-ignore
                  src={creator.background[0].thumbnails.large.url}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                  loading="lazy"
                  className="bg-gray-800 rounded-lg"
                  quality={10}
                />
              ) : (
                <Image
                  //@ts-ignore
                  src={creator.background[0].url}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                  loading="lazy"
                  className="bg-gray-800 rounded-lg"
                  quality={10}
                />
              )
            }
          </>
        )}
      </div>
      <div className="mx-auto px-5 lg:px-8">
        <div className="-mt-[58px] relative flex justify-between items-end mb-2">
          <div className="relative flex">
            <div className="rounded-full border-[5px] border-gray-800 overflow-hidden flex items-center justify-center z-10 bg-gray-800 w-[110px] h-[110px]">
              {creator.avatar && creator.avatar.length > 0 ? (
                <Image
                  //@ts-ignore
                  src={creator.avatar[0].thumbnails.large.url}
                  width={100}
                  height={100}
                  objectFit="cover"
                  alt=""
                  quality={10}
                />
              ) : (
                <Image
                  //@ts-ignore
                  src={creator.avatar[0].url}
                  width={100}
                  height={100}
                  objectFit="cover"
                  alt=""
                  quality={10}
                />
              )}
            </div>

            <div className="absolute top-5 left-full flex items-center gap-4 ml-2">
              {/* <p
                className={` -ml-6 pl-[24px] pr-3 rounded-tr-full rounded-br-full text-sm capitalize flex justify-center items-center gap-[6px] ${
                  creator.type == "creator"
                    ? "bg-yellow-500 text-yellow-100"
                    : "bg-blue-500 text-blue-100"
                }`}
              >
                <JP title="Japan" className="h-3 rounded-sm" />
                {creator.type}
              </p> */}
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
          <div className="flex justify-between flex-1 w-full ml-3">
            <div className=" gap-5 capitalize flex justify-center items-center">
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
              <VoteButton
                id={creator.username}
                property="default"
                type="creator"
                count={creator.upvotes_count}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 gap-16 justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl text-gray-100 font-bold inline justify-center items-center">
              {creator.username}{" "}
              {creator.verified == true && (
                <MdVerified className="text-gray-500 text-xl inline ml-1" />
              )}
            </h1>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Image src="/icon-eth.svg" width={16} height={16} alt="" />
              <CopyText
                text={creator.address}
                alertText="ETH address has copied!"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-100 mt-1 text-justify break-all text-sm sm:text-base transition-all duration-200 ">
                {showDescription ? description : slicedDescription}
              </p>
              {description && description.length > 80 && (
                <>
                  <button
                    className="inline-flex text-gray-500 items-center gap-1"
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
          <div className="flex flex-col mt-1">
            <StatsBox>
              {twitterFollowers && (
                <Stats
                  field="Followers"
                  value={
                    <div className="flex gap-2 items-center w-full justify-end">
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
                    <div className="flex gap-2 justify-end w-full">
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

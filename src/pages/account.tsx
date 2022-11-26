import { NextPage } from "next";

import Head from "next/head";
import Link from "next/link";
import router, { Router } from "next/router";
import { useState, useEffect, SetStateAction, useContext } from "react";
import { getImageUrl, supabase } from "@/libs/supabase";
import { BaseLayout } from "@/components/BaseLayout";

// import imageCompression from "browser-image-compression";

import { Input } from "@/components/Input";
import { UploadImage } from "@/components/UploadImage";
import { AuthContext } from "@/contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { UploadBackground } from "@/components/UploadBackground";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiMapPinUserLine, RiUser3Line } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { TbArrowBack, TbUser } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { Textarea } from "@/components/Textarea";
import { CgUserlane } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import { NextSeo } from "next-seo";

const AccountPage: NextPage = () => {
  const { setHeaderIcon } = useContext(UtilitiesContext);

  useEffect(() => {
    setHeaderIcon({
      title: "Account",
      emoji: "",
      element: <CgUserlane />,
      avatar: "",
      path: `/account`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user, profile, avatar, setAvatar } = useContext(AuthContext);
  const [newAvatar, setNewAvatar] = useState<File>();
  const [label, setLabel] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [background, setBackground] = useState<File>();
  const [newBackground, setNewBackground] = useState<File>();
  const [loading, setLoading] = useState(false);
  // const [avatar, setAvatar] = useState<File>();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  //const [website, setWebsite] = useState<string>('')
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const options = {
    maxSizeMB: 1, // 最大ファイルサイズ
    maxWidthOrHeight: 80, // 最大画像幅もしくは高さ
  };
  // const file = await imageCompression(images[0].files[0], options);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
    if (profile) {
      setUsername(profile.username);
      setAvatarUrl(profile.avatar_url);

      let background_blob;
      const getBackgroundBlob = async () => {
        background_blob =
          profile &&
          profile.background_url &&
          (await getImageUrl(profile.background_url));
        setBackground(background_blob);
      };
      getBackgroundBlob();
    }
  }, [user, profile]);

  const uploadImage = async (image: File, path: string) => {
    const uuid = uuidv4();

    const { data, error } = await supabase.storage
      .from(path)
      .upload(`public/${uuid}.jpg`, image, {
        cacheControl: "3600",
        upsert: false,
      });
    return data;
  };
  const updateProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      let new_avatar_url;
      let new_background_url;
      if (user) {
        if (avatar) {
          new_avatar_url = await uploadImage(avatar, "avatars");
          new_avatar_url = new_avatar_url?.Key;
        }
        if (background) {
          new_background_url = await uploadImage(background, "public");
          new_background_url = new_background_url?.Key;
        }
        const updates = {
          id: user.id,
          username: username,
          label: label,
          description: description,
          background_url: new_background_url,
          avatar_url: new_avatar_url,
          updated_at: new Date(),
        };

        let { error } = await supabase.from("profiles").upsert(updates, {
          returning: "minimal", // Don't return the value after inserting
        });
        alert("upload success");

        if (error) {
          throw error;
        }
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
      //location.reload();
    }
  };

  return (
    <div>
      <NextSeo
        title="Account Page | NFT OTAKU"
        description="Please login."
        openGraph={{
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/",
          title: "All NFT Collections in Japan | NFT OTAKU",
          description:
            "Discover favorite Japanese NFT creators, projects and collections. NFT OTAKU is one of the biggest NFT creator search application in Japan.",
        }}
      />
      {/* <Head>
        <title>Account Page | NFT OTAKU</title>
        <meta name="description" content="Please login." />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <BaseLayout>
        <div className="mt-8 px-5">
          <div className="mx-auto max-w-2xl  ">
            {user ? (
              <>
                <div className="relative overflow-hidden rounded bg-gray-800 pb-10">
                  <div className="relative z-10 flex items-center justify-between gap-5 py-2 px-5">
                    <button
                      className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-gray-600 text-gray-300 "
                      onClick={() => router.back()}
                    >
                      <IoChevronBackOutline className="text-gray-400" />
                    </button>
                    <button
                      className="w-[90px] overflow-hidden rounded-full bg-green-600 py-2 px-5 text-green-100"
                      onClick={() => updateProfile()}
                      disabled={loading}
                    >
                      {loading ? "Loading ..." : "Save"}
                    </button>
                  </div>
                  <div className="relative px-5 md:px-16 ">
                    <div className="absolute left-0 top-0 flex h-[120px] w-full items-center justify-center">
                      <UploadBackground
                        image={background}
                        newImage={background}
                        setNewImage={setBackground}
                      />
                    </div>
                    <div className=" pt-16 ">
                      <div className="mb-3 flex">
                        <UploadImage
                          image={avatar}
                          newImage={newAvatar}
                          setNewImage={setNewAvatar}
                        />
                      </div>
                      <div className="mb-5">
                        <Input
                          label="Email"
                          id="email"
                          type="email"
                          placeholder="sample@nftotaku.xyz"
                          value={email}
                          onChange={setEmail}
                        />
                      </div>
                      <div className="mb-5">
                        <Input
                          label="Username"
                          id="username"
                          type="text"
                          value={username}
                          placeholder="Minimum 4 characters"
                          onChange={setUsername}
                        />
                        <Link href={`/${username}`} legacyBehavior>
                          <a className="mt-1 inline-block text-sm text-blue-500 underline hover:no-underline">
                            https://nftotaku.xyz/{username}
                          </a>
                        </Link>
                      </div>
                      <div className="mb-5">
                        <Input
                          label="Label"
                          id="label"
                          type="text"
                          value={label}
                          placeholder="NFT Collecter"
                          onChange={setLabel}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-gray-100">Description</p>
                        <Textarea
                          id="description"
                          required={false}
                          maxLength={200}
                          text={description}
                          setText={setDescription}
                        />
                      </div>
                      {/* <div className="">
              <div className="bg-gray-700 px-5 py-2 rounded mt-8 mb-4">
                <p className="text-gray-200 text-center ">Verified user only</p>
              </div>
              <div className="mb-5">
                <Input
                  label="Twitter ID"
                  id="email"
                  type="email"
                  value={email || ""}
                  onChange={setEmail}
                />
              </div>
              <div className="mb-5">
                <Input
                  label="Instagram ID"
                  id="email"
                  type="email"
                  value={email || ""}
                  onChange={setEmail}
                />
              </div>
              <div className="mb-5">
                <Input
                  label="Discord URL"
                  id="email"
                  type="email"
                  value={email || ""}
                  onChange={setEmail}
                />
              </div>
              <div className="mb-5">
                <Input
                  label="Website URL"
                  id="email"
                  type="email"
                  value={email || ""}
                  onChange={setEmail}
                />
              </div>
            </div> */}
                    </div>
                  </div>
                </div>
                {/* <div className="flex gap-5 justify-center items-center mt-6">
                  <button
                    className="w-[120px] sm:w-[200px] py-3 px-5 rounded bg-gray-600 text-gray-300 border-b-[6px] border-gray-700"
                    onClick={() => router.back()}
                  >
                    Back
                  </button>
                  <button
                    className="w-[120px] sm:w-[200px] py-3 px-5 rounded bg-green-600 text-green-100  border-b-[6px] border-green-800"
                    onClick={() => updateProfile()}
                    disabled={loading}
                  >
                    {loading ? "Loading ..." : "Save"}
                  </button>
                </div> */}
              </>
            ) : (
              <>
                <p className="text-gray-400">Please login.</p>
              </>
            )}
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};
export default AccountPage;

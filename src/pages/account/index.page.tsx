import type { NextPage } from "next";
import Link from "next/link";
import router from "next/router";
import { NextSeo } from "next-seo";
import { useContext, useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

import { Input } from "@/components/elements/Input";
import { Textarea } from "@/components/elements/Textarea";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/libs/supabase";
import { UploadAvatar } from "@/pages/account/components/UploadAvatar";
import { UploadBackground } from "@/pages/account/components/UploadBackground";

const AccountPage: NextPage = () => {
  const { profile } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [newAvatar, setNewAvatar] = useState<File>();
  const [backgroundUrl, setBackgroundUrl] = useState<string>("");
  const [newBackground, setNewBackground] = useState<File>();
  const [label, setLabel] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const user = supabase.auth.user();

  // const options = {
  //   maxSizeMB: 1, // 最大ファイルサイズ
  //   maxWidthOrHeight: 80, // 最大画像幅もしくは高さ
  // };
  useEffect(() => {
    // reload時に!userとなるためauthチェック
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/");
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (user && typeof user.email === "string") {
      setEmail(user.email);
    }
    if (profile) {
      setUsername(profile.username);
      setAvatarUrl(profile.avatar_url);
      setBackgroundUrl(profile.background_url);
      setLabel(profile.label);
      setDescription(profile.description);
    }
  }, [user, profile]);

  type UploadImageProps = {
    image: File;
    path: string;
    storage: string;
  };
  const uploadImage = async ({ image, path, storage }: UploadImageProps) => {
    const STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;
    const uuid = uuidv4();
    const { data, error } = await supabase.storage.from(storage).upload(`${path}/${uuid}.jpg`, image, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      console.log("error at uploadImage");
      console.log(error);
      return;
    }
    const image_url = STORAGE_URL && STORAGE_URL + "/" + storage + "/" + data?.path;
    return image_url;
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = supabase && (await supabase.auth.getUser());
      let new_avatar_url;
      let new_background_url;
      if (user) {
        if (newAvatar) {
          new_avatar_url = await uploadImage({ image: newAvatar, path: "public", storage: "avatars" });
        }
        new_avatar_url = new_avatar_url ? new_avatar_url : profile.avatar_url;
        if (newBackground) {
          new_background_url = await uploadImage({ image: newBackground, path: "images", storage: "publichhhhh" });
        }
        new_background_url = new_background_url ? new_background_url : profile.background_url;
        const updates = {
          id: user.id,
          avatar_url: new_avatar_url,
          background_url: new_background_url,
          description: description,
          label: label,
          updated_at: new Date(),
          username: username,
        };

        if (supabase) {
          const { error } = await supabase.from("profiles").upsert(updates);
          alert("upload success");
          if (error) {
            throw error;
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NextSeo
        title="Account Page | NFT OTAKU"
        description="Please login."
        openGraph={{
          description:
            "Discover favorite Japanese NFT creators, projects and collections. NFT OTAKU is one of the biggest NFT creator search application in Japan.",
          title: "All NFT Collections in Japan | NFT OTAKU",
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/",
        }}
      />
      <BaseLayout>
        <div className="mt-8 px-5">
          <div className="mx-auto max-w-2xl  ">
            {user ? (
              <>
                <div className="relative overflow-hidden rounded bg-gray-800 pb-10">
                  <div className="relative z-10 flex items-center justify-between gap-5 py-2 px-5">
                    <button
                      className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-gray-600 text-gray-300 "
                      onClick={() => {
                        return router.back();
                      }}
                    >
                      <IoChevronBackOutline className="text-gray-400" />
                    </button>
                    <button
                      className="overflow-hidden whitespace-nowrap rounded-full bg-green-600 py-2 px-7 text-center text-green-100"
                      onClick={() => {
                        return updateProfile();
                      }}
                      disabled={loading}
                    >
                      Save
                    </button>
                  </div>
                  <div className="relative px-5 md:px-16 ">
                    <div className="absolute left-0 top-0 flex h-[120px] w-full items-center justify-center">
                      <UploadBackground image={backgroundUrl} newImage={newBackground} setNewImage={setNewBackground} />
                    </div>
                    <div className=" pt-16 ">
                      <div className="mb-3 flex">
                        <UploadAvatar image={avatarUrl} newImage={newAvatar} setNewImage={setNewAvatar} />
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

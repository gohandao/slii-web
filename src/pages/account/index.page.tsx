import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { Input } from "@/components/elements/Input";
import { NavButton } from "@/components/elements/NavButton";
import { Textarea } from "@/components/elements/Textarea";
import { ArticleArea } from "@/components/layouts/ArticleArea";
import { SplitLayout } from "@/components/layouts/SplitLayout";
import { ProfileBlock } from "@/components/modules/ProfileBlock";
import { site_name } from "@/constant/seo.const";
import { useRedirections } from "@/hooks/useRedirections";
import { supabase } from "@/libs/supabase";
import { UploadAvatar } from "@/pages/account/components/UploadAvatar";
import { authProfileAtom, authUserAtom } from "@/state/auth.state";
import type { LinksField } from "@/types/linksField";

const AccountLinks = dynamic(
  () => {
    return import("@/components/modules/AccountLinks");
  },
  {
    ssr: false,
  }
);

// interface IFormInput {
//   age: number;
//   firstName: string;
//   lastName: string;
// }

type UploadImageProps = {
  image: File;
  path: string;
  storage: string;
};

const AccountPage: NextPage = () => {
  const router = useRouter();
  const isReady = router.isReady;
  useRedirections();
  const initial_id = nanoid();
  // const { handleSubmit, register } = useForm<IFormInput>();
  // const onSubmit: SubmitHandler<IFormInput> = (data) => {
  //   return console.log(data);
  // };

  const [authProfile] = useAtom(authProfileAtom);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [newAvatar, setNewAvatar] = useState<File>();
  // const [backgroundUrl, setBackgroundUrl] = useState<string>("");
  // const [newBackground, setNewBackground] = useState<File>();
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [twitterId, setTwitterId] = useState<string | null>("");
  const [instagramId, setInstagramId] = useState<string | null>("");
  const [links, setLinks] = useState<LinksField[]>([
    {
      id: initial_id,
      label: "",
      url: "",
    },
  ]);
  const [authUser] = useAtom(authUserAtom);

  // const options = {
  //   maxSizeMB: 1, // 最大ファイルサイズ
  //   maxWidthOrHeight: 80, // 最大画像幅もしくは高さ
  // };

  useEffect(() => {
    if (authUser && typeof authUser.email === "string") {
      setEmail(authUser.email);
    }
    if (authProfile) {
      setName(authProfile.name);
      setUsername(authProfile.username);
      setAvatarUrl(authProfile.avatar_url ? authProfile.avatar_url : "/default-avatar.jpg");
      // setBackgroundUrl(authProfile.background_url);
      setDescription(authProfile.description);
      authProfile.twitter_id && setTwitterId(authProfile.twitter_id);
      authProfile.instagram_id && setInstagramId(authProfile.instagram_id);
      setLinks(authProfile.links);
    }
  }, [authUser, authProfile]);

  const uploadImage = async ({ image, path, storage }: UploadImageProps) => {
    const STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;
    const uuid = uuidv4();
    const { data, error } = await supabase.storage.from(storage).upload(`${path}/${uuid}.jpg`, image, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      console.log(error);
      return;
    }
    const image_url = STORAGE_URL && STORAGE_URL + "/" + storage + "/" + data?.path;
    return image_url;
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      let new_avatar_url;
      // let new_background_url;
      if (authUser && authProfile) {
        if (newAvatar) {
          new_avatar_url = await uploadImage({ image: newAvatar, path: "public", storage: "avatars" });
        }
        new_avatar_url = new_avatar_url ? new_avatar_url : authProfile.avatar_url;
        // if (newBackground) {
        //   new_background_url = await uploadImage({ image: newBackground, path: "images", storage: "public" });
        // }
        // new_background_url = new_background_url ? new_background_url : authProfile.background_url;
        const updates = {
          id: authUser.id,
          avatar_url: new_avatar_url,
          // background_url: new_background_url,
          description: description,
          instagram_id: instagramId,
          links: links,
          twitter_id: twitterId,
          updated_at: new Date(),
          username: username,
        };
        if (new_avatar_url || description != authProfile.description) {
          const { error } = await supabase.from("profiles").upsert(updates);
          if (error) {
            toast.error("Failed to upload data.");
          } else {
            toast.success("Upload succeeded.");
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
        title={`Account Page | ${site_name}`}
        description="Please login."
        openGraph={{
          description: "Edit your account.",
          title: `Account Page | ${site_name}`,
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/",
        }}
      />
      <SplitLayout>
        <ArticleArea>
          <div className="w-full">
            {authUser ? (
              <>
                <div className="flex flex-col gap-[10px]">
                  <div className="relative z-10 flex items-center justify-between">
                    <button
                      className=""
                      onClick={() => {
                        return isReady && router.back();
                      }}
                    >
                      <NavButton>
                        <IoChevronBackOutline />
                      </NavButton>
                    </button>
                    <button
                      className="overflow-hidden whitespace-nowrap rounded-full bg-sky-500 py-2 px-7 text-center text-white"
                      onClick={() => {
                        return updateProfile();
                      }}
                      disabled={loading}
                    >
                      Save
                    </button>
                  </div>
                  <ProfileBlock addClass="p-5">
                    <div className="flex flex-col gap-3">
                      <div className="flex">
                        <UploadAvatar image={avatarUrl} newImage={newAvatar} setNewImage={setNewAvatar} />
                      </div>
                      <div className="">
                        <Input
                          label="Name"
                          id="name"
                          type="text"
                          value={name}
                          placeholder="Minimum 4 characters"
                          onChange={setUsername}
                        />
                      </div>
                      <div className="">
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
                            https://slii.xyz/{username}
                          </a>
                        </Link>
                      </div>
                      <div className="">
                        <Input
                          label="Email"
                          id="email"
                          type="email"
                          placeholder="sample@slii.xyz"
                          value={email}
                          onChange={setEmail}
                        />
                      </div>
                      <div className="">
                        <Textarea
                          id="description"
                          label="Description"
                          required={false}
                          maxLength={200}
                          text={description}
                          setText={setDescription}
                        />
                      </div>
                    </div>
                  </ProfileBlock>
                  <ProfileBlock addClass="p-5">
                    <div className="flex flex-col gap-3">
                      <div className="">
                        <Input
                          label="Twitter ID"
                          id="twitter"
                          before="@"
                          type="text"
                          value={twitterId || ""}
                          onChange={setTwitterId}
                        />
                      </div>
                      <div className="">
                        <Input
                          label="Instagram ID"
                          id="instagram"
                          before="@"
                          type="text"
                          value={instagramId || ""}
                          onChange={setInstagramId}
                        />
                      </div>
                      <AccountLinks fields={links} setFields={setLinks} />
                    </div>
                  </ProfileBlock>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-400">Please login.</p>
              </>
            )}
          </div>
        </ArticleArea>
      </SplitLayout>
    </div>
  );
};
export default AccountPage;

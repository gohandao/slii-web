import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import router from "next/router";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { IoChevronBackOutline } from "react-icons/io5";
import * as yup from "yup";

import { Count } from "@/components/elements/Count";
import { NavButton } from "@/components/elements/NavButton";
import { ArticleArea } from "@/components/layouts/ArticleArea";
import { SplitLayout } from "@/components/layouts/SplitLayout";
// import { OptionalInputs } from "@/components/modules/OptionalInputs";
import { ProfileBlock } from "@/components/modules/ProfileBlock";
import { useRedirections } from "@/hooks/useRedirections";
import { UploadAvatar } from "@/pages/account/components/UploadAvatar";
import { authProfileAtom, authUserAtom } from "@/state/auth.state";
import type { LinksField } from "@/types/linksField";

const AccountLinks = dynamic(
  () => {
    return import("@/components/modules/AccountLinks");
  },
  { ssr: false }
);

type IFormInput = {
  avatar_url: string;
  description: string;
  email: string;
  instagram_id: string;
  label: string;
  links: LinksField[];
  name: string;
  twitter_id: string;
  username: string;
};

type UploadImageProps = {
  image: File;
  path: string;
  storage: string;
};

const schema = yup
  .object({
    avatar_url: yup.string().required(),
    name: yup.string().required().min(4),
    username: yup.string().required().min(4),
    email: yup.string().required().email(),
    description: yup.string().max(200),
    instagram_id: yup.string(),
    twitter_id: yup.string(),
    label: yup.string(),
    links: yup.array().of(
      yup.object().shape({
        id: yup.string().required(),
        label: yup.string().required(),
        value: yup.string().required(),
      })
    ),
  })
  .required();

const AccountPage: NextPage = () => {
  useRedirections();
  const initial_id = nanoid();

  const [count, setCount] = useState<number>(0);
  const countHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setCount(e.currentTarget.value.length);
  };

  const [authProfile] = useAtom(authProfileAtom);
  const [newAvatar, setNewAvatar] = useState<File>();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [links, setLinks] = useState<LinksField[]>([
    {
      id: initial_id,
      label: "",
      value: "",
    },
  ]);
  const [authUser] = useAtom(authUserAtom);

  // const options = {
  //   maxSizeMB: 1, // 最大ファイルサイズ
  //   maxWidthOrHeight: 80, // 最大画像幅もしくは高さ
  // };

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      avatar_url: authProfile?.avatar_url,
      name: authProfile?.name,
      username: authProfile?.username,
      email: authUser?.email,
      description: authProfile?.description,
      twitter_id: authProfile?.twitter_id,
      instagram_id: authProfile?.instagram_id,
      label: authProfile?.label,
      links: [
        {
          id: initial_id,
          label: "",
          value: "",
        },
      ],
    },
  });

  useEffect(() => {
    console.log(errors);
    console.log(authProfile);
  }, [authProfile, errors]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    console.log(errors);
  };

  useEffect(() => {
    if (authProfile?.description) setCount(authProfile.description.length);
    if (authProfile && authUser) {
      const { avatar_url, description, instagram_id, label, links, twitter_id, username, name } = authProfile;
      reset({
        name,
        username,
        description,
        avatar_url,
        twitter_id,
        instagram_id,
        label,
        links,
        email: authUser.email,
      });
    }
  }, [authProfile]);

  // const uploadImage = async ({ image, path, storage }: UploadImageProps) => {
  //   const STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;
  //   const uuid = uuidv4();
  //   const { data, error } = await supabase.storage.from(storage).upload(`${path}/${uuid}.jpg`, image, {
  //     cacheControl: "3600",
  //     upsert: false,
  //   });
  //   if (error) {
  //     console.log("error at uploadImage");
  //     console.log(error);
  //     return;
  //   }
  //   const image_url = STORAGE_URL && STORAGE_URL + "/" + storage + "/" + data?.path;
  //   return image_url;
  // };

  // const updateProfile = async () => {
  //   try {
  //     setLoading(true);
  //     let new_avatar_url;
  //     // let new_background_url;
  //     if (authUser && authProfile) {
  //       if (newAvatar) {
  //         new_avatar_url = await uploadImage({ image: newAvatar, path: "public", storage: "avatars" });
  //       }
  //       new_avatar_url = new_avatar_url ? new_avatar_url : authProfile.avatar_url;
  //       // if (newBackground) {
  //       //   new_background_url = await uploadImage({ image: newBackground, path: "images", storage: "public" });
  //       // }
  //       // new_background_url = new_background_url ? new_background_url : authProfile.background_url;
  //       const updates = {
  //         id: authUser.id,
  //         avatar_url: new_avatar_url,
  //         // background_url: new_background_url,
  //         description: description,
  //         instagram_id: instagramId,
  //         links: links,
  //         twitter_id: twitterId,
  //         updated_at: new Date(),
  //         username: username,
  //       };
  //       if (new_avatar_url || description != authProfile.description || label != authProfile.label) {
  //         const { error } = await supabase.from("profiles").upsert(updates);
  //         if (error) {
  //           toast.error("Failed to upload data.");
  //         } else {
  //           toast.success("Upload succeeded.");
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) alert(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
                        return router.back();
                      }}
                    >
                      <NavButton>
                        <IoChevronBackOutline />
                      </NavButton>
                    </button>
                    {/* <button
                      className="overflow-hidden whitespace-nowrap rounded-full bg-sky-500 py-2 px-7 text-center text-white"
                      onClick={() => {
                        return updateProfile();
                      }}
                      disabled={loading}
                    >
                      Save
                    </button> */}
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      type="submit"
                      value="save"
                      className="overflow-hidden whitespace-nowrap rounded-full bg-sky-500 py-2 px-7 text-center text-white"
                      disabled={loading}
                    />
                    <ProfileBlock addClass="p-5">
                      <div className="flex flex-col gap-3">
                        <div className="flex">
                          <UploadAvatar
                            image={authProfile?.avatar_url}
                            newImage={newAvatar}
                            setNewImage={setNewAvatar}
                          />
                        </div>
                        <div className="">
                          {/* <Input
                          label="Name"
                          id="name"
                          type="text"
                          value={name}
                          placeholder="Minimum 4 characters"
                          onChange={setUsername}
                        /> */}
                          <div className="flex flex-col">
                            <label htmlFor={"name"} className="text-sm font-bold text-gray-400">
                              Name
                            </label>
                            <div className="relative flex items-center rounded-lg border-2 bg-slate-50">
                              <input
                                id={"name"}
                                type={"text"}
                                {...register("name")}
                                className={`flex-1 rounded-lg bg-slate-50 py-3 px-4 `}
                                placeholder={"Minimum 4 characters"}
                              />
                            </div>
                          </div>
                          <p className="text-red-400">
                            <ErrorMessage errors={errors} name="name" />
                          </p>
                        </div>
                        <div className="">
                          {/* <Input
                          label="Username"
                          id="username"
                          type="text"
                          value={username}
                          placeholder="Minimum 4 characters"
                          onChange={setUsername}
                        /> */}
                          <div className="flex flex-col">
                            <label htmlFor={"username"} className="text-sm font-bold text-gray-400">
                              Username
                            </label>
                            <div className="relative flex items-center rounded-lg border-2 bg-slate-50">
                              <input
                                id={"username"}
                                type={"text"}
                                {...register("username")}
                                className={`flex-1 rounded-lg bg-slate-50 py-3 px-4 `}
                                placeholder={"Minimum 4 characters"}
                              />
                            </div>
                          </div>
                          <p className="text-red-500">
                            <ErrorMessage errors={errors} name="username" />
                          </p>
                          <Link href={`/${authProfile?.username}`} legacyBehavior>
                            <a className="mt-1 inline-block text-sm text-blue-500 underline hover:no-underline">
                              https://nftotaku.xyz/{authProfile?.username}
                            </a>
                          </Link>
                        </div>
                        <div className="">
                          {/* <Input
                          label="Email"
                          id="email"
                          type="email"
                          placeholder="sample@nftotaku.xyz"
                          value={email}
                          onChange={setEmail}
                        /> */}
                          <div className="flex flex-col">
                            <label htmlFor={"email"} className="text-sm font-bold text-gray-400">
                              Email
                            </label>
                            <div className="relative flex items-center rounded-lg border-2 bg-slate-50">
                              <input
                                id={"email"}
                                type={"email"}
                                {...register("email")}
                                className={`flex-1 rounded-lg bg-slate-50 py-3 px-4 `}
                                placeholder={"sample@nftotaku.xyz"}
                              />
                            </div>
                          </div>
                          <p className="text-red-500">
                            <ErrorMessage errors={errors} name="email" />
                          </p>
                        </div>
                        <div className="">
                          {/* <Textarea
                            id="description"
                            label="Description"
                            required={false}
                            maxLength={200}
                            text={description}
                            setText={setDescription}
                          /> */}
                          <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold text-gray-400">Description</p>
                            <div className={`relative`}>
                              <textarea
                                id={"description"}
                                className={`min-h-[150px] w-full rounded-lg border-2 bg-slate-50 px-5 py-3`}
                                {...register("description")}
                                onKeyUp={(e) => {
                                  countHandler(e);
                                }}
                                required={false}
                                placeholder="Maximum 200 characters"
                              />
                              <Count count={count} maxLength={200} property="textarea" />
                            </div>
                          </div>
                          <p className="text-red-400">
                            <ErrorMessage errors={errors} name="description" />
                          </p>
                        </div>
                      </div>
                    </ProfileBlock>
                    <ProfileBlock addClass="p-5">
                      <div className="flex flex-col gap-3">
                        <div className="">
                          {/* <Input
                          label="Twitter ID"
                          id="twitter"
                          before="@"
                          type="text"
                          value={twitterId || ""}
                          onChange={setTwitterId}
                        /> */}
                          <div className="flex flex-col">
                            <label htmlFor={"twitter"} className="text-sm font-bold text-gray-400">
                              Twitter ID
                            </label>
                            <div className="relative flex items-center rounded-lg border-2 bg-slate-50">
                              <div className="absolute left-3 text-gray-400">@</div>
                              <input
                                id={"twitter"}
                                type={"text"}
                                {...register("twitter_id")}
                                className={`flex-1 rounded-lg bg-slate-50 py-3 px-4 pl-10`}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="">
                          {/* <Input
                          label="Instagram ID"
                          id="instagram"
                          before="@"
                          type="text"
                          value={instagramId || ""}
                          onChange={setInstagramId}
                        /> */}
                          <div className="flex flex-col">
                            <label htmlFor={"instagram"} className="text-sm font-bold text-gray-400">
                              Instagram ID
                            </label>
                            <div className="relative flex items-center rounded-lg border-2 bg-slate-50">
                              <div className="absolute left-3 text-gray-400">@</div>
                              <input
                                id={"instagram"}
                                type={"text"}
                                {...register("instagram_id")}
                                className={`flex-1 rounded-lg bg-slate-50 py-3 px-4 pl-10`}
                              />
                            </div>
                          </div>
                        </div>
                        <AccountLinks fields={links} setFields={setLinks} />
                      </div>
                    </ProfileBlock>
                  </form>
                </div>
              </>
            ) : (
              <p className="text-gray-400">Please login.</p>
            )}
          </div>
        </ArticleArea>
      </SplitLayout>
    </div>
  );
};
export default AccountPage;

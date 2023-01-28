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
import { FormProvider, useForm } from "react-hook-form";
import { IoChevronBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import * as yup from "yup";

import { Input } from "@/components/elements/Input";
import { NavButton } from "@/components/elements/NavButton";
import { Textarea } from "@/components/elements/Textarea";
import { ArticleArea } from "@/components/layouts/ArticleArea";
import { SplitLayout } from "@/components/layouts/SplitLayout";
// import { OptionalInputs } from "@/components/modules/OptionalInputs";
import { ProfileBlock } from "@/components/modules/ProfileBlock";
import { useRedirections } from "@/hooks/useRedirections";
import { supabase } from "@/libs/supabase";
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

const schema = yup.object({
  avatar_url: yup.string().required(),
  name: yup.string().required().min(4),
  username: yup.string().required().min(4),
  email: yup.string().required().email(),
  description: yup.string().max(200),
  instagram_id: yup.string(),
  twitter_id: yup.string(),
  // links: yup.array().of(
  //   yup.object().shape({
  //     id: yup.string(),
  //     label: yup.string(),
  //     value: yup.string(),
  //   })
  // ),
});

const AccountPage: NextPage = () => {
  useRedirections();
  const initial_id = nanoid();

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

  const methods = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      avatar_url: authProfile?.avatar_url,
      name: authProfile?.name,
      username: authProfile?.username,
      email: authUser?.email,
      description: authProfile?.description,
      twitter_id: authProfile?.twitter_id,
      instagram_id: authProfile?.instagram_id,
      // label: authProfile?.label,
      // links: [
      //   {
      //     id: initial_id,
      //     label: "",
      //     value: "",
      //   },
      // ],
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      let new_avatar_url;
      // let new_background_url;
      if (authUser && authProfile) {
        const { description, instagram_id, label, links, twitter_id, username } = data;
        new_avatar_url = new_avatar_url ? new_avatar_url : authProfile.avatar_url;
        // if (newBackground) {
        //   new_background_url = await uploadImage({ image: newBackground, path: "images", storage: "public" });
        // }
        // new_background_url = new_background_url ? new_background_url : authProfile.background_url;
        const updates = {
          id: authUser.id,
          avatar_url: new_avatar_url,
          // background_url: new_background_url,
          description,
          instagram_id,
          links,
          twitter_id,
          updated_at: new Date(),
          username,
        };
        if (new_avatar_url || description != authProfile.description || label != authProfile.label) {
          const { error } = await supabase.from("profiles").upsert(updates);
          if (error) {
            alert("Failed to upload data.");
            toast.error("Failed to upload data.");
          } else {
            alert("Upload succeeded.");
            toast.success("Upload succeeded.");
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  useEffect(() => {
    if (authProfile && authUser) {
      const { avatar_url, description, instagram_id, label, links, twitter_id, username, name } = authProfile;
      methods.reset({
        name,
        username,
        description,
        avatar_url,
        twitter_id,
        instagram_id,
        // label,
        // links,
        email: authUser.email,
      });
    }
  }, [authProfile]);

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

                  <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                          <Input label="Name" id="name" type="text" placeholder="Minimum 4 characters" />
                          <Input label="Username" id="username" type="text" placeholder="Minimum 4 characters" />
                          <Link href={`/${authProfile?.username}`} legacyBehavior>
                            <a className="mt-1 inline-block text-sm text-blue-500 underline hover:no-underline">
                              https://nftotaku.xyz/{authProfile?.username}
                            </a>
                          </Link>
                          <Input label="Email" id="email" type="email" placeholder="sample@nftotaku.xyz" />
                          <Textarea
                            id="description"
                            label="Description"
                            maxLength={200}
                            initDescriptionLength={authProfile?.description.length}
                          />
                        </div>
                      </ProfileBlock>
                      <ProfileBlock addClass="p-5">
                        <div className="flex flex-col gap-3">
                          <Input label="Twitter ID" id="twitter" before="@" type="text" />
                          <Input label="Instagram ID" id="instagram" before="@" type="text" />
                          {/* <AccountLinks fields={links} setFields={setLinks} /> */}
                        </div>
                      </ProfileBlock>
                    </form>
                  </FormProvider>
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

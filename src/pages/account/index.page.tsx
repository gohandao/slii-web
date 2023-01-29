import { yupResolver } from "@hookform/resolvers/yup";
import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import router from "next/router";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { IoChevronBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";

import { Input } from "@/components/elements/Input";
import { NavButton } from "@/components/elements/NavButton";
import { Textarea } from "@/components/elements/Textarea";
import { ArticleArea } from "@/components/layouts/ArticleArea";
import { SplitLayout } from "@/components/layouts/SplitLayout";
import { ProfileBlock } from "@/components/modules/ProfileBlock";
import { useRedirections } from "@/hooks/useRedirections";
import { supabase } from "@/libs/supabase";
import { handleCompressImage, UploadAvatar } from "@/pages/account/components/UploadAvatar";
import { authProfileAtom, authUserAtom } from "@/state/auth.state";
import type { LinksField } from "@/types/linksField";

const AccountLinks = dynamic(
  () => {
    return import("@/components/modules/AccountLinks");
  },
  { ssr: false }
);

type IFormInput = {
  profile_image: FileList;
  avatar_url: string;
  name: string;
  username: string;
  description: string;
  links: LinksField[][];
  twitter_id: string;
  instagram_id: string;
  email: string;
  label: string;
};

type UploadImageProps = {
  image: File;
  path: string;
  storage: string;
};

const schema = yup.object({
  profile_image: yup.mixed().test("fileSize", "File too large", (value) => {
    console.log(value);
    if (value) return value[0].size <= 1000000;
    return true;
  }),
  avatar_url: yup.string().required().url(),
  name: yup.string().required().min(4),
  username: yup.string().required().min(4),
  email: yup.string().required().email(),
  description: yup.string().max(200),
  instagram_id: yup.string(),
  twitter_id: yup.string(),
  links: yup.array().of(
    yup.array().of(
      yup.object().shape({
        id: yup.string().uuid(),
        label: yup.string(),
        value: yup.string(),
      })
    )
  ),
});

const AccountPage: NextPage = () => {
  useRedirections();
  const firstInitId = nanoid();
  const secondInitId = nanoid();

  const [authProfile] = useAtom(authProfileAtom);
  const [authUser] = useAtom(authUserAtom);

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
      links: [
        [
          {
            id: firstInitId,
            label: "111",
            value: "222",
          },
          {
            id: secondInitId,
            label: "333",
            value: "444",
          },
        ],
      ],
    },
  });

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
    return `${STORAGE_URL}/${storage}/${data?.path}`;
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    alert("submit");
    console.log(data);
    try {
      if (authUser && authProfile) {
        const new_avatar_url = await (async () => {
          const avatar_file = await handleCompressImage(authProfile.avatar_url, data.profile_image[0]);
          return avatar_file
            ? await uploadImage({ image: avatar_file, path: "public", storage: "avatars" })
            : authProfile.avatar_url;
        })();
        const { description, instagram_id, label, links, twitter_id, username } = data;
        const updates = {
          id: authUser.id,
          avatar_url: new_avatar_url,
          description,
          links,
          twitter_id,
          instagram_id,
          updated_at: new Date(),
          username,
        };
        if (new_avatar_url || description !== authProfile.description || label !== authProfile.label) {
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
      const { avatar_url, description, instagram_id, links, twitter_id, username, name } = authProfile;
      methods.reset({
        name,
        username,
        description,
        avatar_url,
        twitter_id,
        instagram_id,
        links,
        email: authUser.email,
      });
    }
  }, [authProfile, authUser]);

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
                  <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                      <div className="relative z-10 my-2 flex items-center justify-between">
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
                        <input
                          type="submit"
                          value={methods.formState.isSubmitting ? "Loading..." : "Save"}
                          className="overflow-hidden whitespace-nowrap rounded-full bg-sky-500 py-2 px-7 text-center text-white"
                          disabled={methods.formState.isSubmitting}
                        />
                      </div>

                      <ProfileBlock addClass="p-5">
                        <div className="flex flex-col gap-3">
                          <div className="flex">
                            <UploadAvatar image={authProfile?.avatar_url} />
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
                          <AccountLinks />
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

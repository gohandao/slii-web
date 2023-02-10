import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { SplitLayout } from "@/components/layouts/SplitLayout";
import { ProfilePageTemplate } from "@/components/templates/ProfilePageTemplate";
import { site_name } from "@/constant/seo.const";
import { authProfileAtom } from "@/state/auth.state";

type Props = {
  description: string;
  ogImageUrl: string;
  title: string;
};
const GuestPage: NextPage<Props> = () => {
  const router = useRouter();
  const [authProfile] = useAtom(authProfileAtom);
  if (authProfile) {
    router.push(`/${authProfile.username}`);
  }
  return (
    <>
      <NextSeo
        title={`Guest page | ${site_name}`}
        description="If you are a guest user, please check your data on this page."
        openGraph={{
          description: "If you are a guest user, please check your data on this page.",
          title: `Guest page | ${site_name}`,
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/creators",
        }}
      />
      <SplitLayout>
        <ProfilePageTemplate />
      </SplitLayout>
    </>
  );
};
export default GuestPage;

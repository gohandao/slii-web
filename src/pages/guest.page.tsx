import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { SplitLayout } from "@/components/layouts/SplitLayout";
import { ProfilePageTemplate } from "@/components/templates/ProfilePageTemplate";
import { authProfileAtom } from "@/state/auth.state";

type Props = {
  description: string;
  ogImageUrl: string;
  title: string;
};
const UserPage: NextPage<Props> = ({ description, ogImageUrl, title }) => {
  const router = useRouter();
  const [authProfile] = useAtom(authProfileAtom);
  const { username } = router.query;
  if (authProfile) {
    router.push(`/${authProfile.username}`);
  }
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          description: description,
          images: [
            {
              alt: title,
              height: 630,
              type: "image/jpeg",
              url: ogImageUrl,
              width: 1200,
            },
          ],
          title: title,
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + `/${username}`,
        }}
      />
      <SplitLayout>
        <ProfilePageTemplate />
      </SplitLayout>
    </>
  );
};
export default UserPage;

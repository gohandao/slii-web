import type { NextPage } from "next";
import Link from "next/link";
import { NextSeo } from "next-seo";

import { SplitLayout } from "@/components/layouts/SplitLayout";

export const Custom404: NextPage = () => {
  return (
    <div>
      <NextSeo
        title="404 Error | NFT OTAKU"
        description="Sorry, we could not find this page."
        openGraph={{
          description: "Sorry, we could not find this page.",
          title: "404 Error | NFT OTAKU",
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/404",
        }}
      />
      <SplitLayout>
        <section className="flex h-full items-center">
          <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
            <div className="flex max-w-md flex-col gap-5 text-center">
              <h2 className="text-9xl font-bold">
                <span className="sr-only">Error</span>404
              </h2>
              <p className="text-lg">Sorry, we could not find this page.</p>
              <Link href="/" className="inline-block rounded bg-blue-800 px-8 py-3 text-white">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </SplitLayout>
    </div>
  );
};
export default Custom404;

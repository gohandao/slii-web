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
        <section className="flex h-full items-center p-16 text-gray-100">
          <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
            <div className="max-w-md text-center">
              <h2 className="mb-8 text-9xl font-extrabold text-gray-600">
                <span className="sr-only">Error</span>404
              </h2>
              <p className="text-2xl md:text-3xl">Sorry, we could not find this page.</p>
              <p className="mt-4 mb-8 text-gray-400">
                But dont worry, you can find plenty of other things on our homepage.
              </p>
              <Link href="/" className="rounded bg-blue-900 px-8 py-3 text-blue-100">
                Back to homepage
              </Link>
            </div>
          </div>
        </section>
      </SplitLayout>
    </div>
  );
};
export default Custom404;

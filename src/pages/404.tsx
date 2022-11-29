import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

// conponents
import { BaseLayout } from "@/components/BaseLayout";

export const Custom404: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <NextSeo
        title="404 Error | NFT OTAKU"
        description="Sorry, we could not find this page."
        openGraph={{
          type: "article",
          url: process.env.NEXT_PUBLIC_SITE_URL + "/404",
          title: "404 Error | NFT OTAKU",
          description: "Sorry, we could not find this page.",
        }}
      />
      <BaseLayout>
        <section className="flex h-full items-center bg-gray-900 p-16 text-gray-100">
          <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
            <div className="max-w-md text-center">
              <h2 className="mb-8 text-9xl font-extrabold text-gray-600">
                <span className="sr-only">Error</span>404
              </h2>
              <p className="text-2xl font-semibold md:text-3xl">
                Sorry, we could not find this page.
              </p>
              <p className="mt-4 mb-8 text-gray-400">
                But dont worry, you can find plenty of other things on our
                homepage.
              </p>
              <a
                rel="noopener noreferrer"
                href="#"
                className="rounded bg-violet-400 px-8 py-3 font-semibold text-gray-900"
              >
                Back to homepage
              </a>
            </div>
          </div>
        </section>
      </BaseLayout>
    </div>
  );
};

export default Custom404;

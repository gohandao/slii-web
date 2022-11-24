import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { CreatorList } from "@/components/CreatorList";
import { CollectionTable } from "@/components/CollectionTable";
import { SearchArea } from "@/components/SearchArea";

import { Mainvisual } from "@/components/Mainvisual";
import { Pagination } from "@/components/Pagination";
import { BaseLayout } from "@/components/BaseLayout";
import { Hr } from "@/components/Hr";
import { Title } from "@/components/Title";
import { LinkButton } from "@/components/LinkButton";
import { useContext, useEffect } from "react";
import { UtilitiesContext } from "@/contexts/UtilitiesContext";
import { NextSeo } from "next-seo";

export const Custom404: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;

  // const { setBreadcrumbList } = useContext(UtilitiesContext);
  // const breadcrumbList = [
  //   {
  //     name: "Home",
  //     path: "/",
  //   },
  //   {
  //     name: "404",
  //     path: "/",
  //   },
  // ];
  // useEffect(() => {
  //   setBreadcrumbList(breadcrumbList);
  // }, []);
  return (
    <div>
      {/* <Head>
        <title>404 Error | NFT OTAKU</title>
        <meta
          name="description"
          content="Sorry, we could not find this page."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
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
        <section className="flex items-center h-full p-16 bg-gray-900 text-gray-100">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
              <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
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
                className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900"
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

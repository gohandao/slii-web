import React from "react";
import Link from "next/link";
import Image from "next/image";

type ButtonProps = {
  url: string;
  title: string;
}
export const Footer = () => {
  const Button = ({url, title}: ButtonProps) => {
    return (
      <Link href={url}>
        <a className="flex justify-center items-center px-5 py-5 rounded bg-gray-900 text-white">{title}</a>
      </Link>
    );
  }
  return (
    <>
      {/*<div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl flex justify-center mb-10">
        <div className="flex gap-5">
          <Button url="https://google.com" title="Gachi DAO" />
          <Button url="https://google.com" title="Request" />
        </div>
  </div>*/}
      <footer className="py-10 bg-gray-100">
        <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
          <div className="justify-center items-center flex text-center">
            <Link href="/">
              <a className="relative flex h-8">
                <Image src="/logo.svg" width={138} height={24} alt="" />
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

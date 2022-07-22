import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const Footer = () => {
  return (
    <footer className="py-10 bg-gray-100">
      <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
        <div className="justify-center items-center flex text-center">
          <Link href="/">
            <a className="relative flex h-8">
              <Image src="/logo.svg" width={138} height={24} />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  )
}

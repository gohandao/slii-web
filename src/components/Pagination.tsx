import React from 'react'
import { useRouter } from 'next/router'

import Router from 'next/router'
import Link from 'next/link'

type Props = {
  currentPage: number
}
type ItemProps = {
  count: number
}

export const Pagination = ({ currentPage }: Props) => {
  const prevPage = currentPage - 1
  const nextPage = currentPage + 1
  const PaginationItem = ({ count }: ItemProps) => {
    let activeClass
    if (count == currentPage) {
      activeClass = 'bg-gray-900 text-white'
    }
    return (
      <Link href={`/?page=${count}`}>
        <a
          className={`w-9 h-9 border-2 border-gray-900 rounded flex items-center justify-center hover:bg-gray-900 hover:text-white ${activeClass}`}
        >
          {count}
        </a>
      </Link>
    )
  }
  return (
    <div className="flex gap-2">
      {currentPage != 1 && <PaginationItem count={1} />}
      {prevPage > 1 && <PaginationItem count={prevPage} />}
      <PaginationItem count={currentPage} />
      <PaginationItem count={nextPage} />
      <PaginationItem count={nextPage + 1} />
    </div>
  )
}

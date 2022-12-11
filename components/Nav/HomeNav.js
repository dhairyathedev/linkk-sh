import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HomeNav() {
  return (
    <nav
        aria-label="Site Nav"
        className="mx-auto flex max-w-screen-lg items-center justify-between p-4"
      >
        <Link
          href="/"
          className="rounded-lg inline-flex items-center space-x-2"
        >
          <span className="sr-only">Logo</span>
          <Image
            src="/assets/images/logo.svg"
            width={36}
            height={36}
            className="w"
            alt="logo"
          />
          <span className="font-bold text-2xl font-primary">Linkk.sh</span>
        </Link>
        <ul className="flex items-center gap-2 text-sm font-medium text-gray-500">
          <li>
            <Link
              href="/app"
              className="font-secondary rounded-full border border-black bg-black py-1.5 px-5 text-sm text-white transition-all hover:bg-white hover:text-black"
            >
              SignIn
            </Link>
          </li>
        </ul>
      </nav>
  )
}

import Image from 'next/image'
import React from 'react'

export default function DashNav() {
  return (
    <div className="flex flex-row space-x-2 items-center justify-center lg:justify-start mb-20">
          <Image
            src="/assets/images/logo.svg"
            width={36}
            height={36}
            className="w"
            alt="logo"
          />
          <span className="font-bold text-2xl font-primary lg:block hidden">Linkk.sh</span>
        </div>
  )
}

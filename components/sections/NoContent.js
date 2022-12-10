import React from 'react'
import BlurImage from '../blurImage'

export default function NoContent() {
  return (
    <>
        <div className="mt-12 max-w-screen-lg mx-auto flex flex-col items-center space-y-8">
        <h1 className="font-semibold font-secondary">It looks like you don&apos;t have any links created!</h1>
        <BlurImage src="/assets/images/no-content.svg" alt="" width={300} height={300}/>
     </div>
    </>
  )
}

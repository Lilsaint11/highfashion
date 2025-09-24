import { Link } from '@inertiajs/react'
import React from 'react'

export default function Orders() {
  return (
    <div className="bg-[#f4f4f4] w-screen h-screen flex items-center justify-center px-5">
    <div className="bg-white rounded-xl flex flex-col items-center justify-center w-full max-w-md p-8">
      <Link href="/">
        <img src="/images/logo-black.webp" alt="Logo" className="cursor-pointer mb-6" />
      </Link>

        <>
          <h1 className="text-2xl font-bold">Sign in</h1>
          <p className="text-sm text-[#aaa] mb-6">
            Enter your email and we’ll send you a verification code
          </p>

        
        
        </>

      <p className="text-sm mt-5 text-gray-500">Privacy policy</p>
    </div>
  </div>
  )
}

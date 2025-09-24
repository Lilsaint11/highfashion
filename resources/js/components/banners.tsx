import React from 'react'

export default function Banners() {
  return (
    <div className='border-b border-slate-300 pb-15'>
        <div className='w-full relative mt-10 '>
            <img src="/images/banner1.webp" alt="" className='w-full h-screen object-cover' />
            <div className='absolute top-0  left-0 text-white  w-full h-full bg-[rgba(0,0,0,0.2)]'>
                <div className='absolute  bottom-10 left-10 flex flex-col gap-5'>
                    <p className='text-xs'>FROM OUR NEW COLLECTION</p>
                    <p className='border-b border-slate-500 w-28 '>EXPLORE NOW</p>
                </div>
            </div> 
        </div>
        <div className='w-full relative'>
            <img src="/images/banner2.webp" alt="" className='w-full h-screen object-cover' />
            <div className='absolute top-0  left-0 text-white  w-full h-full bg-[rgba(0,0,0,0.2)]'>
                <div className='absolute  bottom-10 left-10 flex flex-col gap-5'>
                    <p className='text-xs'>NEW RELEASES</p>
                    <p className='border-b border-white w-28'>EXPLORE NOW</p>
                </div>
            </div> 
        </div>
    </div>
  )
}

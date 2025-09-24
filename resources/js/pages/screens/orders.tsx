import OrderSlide from '@/components/orderMenu'
import { Link } from '@inertiajs/react'
import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'

export default function Orders() {
    const [orderMenuOpen, setOrderMenuOpen] = useState(false)
  return (
    <div className="bg-[#f4f4f4] w-screen h-screen flex  flex-col gap-10 items-center ">
        <div className='flex p-5 bg-white w-full items-center border-b'>
            {orderMenuOpen ? 
                <X  onClick={()=>setOrderMenuOpen(false)} className='cursor-pointer'/> :
                <Menu onClick={()=>setOrderMenuOpen(true)} className='cursor-pointer' />
            }
            <div className='w-full flex items-center justify-center'> 
                <Link href="/">
                    <img src="/images/logo-black.webp" alt="Logo" className="cursor-pointer w-24" />
                </Link>
            </div>
        </div>
        <div className='w-full space-y-3 px-5'>
            <h1 className="text-2xl font-bold">Orders</h1>
            <div className="bg-white rounded-xl flex flex-col items-center justify-center w-full max-w-md p-10 gap-5">
                <p className='font-bold'>No orders yet</p>
                <p className="text-sm text-[#aaa] mb-6">
                Go to store to place an order.
                </p>
            </div>
        </div>
        <div className='flex flex-col h-full w-full justify-end bg p-5 '>
            <div className='flex text-sm gap-5 border-t pt-5'>
                <p className='underline'>Nigeria</p>
                <p className='underline'>Privacy policy</p>
            </div>
        </div>
        <OrderSlide isOrderMenuOpen={orderMenuOpen} setIsOrderMenuOpen={setOrderMenuOpen} />
    </div>
  )
}

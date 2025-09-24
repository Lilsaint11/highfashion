import EditAddress from '@/components/editAddress'
import EditProfile from '@/components/editProfile'
import OrderSlide from '@/components/orderMenu'
import { Link } from '@inertiajs/react'
import { Edit, Info, Menu, Pencil, Plus, X } from 'lucide-react'
import React, { useState } from 'react'

export default function Profile() {
    const [orderMenuOpen, setOrderMenuOpen] = useState(false)
    const [isEditProfileOpen,setIsEditProfileOpen] = useState(false)
    const [isEditAddressOpen,setIsEditAddressOpen] = useState(false)
  return (
    <div className="bg-[#f4f4f4] w-screen h-screen flex  flex-col gap-5 items-center ">
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
            <h1 className="text-2xl font-bold">Profile</h1>
            <div className="bg-white rounded-xl flex flex-col w-full max-w-md p-5 gap-5">
               <div className='flex gap-4 items-center'>
                   <p className='text-[#707070] text-sm'>Name</p>
                   <Pencil className='w-[15px] cursor-pointer' onClick={()=>setIsEditProfileOpen(true)} />
               </div>
               <div>
                   <p className='text-[#707070] text-sm'>Email</p>
                   <p className=' text-sm'>test.gmail.com</p>
               </div>
            </div>
            <div className="bg-white rounded-xl flex flex-col w-full max-w-md p-5 gap-5 mt-5">
            <div className='flex gap-4 items-center w-full justify-between'>
                <p className='text-[#707070] text-sm'>Addresses</p>
                <div className='flex items-center gap-1 cursor-pointer' onClick={()=>setIsEditAddressOpen(true)}>
                    <Plus className='w-[15px]' />
                    <p className='text-sm'>Add</p>
                </div>
            </div>
            <div className='flex gap-4 bg-[#f4f4f4] items-center p-3 rounded-lg text-[#707070]'>
                <Info className='w-[16px]' />
                <p className='text-sm'>No addresses added</p>
            </div>
        </div>
        </div>

        <div className='flex flex-col h-full w-full justify-end bg p-5 '>
            <div className='flex text-sm gap-5 border-t pt-5'>
                <p className='underline'>Nigeria</p>
                <p className='underline'>Privacy policy</p>
            </div>
        </div>
        <OrderSlide isOrderMenuOpen={orderMenuOpen} setIsOrderMenuOpen={setOrderMenuOpen} />
        <EditProfile isEditProfileOpen={isEditProfileOpen} setIsEditProfileOpen={setIsEditProfileOpen} />
        <EditAddress isEditAddressOpen={isEditAddressOpen} setIsEditAddressOpen={setIsEditAddressOpen} />
    </div>
  )
}

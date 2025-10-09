import AddAddress from '@/components/addAddress'
import EditAddress from '@/components/editAddress'
import EditProfile from '@/components/editProfile'
import OrderSlide from '@/components/orderMenu'
import { Link, useForm } from '@inertiajs/react'
import {  Info, Menu, Pencil, Plus, X } from 'lucide-react'
import  { useEffect, useState } from 'react'
import { usePage } from "@inertiajs/react";


interface ProfileProps {
    user: User;
    addresses: Address[];
  }
interface Address {
    id: number;
    country: string;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    apartment: string | null;
    zip_code: string;
    state: string;
    phone: string | null;
    is_default: boolean;
}
interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export default function Profile({ user,addresses }:ProfileProps) {
    const [orderMenuOpen, setOrderMenuOpen] = useState(false)
    const [isEditProfileOpen,setIsEditProfileOpen] = useState(false)
    const [isEditAddressOpen,setIsEditAddressOpen] = useState(false)
    const [isAddAddressOpen,setIsAddAddressOpen] = useState(false)
    const [isNameExist,setIsNameExist] = useState(false)
    const [isAddressExist,setIsAddressExist] = useState(false)
    const { auth } = usePage().props;
 useEffect(()=>{
     console.log(user)
     console.log(addresses)
 })
 return (
    <div className="bg-[#f4f4f4] w-full h-full flex  flex-col gap-5 items-center ">
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
        <div className='w-full space-y-3 px-5 '>
            <h1 className="text-2xl font-bold">Profile</h1>
            <div className="bg-white rounded-xl flex flex-col w-full p-5 gap-5">
               <div className='flex gap-4 items-center'>
                   {!user?.first_name ? 
                    <p className='text-[#707070] text-sm'>Name</p> :
                    <p className='text-sm font-bold capitalize'>{user.first_name} {user.last_name}</p>
                   }
                   <Pencil className='w-[15px] cursor-pointer' onClick={()=>setIsEditProfileOpen(true)} />
               </div>
               <div>
                   <p className='text-[#707070] text-sm'>Email</p>
                   {auth.user && <p className=' text-sm'>{auth.user.email}</p>}
               </div>
            </div>
            <div className="bg-white rounded-xl flex flex-col w-full  py-5 px-2 gap-5 mt-5">
            <div className='flex gap-4 items-center w-full justify-between px-4'>
                <p className={`${!isAddressExist ? 'text-[#707070]' : 'text-black font-bold'} text-sm`}>Addresses</p>
                <div className='flex items-center gap-1 cursor-pointer' onClick={()=>setIsAddAddressOpen(true)}>
                    <Plus className='w-[15px]' />
                    <p className='text-sm'>Add</p>
                </div>
            </div>
            {addresses.length == 0 ? 
                <div className='flex gap-4 bg-[#f4f4f4] items-center p-3 rounded-lg text-[#707070] '>
                    <Info className='w-[16px]' />
                    <p className='text-sm'>No addresses added</p>
                </div> : 
                <div>
                {addresses.map((address) => (
                    <div className='text-sm hover:bg-[#f4f4f4] cursor-pointer px-4 py-2 rounded-xl' onClick={()=>setIsEditAddressOpen(true)}>
                    <div className='w-full flex items-center justify-between mb-2'>
                        {address.is_default && <p className='text-sm text-[#707070]'>Default address</p>}
                        <Pencil className='w-[15px] cursor-pointer'/>
                    </div>
                    <p>{address.first_name} {address.last_name}</p>
                    <p>{address.address}</p>
                    <p>{address.zip_code} {address.city} {address.state}</p>
                    <p>{address.country}</p>
                    <p>{address.phone}</p>
                </div>
                ))}
            </div>
            }
        </div>
        </div>

        <div className='flex flex-col h-full w-full justify-end bg p-5 '>
            <div className='flex text-sm gap-5 border-t pt-5'>
                <p className='underline'>Nigeria</p>
                <p className='underline'>Privacy policy</p>
            </div>
        </div>
        <OrderSlide isOrderMenuOpen={orderMenuOpen} setIsOrderMenuOpen={setOrderMenuOpen} />
        <EditProfile isEditProfileOpen={isEditProfileOpen} setIsEditProfileOpen={setIsEditProfileOpen} user={user}  />
        <EditAddress isEditAddressOpen={isEditAddressOpen} setIsEditAddressOpen={setIsEditAddressOpen} />
        <AddAddress isAddAddressOpen={isAddAddressOpen} setIsAddAddressOpen={setIsAddAddressOpen} />
    </div>
  )
}

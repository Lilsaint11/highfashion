import { Link } from '@inertiajs/react'
import { CircleUserRound, } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface OrderMenuProps {
    isOrderMenuOpen: boolean;
    setIsOrderMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: User;
}

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export default function OrderSlide({isOrderMenuOpen,setIsOrderMenuOpen,user}:OrderMenuProps) {
    const { post } = useForm();
    const [checked, setChecked] = useState(false);
    const [valuee, setValue] = React.useState<number[]>([2400000]);

    const handleSignout = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        post('/signout'), {
            onSuccess: () => {
                console.log('Successfully signed out');
            },
        };
    };
  return (
    <div className='fixed top-10 z-50 w-full px-5'>
        <div className={`transition z-30 duration-200 w-full h-screen absolute top-5 left-0 bg-[rgba(0,0,0,0.8)]  ${isOrderMenuOpen ? 'translate-x-0' : '-translate-x-full'} `} onClick={()=>setIsOrderMenuOpen(false)}>
        </div>
        <div className={`bg-white w-[90%] z-50 h-screen absolute top-5 -left-8 pl-8  transition duration-300 ${isOrderMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className=''>
                <div className='border-b flex gap-5 p-5 items-center '>
                    <CircleUserRound className='text-[#aaa]' />
                   <p className='text-sm text-[#aaa]'>{user?.email}</p>
                </div>
            </div>
            <div className='flex flex-col gap-24 h-full'>
                <div className='flex flex-col gap-5 px-5 py-8' >
                <Link href='/collections/new-in'> <p className='text-md'>Shop</p></Link>
                <Link href='/orders'> <p className='text-md underline'>Orders</p></Link>
                </div>
                <div className=' px-5 py-8 border-t flex flex-col gap-10'>
                    <Link href='/profile'><p>Profile</p></Link>
                    <Link href='/settings'> <p>Settings</p></Link>
                   <div>
                   <button onClick={handleSignout} className='cursor-pointer'>
            Sign Out
        </button>
                   </div>
                  
                </div>
           </div>
      </div>
    </div>
  )
}

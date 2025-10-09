import { Textarea } from '@headlessui/react'
import { useForm } from '@inertiajs/react';
import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'


interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

interface EditProfileProps {
    isEditProfileOpen: boolean;
    setIsEditProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: User;
  }

export default function EditProfile({isEditProfileOpen,setIsEditProfileOpen,user }:EditProfileProps) {
    const { data, setData, put, errors, processing } = useForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(('/profile'), {
            onSuccess: () => {
                console.log('Profile updated successfully!');
                setIsEditProfileOpen(false);
            },
            onError: (errors) => {
                console.log('Update errors:', errors);
            },
        });
    };
  return (
      
    <>
        <div className={`transition duration-200  w-screen h-screen absolute -top-10  bg-[rgba(0,0,0,0.3)]  ${isEditProfileOpen ? 'translate-y-0 -left-0' : 'translate-y-full -left-196'} `} onClick={()=>setIsEditProfileOpen(false)}>
            </div>
            <div className={`bg-white w-full  h-88 p-5 space-y-4 absolute bottom-0 z-50 transition duration-200 ${isEditProfileOpen ? 'translate-y-0 -left-0' : 'translate-y-full -left-196'}`}>
            <p className='text-lg font-bold'>Edit profile</p>
            <form action="" onSubmit={handleSubmit} className='space-y-4 pr-5'>
                <Input
                 placeholder='First name'
                 className='w-full h-12 text-sm'
                 id="first_name"
                 value={data.first_name}
                 onChange={(e) => setData('first_name', e.target.value)}
                />
                <Input
                 placeholder='Last name' 
                 className='w-full h-12 text-sm'
                 id="last_name"
                 value={data.last_name}
                 onChange={(e) => setData('last_name', e.target.value)}
                />
                <div className='w-full  py-2 px-4 bg-[#f5f5f5] text-xs rounded-md text-[#707070]'>
                    <p>Email</p>
                    <p>test@gmail.com</p>
                </div>
                <p className='text-xs pl-2 text-[#707070]'>Email can't be edited</p>
                <div className='flex justify-end w-full'>
                    <div className='flex gap-5'>
                        <Button className='bg-white text-black h-12 w-20 border font-bold'>Cancel</Button>
                        <Button className='bg-[#f5f5f5] text-[#707070] h-12 w-20 border font-bold' type="submit" >Save</Button>
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}

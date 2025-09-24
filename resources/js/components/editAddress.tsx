import { Textarea } from '@headlessui/react'
import React from 'react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectValue,SelectTrigger } from './ui/select'

interface EditAddressProps {
    isEditAddressOpen: boolean;
    setIsEditAddressOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function EditAddress({isEditAddressOpen,setIsEditAddressOpen }:EditAddressProps) {
  return (
    <div className=''>
        <div className={`transition duration-200  w-full h-screen absolute -top-10  bg-[rgba(0,0,0,0.3)]  ${isEditAddressOpen ? 'translate-y-0 -left-0' : 'translate-y-full -left-196'} `} onClick={()=>setIsEditAddressOpen(false)}>
            </div>
            <div className={`bg-white w-full  h-[500px] p-5 space-y-4 absolute bottom-0 z-50 transition duration-200 ${isEditAddressOpen ? 'translate-y-[10%] -left-0 overflow-y-scroll ' : 'translate-y-full -left-196'}`}>
            <p className='text-lg font-bold'>Edit Address</p>
            <form action="" className='space-y-4 pr-5'>
                <div className='flex items-center gap-3'>
                    <Checkbox />
                    <p>This is my default address</p>
                </div>
                <Input placeholder='First name (optional)' className='h-12 text-sm' />
                        <Input placeholder='Last name' className='h-12 text-sm' />
                        <Input placeholder='Address' className='h-12 text-sm' />
                        <Input placeholder='Apartment,suite,etc. (optional)' className='h-12 text-sm' />
                        <Input placeholder='City' className='h-12 text-sm' />
                        <Select>
                            <SelectTrigger className="w-full border focus:ring-0 outline-none font-noto-sans-jp text-sm bg-white text-black px-4 py-2 rounded-md h-12">
                                <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent className="font-noto-sans-jp text-sm bg-[#f5f5f5]">
                                <SelectItem value="light">Oyo</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input placeholder='Postal code (optional)' className='h-12 text-sm' />
                        <Input placeholder='Phone' className='h-12 text-sm' />
                <div className='flex justify-end w-full'>
                    <div className='flex gap-5'>
                        <Button className='bg-white text-black h-12 w-20 border font-bold'>Cancel</Button>
                        <Button className='bg-[#f5f5f5] text-[#707070] h-12 w-20 border font-bold'>Save</Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

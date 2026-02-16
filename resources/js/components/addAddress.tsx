import { useForm } from '@inertiajs/react';
import React, { FormEvent, useState,ChangeEvent, useEffect } from 'react';
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectValue,SelectTrigger } from './ui/select'

interface AddAddressProps {
    user: User;
    isAddAddressOpen: boolean;
    setIsAddAddressOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

interface User {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string;
}



export default function AddAddress({isAddAddressOpen,setIsAddAddressOpen,user }:AddAddressProps) {
    const { data, setData, post, errors, processing, reset } = useForm<{
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
    }>({
        country: '',
        first_name: user?.first_name ?? '',
        last_name: user?.last_name ?? '',
        address: '',
        city: '',
        apartment: '',
        zip_code: '',
        state: '',
        phone: '',
        is_default: false,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(('/profile'), {
            onSuccess: () => {
                console.log('Address added successfully!');
                setIsAddAddressOpen(false);
                reset();
            },
            onError: (errors) => {
                console.log('Add address errors:', errors);
            },
        });
    };

    const nigerianStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River',
        'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
        'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
        'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ];

  return (
    <div className=''>
        <div className={`transition duration-200  w-full h-screen absolute -top-10  bg-[rgba(0,0,0,0.3)]  ${isAddAddressOpen ? 'translate-y-0 -left-0' : 'translate-y-full -left-196'} `} onClick={()=>setIsAddAddressOpen(false)}>
            </div>
            <div className={`bg-white w-full  h-[500px] p-5 space-y-4 absolute bottom-0 z-50 transition duration-200 ${isAddAddressOpen ? 'translate-y-[10%] -left-0 overflow-y-scroll ' : 'translate-y-full -left-196'}`}>
            <p className='text-lg font-bold'>Add Address</p>
            <form action="" onSubmit={handleSubmit} className='space-y-4 pr-5'>
                <div className='flex items-center gap-3'>
                <Checkbox
                     id="is_default"
                     checked={data.is_default}
                     onCheckedChange={(checked: boolean) => setData('is_default', checked)}
                    />
                    <p>This is my default address</p>
                </div>
                <Select
                 value={data.country}
                 onValueChange={(value) => setData('country', value)}
                >
                    <SelectTrigger className="w-full border focus:ring-0 outline-none font-noto-sans-jp text-sm bg-white text-black px-4 py-2 rounded-md h-12">
                        <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent className="font-noto-sans-jp text-sm bg-[#f5f5f5]">
                        {nigerianStates.map((state) => (
                            <SelectItem key={state} value={state}>
                                {state}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Input 
                 placeholder='First name (optional)'
                 className='h-12 text-sm' 
                 id="first_name"
                 value={data.first_name}
                 onChange={(e) => setData('first_name', e.target.value)}
                />
                <Input 
                    placeholder='Last name'
                    className='h-12 text-sm'
                    id="last_name"
                    value={data.last_name}
                    onChange={(e) => setData('last_name', e.target.value)}
                />
                <Input
                 placeholder='Address' 
                 className='h-12 text-sm'
                 id="address"
                 value={data.address}
                 onChange={(e) => setData('address', e.target.value)} 
                />
                <Input
                 placeholder='Apartment,suite,etc. (optional)' 
                 className='h-12 text-sm'
                 id="apartment"
                 value={data.apartment}
                 onChange={(e) => setData('apartment', e.target.value)}  
                />
                <Input
                 placeholder='City' 
                 className='h-12 text-sm'
                 id="city"
                 value={data.city}
                 onChange={(e) => setData('city', e.target.value)}  
                />
                <Select
                 value={data.state}
                 onValueChange={(value) => setData('state', value)}
                >
                    <SelectTrigger className="w-full border focus:ring-0 outline-none font-noto-sans-jp text-sm bg-white text-black px-4 py-2 rounded-md h-12">
                        <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent className="font-noto-sans-jp text-sm bg-[#f5f5f5]">
                        {nigerianStates.map((state) => (
                            <SelectItem key={state} value={state}>
                                {state}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Input
                 placeholder='Postal code (optional)' 
                 className='h-12 text-sm'
                 id="zip_code"
                 value={data.zip_code}
                 onChange={(e) => setData('zip_code', e.target.value)} 
                />
                <Input
                 placeholder='Phone' 
                 className='h-12 text-sm'
                 id="phone"
                 value={data.phone}
                 onChange={(e) => setData('phone', e.target.value)} 
                />
                <div className='flex justify-end w-full'>
                    <div className='flex gap-5'>
                        <Button className='bg-white text-black h-12 w-20 border font-bold'>Cancel</Button>
                        <Button type='submit' disabled={processing} className='bg-[#f5f5f5] text-[#707070] h-12 w-20 border font-bold'>Save</Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

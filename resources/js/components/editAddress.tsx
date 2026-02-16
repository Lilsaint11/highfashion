import { Textarea } from '@headlessui/react'
import React, { FormEvent, useEffect, useState } from 'react';
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectValue,SelectTrigger } from './ui/select'
import { useForm } from '@inertiajs/react';

interface EditAddressProps {
    isEditAddressOpen: boolean;
    setIsEditAddressOpen: React.Dispatch<React.SetStateAction<boolean>>;
    address: Address;
    editingAddressId: number;
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
    user: number;
}

// interface User {
//     id: number;
//     first_name: string | null;
//     last_name: string | null;
//     email: string;
// }





export default function EditAddress({address,isEditAddressOpen,setIsEditAddressOpen,editingAddressId,addresses }:EditAddressProps) {

    const { data, setData,  delete: destroy, put, errors, processing, reset } = useForm<{
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
        country: address?.country,
        first_name: address?.first_name,
        last_name: address?.last_name,
        address: address?.address,
        city: address?.city,
        apartment: address?.apartment,
        zip_code: address?.zip_code,
        state: address?.state,
        phone: address?.phone,
        is_default: address?.is_default,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // ONE SINGLE REQUEST — Laravel handles everything safely!
        put(`/profile/${address.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Address updated successfully');
                setIsEditAddressOpen(false);
                reset();
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
        });
    };

    const handleDelete = (addressId: number, isDefault: boolean) => {
        if ( isDefault) {
            alert('You cannot delete your default address. Please set another address as default first.');
            return;
        }
    
        if (confirm('Are you sure you want to delete this address? This action cannot be undone.')) {
            destroy(`/profile/${addressId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    console.log('Address deleted successfully');
                    setIsEditAddressOpen(false);
                    return;
                },
                onError: (errors) => {
                    if (errors.delete) {
                        alert(errors.delete);
                    } else {
                        alert('Failed to delete address.');
                    }
                    console.error(errors);
                },
            });
            return;
        }
    };
    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    
    //     // Fresh addresses from props (or fallback to usePage)
    
    //     // Find the current default (old one) - exclude the one we're editing
    //     const oldDefault: Address | undefined = addresses.find(
    //         (addr) => addr.is_default === true && addr.id !== address.id
    //     );
    //     if (data.is_default) {
    //         // STEP 1: Set OLD default to false (if exists) using PUT
    //         if (oldDefault) {
    //             put('/profile', oldDefault.id), // Your update route
    //                 { is_default: false }, // Partial data: only flip this field
    //                 {
    //                     onFinish: () => {
    //                         // STEP 2: After old is done, update the NEW one with full form data using PUT
    //                         put('/profile', address.id),
    //                             data, // Full form data (including is_default: true)
    //                             {
    //                                 onSuccess: () => {
    //                                     console.log('Both addresses updated: Old default -> false, New -> true');
    //                                     setIsEditAddressOpen(false);
    //                                     reset();
    //                                 },
    //                                 onError: (errors) => {
    //                                     console.log('Error updating new address:', errors);
    //                                 },
    //                             }
    //                     },
    //                     onError: (errors) => {
    //                         console.log('Error updating old default:', errors);
    //                     },
    //                 }
                
    //         } else {
    //             // No old default - just update the new one directly using PUT
    //             put('/profile', address.id),
    //                 data,
    //                 {
    //                     onSuccess: () => {
    //                         console.log('New address set as default (no old one to flip)');
    //                         setIsEditAddressOpen(false);
    //                         reset();
    //                     },
    //                     onError: (errors) => {
    //                         console.log('Update errors:', errors);
    //                     },
    //                 }
    //         }
    //     } else {
    //         // Not setting as default - normal update using PUT
    //         put('/profile', address.id),
    //             data,
    //             {
    //                 onSuccess: () => {
    //                     console.log('Address updated successfully (not default)');
    //                     setIsEditAddressOpen(false);
    //                     reset();
    //                 },
    //                 onError: (errors) => {
    //                     console.log('Update address errors:', errors);
    //                 },
    //             }
    //     }
    // };

    

    // const handleCancel = () => {
    //     setIsAddAddressOpen(false);
    //     setIsEditAddressOpen(false);
    //     setEditingAddressId(null);
    //     reset();
    // };

    useEffect(()=>{
        console.log(editingAddressId)
    })

    const handleEdit = (address: Address) => {
        setData({
            country: address.country,
            first_name: address.first_name,
            last_name: address.last_name,
            address: address.address,
            city: address.city,
            apartment: address.apartment ?? '',
            zip_code: address.zip_code,
            state: address.state,
            phone: address.phone ?? '',
            is_default: address.is_default,
        });
        setEditingAddressId(address.id);
        setIsEditAddressOpen(true);
    };
    const nigerianStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River',
        'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
        'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
        'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ];
    return (
    <div className=''>
        <div className={`transition duration-200  w-full h-screen absolute -top-10  bg-[rgba(0,0,0,0.3)]  ${isEditAddressOpen ? 'translate-y-0 -left-0' : 'translate-y-full -left-196'} `} onClick={()=>setIsEditAddressOpen(false)}>
            </div>
            <div className={`bg-white w-full  h-[500px] p-5 space-y-4 absolute bottom-0 z-50 transition duration-200 ${isEditAddressOpen ? 'translate-y-[10%] -left-0 overflow-y-scroll ' : 'translate-y-full -left-196'}`}>
            <p className='text-lg font-bold'>Edit Address</p>
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
                <div className='flex justify-between w-full'>
                    <button
                        onClick={() => handleDelete(address.id, data.is_default)}
                        className="btn btn-ghost btn-sm text-red-600 hover:bg-red-50"
                        disabled={address.is_default} // visually disable if default
                        title={address.is_default ? "Cannot delete default address" : "Delete address"}
                    >
                    Delete
                    </button>
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

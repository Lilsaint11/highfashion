import { Trash, Minus, Plus } from 'lucide-react'
import React from 'react'

interface CardProps {
    name: string;
    price: number;
    color: string;
    size:string;
    quantity:number;
    image:string;
  }

export default function ClothCard({name,price,color,size,quantity,image}:CardProps) {
  return (
    <div className='flex gap-5'>
        <img src={image} alt="" className='w-24 h-28 object-contain' />
        <div className='space-y-2 uppercase'>
            <h1 className='text-md font-bold'>{name}</h1>
            <p className='text-xs'>${price} USD</p>
            <p className='text-xs'>{color}, {size}</p>
            <div className='flex items-center gap-5'>
                <div className='border flex items-center gap-3 p-1'>
                    <Minus className=' w-[16px]'  />
                    <p className='text-md '>{quantity}</p>
                    <Plus className=' w-[16px]' />
                </div>
                <Trash className='text-red-500 w-[16px]' />
            </div>
        </div>
    </div>
  )
}

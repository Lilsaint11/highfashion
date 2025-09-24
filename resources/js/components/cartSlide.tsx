import { Link } from '@inertiajs/react'
import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import ClothCard from './clothCard'
import OrderNote from './orderNote'
import { Button } from './ui/button'

interface SearchMenuProps {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartSlide({isCartOpen,setIsCartOpen}:SearchMenuProps) {
    const items = [
        {
            name: 'Fleece Hoodie Pants - Orange',
            price:213.18,
            color: 'orange',
            size:  'xxxl',
            quantity: 1,
            image: '/images/hf21.webp'
        },
        {
            name: 'HF X 101 AVENUE HOODIE PANTS',
            price:213.18,
            color: 'orange',
            size:  'xxxl',
            quantity: 1,
            image: '/images/hf31.webp'
        }
    ]

    const [isNoteOpen, setIsNoteOpen] = useState(false)
  return (
    <div className='fixed top-10 z-50'>
        <style>{`
        .btnn-container {
          position: relative;
          overflow: hidden;
        }
        .btnn-container::before {
            content: '';
            position: absolute;
            top: -10px; 
            left: -1%;
            width: 120%;
            height: 180%;
            background: black;
            transition: top 0.3s ease-in-out;
            z-index: -1;
            

          }
          .btnn-container:hover::before {
            top: -205%;
          }
        `}
        </style>
        <div className={`transition z-30 duration-200 w-screen h-screen absolute -top-10 left-0 bg-[rgba(0,0,0,0.8)]  ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} `} onClick={()=>setIsCartOpen(false)}>
        </div>
        <div className={`bg-white w-screen z-50 h-screen absolute -top-10 left-0 translate-x-5 transition duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className='overflow-y-auto scrollbar-hidden scroll-smooth h-[296px]'>
                <div className='border-b flex gap-10 pl-8 pr-12 py-5 items-center justify-between'>
                    <p>CART</p>
                    <X className='' onClick={()=>setIsCartOpen(false)}/>
                </div>
                <div className='space-y-7 mt-8'>
                    {items.map((item) => (
                        <div>
                            <ClothCard name={item.name} price={item.price} color={item.color} size={item.size} quantity={item.quantity} image={item.image}   />
                        </div>
                    ))}
                </div>
                <div className='mt-15 bg-[#eee] p-5 pb-10 space-y-5 overflow-x-auto scrollbar-hidden scroll-smooth'> 
                    <p className='uppercase text-sm'>You may also like</p>
                    <div className='flex w-max overflow-x-scroll'>
                        {items.map((item)=>(
                            <div className='flex gap-5'>
                                <img src={item.image} alt="" className='w-20 h-20 object-contain' />
                                <div className='space-y-2 uppercase'>
                                    <h1 className='text-sm font-bold'>{item.name}</h1>
                                    <p className='text-xs'>${item.price} USD</p>
                                    <p className='underline text-xs'>QUICK VIEW</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='bg-white absolute bottom-0 w-full pb-16 z-40'>
                <div className='flex w-full justify-between py-3 pl-6 pr-12 border-y text-sm items-center' onClick={()=>setIsNoteOpen(true)}>
                    <p>Add order note</p>
                    <Plus className='w-[20px]' />
                </div>
                <div className='pl-7 pr-12 flex flex-col items-center gap-5 mt-5'>
                    <p className='text-sm'>Taxes and shipping calculated at checkout</p>
                    <div className='w-full btnn-container' >
                        <Link href='/checkout'><Button className='w-full h-12 text-sm hover:bg-transparent bg-transparent hover:text-black  border rounded-none'>CHECKOUT . $532.96 USD</Button></Link>
                    </div>
                    <Link href='/cart'> <p className="underline text-xs">VIEW CART</p></Link>
                </div>
            </div>
            <OrderNote isNoteOpen={isNoteOpen} setIsNoteOpen={setIsNoteOpen} />
      </div>
    </div>
  )
}

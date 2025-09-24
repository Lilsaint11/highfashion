import { Disclosure, Transition } from '@headlessui/react'
import { Link } from '@inertiajs/react'
import { Minus, Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import ClothCard from './clothCard'
import OrderNote from './orderNote'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Slider } from './ui/slider'


interface FilterMenuProps {
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterSlide({isFilterOpen,setIsFilterOpen}:FilterMenuProps) {
    const [checked, setChecked] = useState(false);
    const [valuee, setValue] = React.useState<number[]>([2400000]);
   
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
        <div className={`transition z-30 duration-200 w-screen h-screen absolute -top-10 left-0 bg-[rgba(0,0,0,0.8)]  ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} `} onClick={()=>setIsFilterOpen(false)}>
        </div>
        <div className={`bg-white w-screen z-50 h-screen absolute -top-10 -left-8 pl-8 transition duration-300 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className=''>
                <div className='border-b flex gap-10 p-5 items-center justify-between'>
                    <div className=''>
                        <h3 className='text-md'>FILTER AND SORT</h3>
                        <p className='text-xs'>31 PRODUCTS</p>
                    </div>
                    <X className='' onClick={()=>setIsFilterOpen(false)}/>
                </div>
            </div>
           <div className='px-5'>
                <Disclosure as="div" className="accordion-item py-5">
                {({ open }) => (
                    <>
                    <Disclosure.Button
                        className="w-full text-left focus:outline-none focus:ring-0 transition-colors flex gap-5 items-center rounded-md"
                    >
                    
                        {!open ?
                        <Plus className='w-[18px]' /> :
                        <Minus className='w-[18px]' />
                        }

                        <span className="text-xs font-medium py-1">AVAILABILITY</span>
                    </Disclosure.Button>
                    <Transition
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 scale-y-0"
                        enterTo="opacity-100 scale-y-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 scale-y-100"
                        leaveTo="opacity-0 scale-y-0"
                    >
                        <Disclosure.Panel
                        className="py-4 t mt-1"
                        >
                            <div className='flex items-center gap-3'>
                                <label className="switch-container relative inline-block w-12 h-6 cursor-pointer">
                                    <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => setChecked(e.target.checked)}
                                    className="sr-only"
                                    role="switch"
                                    aria-checked={checked}
                                    />
                                    <span
                                    className={`
                                        absolute inset-0  rounded-full transition-colors duration-300 ease-in-out
                                        ${checked ? 'bg-black' : 'bg-gray-300'}
                                    `}
                                    >
                                    <span
                                        className={`
                                        absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out
                                        ${checked ? 'translate-x-6' : 'translate-x-0'}
                                        `}
                                    />
                                    </span>
                                </label>
                                <p className='text-xs'>In stock</p>
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                    </>
                )}
                </Disclosure>
                <Disclosure as="div" className="accordion-item ">
                {({ open }) => (
                    <>
                    <Disclosure.Button
                        className="w-full text-left focus:outline-none focus:ring-0 transition-colors flex gap-5 items-center rounded-md"
                    >
                    
                        {!open ?
                        <Plus className='w-[18px]' /> :
                        <Minus className='w-[18px]' />
                        }

                        <span className="text-xs font-medium py-1">PRICE</span>
                    </Disclosure.Button>
                    <Transition
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 scale-y-0"
                        enterTo="opacity-100 scale-y-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 scale-y-100"
                        leaveTo="opacity-0 scale-y-0"
                    >
                        <Disclosure.Panel
                        className="py-4 t mt-1"
                        >
                            <div className='space-y-4'>
                            <Slider
                                min={0}
                                max={2400000}
                                step={1000} // adjust step as needed
                                value={valuee}
                                onValueChange={setValue}
                            />
                                <p className='text-xs'>The highest price is ₦2,400,000.00</p>
                                <form action="" className='flex justify-between gap-6'>
                                    <div className='flex items-center gap-4'>
                                        <p>₦</p>
                                        <Input value={0} />
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <p>₦</p>
                                        <Input value={valuee} />
                                    </div>
                                </form>
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                    </>
                )}
                </Disclosure>
           </div>
           <div className='flex justify-between gap-5 items-center p-5' >
               <p className='text-xs'>SORT BY</p>
               <Select>
                    <SelectTrigger className="border-none focus:ring-0 outline-none font-noto-sans-jp text-xs bg-white text-black px-4 py-2 rounded-md h-12 w-40">
                        <SelectValue placeholder="Featured" />
                    </SelectTrigger>
                    <SelectContent className="font-noto-sans-jp text-sm bg-[#f5f5f5]">
                        <SelectItem value="light">Featured</SelectItem>
                        <SelectItem value="dark">Best selling</SelectItem>
                        <SelectItem value="system">Alphabetically A-Z</SelectItem>
                        <SelectItem value="systemD">Alphabetically Z-A</SelectItem>
                    </SelectContent>
                </Select>
           </div>
           <div className='px-5 underline'>
               <p className='text-sm'>Clear filter</p>
           </div>
      </div>
    </div>
  )
}

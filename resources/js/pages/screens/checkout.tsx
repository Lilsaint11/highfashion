import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Disclosure, Transition } from '@headlessui/react'
import { Link } from '@inertiajs/react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

export default function Checkout() {
    const [open, setOpen] = useState(false)
    const [openPaystack, setOpenPaystack] = useState(true)
    const [openFlutter, setOpenFlutter] = useState(false)
    const [shipping, setShipping] = useState(true)
    
    const paystack = () =>{
        setOpenPaystack(true)
        setOpenFlutter(false)
    }

    const flutter = () =>{
        setOpenPaystack(false)
        setOpenFlutter(true)
    }
  return (
    <div>
        <style>{`
        .tooltip-container:hover .tooltip {
          opacity: 1;
          transform: translateY(0);
          transform: translatex(-120px);
        }
        .tooltip {
          position: absolute;
          top: -4.5rem; /* Above the text */
          left: 50%;
          transform: translateX(-50%) translateY(0.5rem);
          opacity: 0;
          background: black;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-noto-sans-jp text-xs;
          white-space: nowrap;
          z-index: 100;
          transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
        }
        .tooltip::after {
            content: '';
            position: absolute;
            bottom: -0.5rem; /* Pointer size */
            right: 15%;
           
            border: 0.25rem solid transparent;
            border-top-color: black; /* Matches tooltip background */
          }
      `}</style>
        <div className='p-5'>
           <Link href="/"> <img src="/images/logo-black.webp" alt="" className='w-25 cursor-pointer' /></Link>
        </div>
        <div className='relative'>
            <div className="accordion-item border-t bg-[#f5f5f5] cursor-pointer" onClick={()=>setOpen(!open)}>
                <div
                    className="w-full text-left focus:outline-none focus:ring-0 transition-colors flex justify-between items-center rounded-md p-5 border-y"
                >
                    <div className="flex items-center gap-2">
                        <span className="text-[13px] py-1">Order summary</span>
                        {open ? (
                            <ChevronUp className="font-medium w-[16px]" />
                        ) : (
                            <ChevronDown className="font-medium w-[16px]" />
                        )}
                    </div>
                    <p>₦494,959.44</p>
                </div>
                <div className="p-5 rounded-md mt-1 text-xs leading-5 overflow-hidden flex flex-col gap-5 border-b">
                   <div className='flex items-center justify-between'>
                       <div  className='flex items-center gap-5'>
                        <div className='relative'>
                            <div className='rounded-2xl border border-white h-20 w-20'>
                                <img src="/images/hf21.webp" alt="" className='object-contain h-full rounded-2xl' />
                            </div>
                            <p className='absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded flex items-center justify-center'>1</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                                <p className='text-[15px]'>HF X 101 AVENUE HOODIE TOP</p>
                                <p>GREY / 2XL</p>
                        </div>
                       </div>
                       <p className='text-[15px]'>₦480,000.00</p>
                   </div>
                   <div className='space-y-3 text-[15px]'>
                        <div className='flex items-center justify-between'>
                            <p>Subtotal</p>
                            <p>₦480,000.00</p>
                        </div>
                        <div className='flex items-center justify-between '>
                            <p>Shipping</p>
                            <p>₦14,959.44</p>
                        </div>
                   </div>
                   <div className='flex items-center justify-between text-[15px] mt-2'>
                       <h1 className='text-xl font-bold'>Total</h1>
                       <h1 className='text-xl font-bold'><span className='font-medium text-[13px] text-[#aaa] mr-2'>NGN</span>₦494,959.44 </h1>
                   </div>
                </div>
            </div>
            <div className={`w-full h-full bg-white absolute top-17 left-0 transition duration-300 p-5 space-y-10 ${open ? "translate-y-63" : "translate-y-0" }`}>
                <div className='space-y-3'>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl font-bold'>Contact</h1>
                        <Link href="/signin" className='underline'>Sign in</Link>
                    </div>
                    <form action="" className='space-y-4'>
                        <Input placeholder='Email or mobile phone number' className='h-12 text-sm' />
                        <div className='flex gap-3 items-center'>
                            <Checkbox className='w-[18px] h-[18px]' />
                            <p className='text-sm text-[#333]'>Email me with news and offers</p>
                        </div>
                    </form>
                </div>
                <div className='space-y-3'>
                    <h1 className='text-2xl font-bold'>Delivery</h1>
                    <form action="" className='space-y-4'>
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
                        <div className='flex items-center gap-3'>
                            <Checkbox className='w-[18px] h-[18px]' />
                            <p className='text-sm'>Save this information for next time</p>
                        </div>
                    </form>
                </div>
                <div className='w-full space-y-3'>
                    <h1 className='text-md font-bold'>Shipping method</h1>
                   <div className='bg-[#f5f5f5] flex items-center w-full justify-between h-12 border border-black px-3 py-4 rounded-lg'>
                       <p>1</p>
                       <p className='font-bold'>₦14,962.89</p>
                   </div>
                </div>
                <div className='space-y-2'>
                    <h1 className='text-2xl font-bold'>Payment</h1>
                    <p className='text-[#bbb] text-[15px]'>All transactions are secure and encrypted.</p>
                    <div className='relative h-[274px] overflow-hidden'>
                        <div>
                            <div className={`flex items-center justify-between p-4 bg-[#f4f4f4] border  rounded-tl-lg rounded-tr-lg cursor-pointer  ${openFlutter ? "bg-white " : "bg-[#f4f4f4] border-black "}  `} onClick={paystack}>
                                <div className='flex gap-2 items-center'>
                                    <div className={`bg-black  border h-5 w-5 rounded-full flex items-center justify-center`}>
                                        <span className={` transition duration-300  ${openFlutter ? "bg-white scale-240" : " bg-gray-100 scale-100"} h-2 w-2 rounded-full`}></span>
                                    </div>
                                    <p className='text-[15px]'>Paystack</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <img src="/images/card1.svg" alt="" />
                                    <img src="/images/card2.svg" alt="" />
                                    <img src="/images/card3.svg" alt="" />
                                    <div className="bg-white h-6 w-10 rounded-xs flex items-center justify-center border border tooltip-container relative">
                                        <p className='text-xs  '>+5</p>
                                        <div className="tooltip space-y-2 w-36">
                                            <div className='flex gap-2'>
                                                <img src="/images/hcard1.svg" alt="" className='w-[28px]' />
                                                <img src="/images/hcard2.svg" alt="" className='w-[28px]' />
                                                <img src="/images/hcard3.svg" alt="" className='w-[28px]' />
                                            </div>
                                            <div className='flex gap-2'>
                                                <img src="/images/hcard4.svg" alt="" className='w-[28px]' />
                                                <img src="/images/hcard5.svg" alt="" className='w-[28px]' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-center h-40 bg-[#f4f4f4] gap-5'>
                                <div className='text-gray-500 w-28' >
                                    <svg className='text-gray-500 w-28' xmlns="http://www.w3.org/2000/svg" viewBox="-270.8 371 102 52" ><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" d="M-182 404v16.8c0 .7-.4 1.2-1 1.2h-75.7c-.7 0-1.2-.6-1.2-1.2v-47.6c0-.7.6-1.2 1.2-1.2h75.7c.7 0 1 .6 1 1.2V395m-78-14h78m-17 18h27m-3.9-4.6 4.5 4.6-4.5 4.6"></path><circle cx="-255.5" cy="376.5" r="1.5" fill="currentColor"></circle><circle cx="-250.5" cy="376.5" r="1.5" fill="currentColor"></circle><circle cx="-245.5" cy="376.5" r="1.5" fill="currentColor"></circle></svg>
                                </div>
                                <p className='text-center text-[15px] text-[#777]'>After clicking “Pay now”, you will be redirected to<br/> Paystack to complete your purchase securely.</p>
                            </div>       
                        </div>
                        <div className={`rounded-tl-lg rounded-br-lg absolute top-14 w-full transition duration-500 ${openPaystack ? "translate-y-40" : "translate-y-0"}`}>
                            <div className={`flex items-center justify-between cursor-pointer p-4  border  ${openPaystack ? "bg-white border-bl-lg border-br-lg" : "bg-[#f4f4f4] border-black"} `} onClick={flutter}>
                                <div className='flex gap-2 items-center'>
                                    <div className= {`bg-black h-5 w-5 rounded-full flex items-center justify-center border`}>
                                        <span className={` transition duration-300 h-2 w-2 rounded-full ${openPaystack ? "bg-white scale-240" : " bg-gray-100 scale-100"} `} ></span>
                                    </div>
                                    <p className='text-[15px]'>Flutterwave</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <img src="/images/card1.svg" alt="" />
                                    <img src="/images/card2.svg" alt="" />
                                    <img src="/images/card3.svg" alt="" />
                                    <div className="bg-white h-6 w-10 rounded-xs flex items-center justify-center border border tooltip-container relative">
                                        <p className='text-xs  '>+5</p>
                                        <div className="tooltip space-y-2 w-36">
                                            <div className='flex gap-2'>
                                                <img src="/images/hcard1.svg" alt="" className='w-[28px]' />
                                                <img src="/images/hcard2.svg" alt="" className='w-[28px]' />
                                                <img src="/images/hcard3.svg" alt="" className='w-[28px]' />
                                            </div>
                                            <div className='flex gap-2'>
                                                <img src="/images/hcard4.svg" alt="" className='w-[28px]' />
                                                <img src="/images/hcard5.svg" alt="" className='w-[28px]' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-center h-40 bg-[#f4f4f4] gap-5 rounded-bl-lg rounded-br-lg'>
                                <div className='text-gray-500 w-28' >
                                    <svg className='text-gray-500 w-28' xmlns="http://www.w3.org/2000/svg" viewBox="-270.8 371 102 52" ><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" d="M-182 404v16.8c0 .7-.4 1.2-1 1.2h-75.7c-.7 0-1.2-.6-1.2-1.2v-47.6c0-.7.6-1.2 1.2-1.2h75.7c.7 0 1 .6 1 1.2V395m-78-14h78m-17 18h27m-3.9-4.6 4.5 4.6-4.5 4.6"></path><circle cx="-255.5" cy="376.5" r="1.5" fill="currentColor"></circle><circle cx="-250.5" cy="376.5" r="1.5" fill="currentColor"></circle><circle cx="-245.5" cy="376.5" r="1.5" fill="currentColor"></circle></svg>
                                </div>
                                <p className='text-center text-[15px] text-[#777]'>After clicking “Pay now”, you will be redirected to<br/> Paystack to complete your purchase securely.</p>
                            </div>       
                        </div>
                    </div> 
                    
                    <div className={`relative ${shipping?'h-[114px]':'h-[740px]'} overflow-hidden`}>
                        <div>
                            <div className={`flex items-center justify-between p-4 bg-[#f4f4f4] border  rounded-tl-lg rounded-tr-lg cursor-pointer  ${!shipping ? "bg-white " : "bg-[#f4f4f4] border-black "}  `} onClick={()=>setShipping(true)}>
                                <div className='flex gap-2 items-center'>
                                    <div className={`bg-black  border h-5 w-5 rounded-full flex items-center justify-center`}>
                                        <span className={` transition duration-300  ${!shipping ? "bg-white scale-240" : " bg-gray-100 scale-100"} h-2 w-2 rounded-full`}></span>
                                    </div>
                                    <p className='text-[15px]'>Same as shipping address</p>
                                </div>
            
                            </div>     
                        </div>
                        <div className={`rounded-tl-lg rounded-br-lg absolute top-14 w-full transition duration-500 `}>
                            <div className={`flex items-center justify-between cursor-pointer p-4  border  ${shipping ? "bg-white border-bl-lg border-br-lg" : "bg-[#f4f4f4] border-black"} `} onClick={()=>setShipping(false)}>
                                <div className='flex gap-2 items-center'>
                                    <div className= {`bg-black h-5 w-5 rounded-full flex items-center justify-center border`}>
                                        <span className={` transition duration-300 h-2 w-2 rounded-full ${shipping ? "bg-white scale-240" : " bg-gray-100 scale-100"} `} ></span>
                                    </div>
                                    <p className='text-[15px]'>Use a different billing address</p>
                                </div>
                            </div>
                            <div className='flex  justify-center  bg-[#f4f4f4] rounded-bl-lg rounded-br-lg'>
                                <div className='text-gray-500 w-full p-4' >
                                    <form action="" className='space-y-4'>
                                        <Select>
                                            <SelectTrigger className="w-full border focus:ring-0 outline-none font-noto-sans-jp text-sm bg-white text-black px-4 py-2 rounded-md h-12">
                                                <SelectValue placeholder="Country/Region" />
                                            </SelectTrigger>
                                            <SelectContent className="font-noto-sans-jp text-sm bg-[#f5f5f5]">
                                                <SelectItem value="light">Light</SelectItem>
                                                <SelectItem value="dark">Dark</SelectItem>
                                                <SelectItem value="system">System</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Input placeholder='First name (optional)' className='h-12 text-sm bg-white' />
                                        <Input placeholder='Last name' className='h-12 text-sm bg-white' />
                                        <Input placeholder='Address' className='h-12 text-sm bg-white' />
                                        <Input placeholder='Apartment,suite,etc. (optional)' className='h-12 text-sm bg-white' />
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
                                        <Input placeholder='Postal code (optional)' className='h-12 text-sm bg-white' />
                                        <Input placeholder='Phone' className='h-12 text-sm bg-white' />
                                    </form>
                                </div>
                            </div>       
                        </div>
                    </div> 
                </div>
                <div className='space-y-5 pb-3 border-b'>
                    <h1 className='text-2xl font-bold'>Order summary</h1>
                    <div className=" rounded-md mt-1 text-xs leading-5  flex flex-col gap-5 border-b">
                        <div className='flex items-center justify-between'>
                            <div  className='flex items-center gap-5'>
                                <div className='relative'>
                                    <div className='rounded-2xl border  h-18 w-18'>
                                        <img src="/images/hf21.webp" alt="" className='object-contain h-full rounded-2xl' />
                                    </div>
                                    <p className='absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded flex items-center justify-center font-bold'>1</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                        <p className='text-[14px]'>HF X 101 AVENUE HOODIE TOP</p>
                                        <p>GREY / 2XL</p>
                                </div>
                            </div>
                            <p className='text-[15px]'>₦480,000.00</p>
                        </div>
                        <div className='space-y-3 text-[15px]'>
                                <div className='flex items-center justify-between'>
                                    <p>Subtotal</p>
                                    <p>₦480,000.00</p>
                                </div>
                                <div className='flex items-center justify-between '>
                                    <p>Shipping</p>
                                    <p>₦14,959.44</p>
                                </div>
                        </div>
                        <div className='flex items-center justify-between text-[15px]'>
                            <h1 className='text-xl font-bold'>Total</h1>
                            <h1 className='text-xl font-bold'><span className='font-medium text-[13px] text-[#aaa] mr-2'>NGN</span>₦494,959.44 </h1>
                        </div>
                        <Button className='w-full h-12 text-lg font-bold'>Pay now</Button>
                    </div>
                </div>
                <div className='py-5 -mt-10'>
                    <p className='underline cursor-pointer'>Privacy Policy</p>
                </div>
            </div>
        </div>
    </div>
  )
}

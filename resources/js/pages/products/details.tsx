import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Disclosure, Transition } from '@headlessui/react'
import { Link } from '@inertiajs/react'
import { Copy, Facebook, MessageCircleHeart, Minus, Package, Phone, Plus, Puzzle, Ruler, Twitter, Waves } from 'lucide-react'
import React from 'react'

export default function Details() {
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
        },
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
    const items1 = [
        { 
            title: 'What payment methods can I use?', 
            content: 'We offer 35 different payment methods including major providers like Mastercard, Visa, PayPal, American Express and Diners as well as many different local payment methods including Klarna, iDEAL, AliPay, Sofort, giropay, and many more.', 
            id: 1
         },

        { 
            title: 'Can I purchase items with another currency?',
            content: 'Yes, you may select a currency based on your personal preference. When you select your country in the country selector on the upper right of the website or are taken directly to your country’s version of the website, you will see prices listed in the regional currency.', 
            id: 2
        },
        { 
            title: 'Can I make changes to my order after it’s been placed?', 
            content: 'We do everything we can to fulfill orders quickly and unfortunately cannot make updates after an order has been placed. These changes include removing or adding products and/or changing the delivery address. If a mistake has been made with your order information, it’s quickest to create a new order with the correct information and then let our Customer Service.', 
            id: 3
        },
        { 
            title: 'Do you offer e-gift cards for international customers?', 
            content: 'E-gift cards are only available to customers shipping within the U.S.', 
            id: 4
        },
        { 
            title: 'How Do I Set Up A Subscription Order?', 
            content: 'We will deliver products to you as soon as reasonably possible. Orders are usually dispatched between 1-3 days from the date of the order being placed. Please contact us our customer service team if your delivery has not been received within the dates described.', 
            id: 5
        },
        {
            title: 'How To Return My Items?', 
            content: 'We do not currently offer free returns to overseas customers. You will therefore need to cover all costs of returning any items to us yourself. We advise that you mark your package ‘returned goods’ to avoid further duties. Remember: We strongly recommend that you return any items via a registered trackable service and obtain and retain proof of posting as we do not accept responsibility for items that fail to arrive with us.', 
            id: 6
        },
      ];
  return (
    <div>
          <style>{`
        .product-container {
            position: relative;
            overflow: hidden;
        }
        
        .quick-view {
            transition: transform 0.3s ease-in-out;
        }
        .product-container:hover .quick-view {
            transform: translateY(-2.5rem);
        }
        `}</style>
        <Layout>
            <div className='flex items-center gap-2 text-xs p-3'>
               <Link href='/'> <p className='underline'>Home</p></Link>
                <p>/</p>
                <p>HF X 101 AVENUE HOODIE TOP</p>
            </div>
            <div>
                <img src="/images/hf41.webp" alt="" className='w-full h-full' />
            </div>
            <div className='uppercase mt-10 flex flex-col gap-5 px-2'>
                <div className='flex flex-col gap-2'>
                    <p className='text-[#a1a1a1] text-xs'>High Fashion by J.O.L</p>
                    <p className='text-xl'>HF X 101 AVENUE HOODIE TOP</p>
                    <p>₦480,000.00</p>
                </div>
                <div>
                    <p className='text-sm'><span className='font-bold'>Color:</span>GREY</p>
                    <div className='flex mt-3'>
                        <div className='border p-2 w-12 h-12  flex items-center justify-center'>
                            <div className='bg-black rounded-full h-5 w-5 flex items-center justify-center'>.</div>
                        </div>
                        <div className='border p-2 w-12 h-12  flex items-center justify-center'>
                            <div className='bg-[#eee] text-[#eee] rounded-full h-5 w-5 flex items-center justify-center'>.</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='flex justify-between'>
                        <p className='text-sm'>SIZE:2XL</p>
                        <div className='flex items-center gap-2'>
                            <Ruler className='w-[18px]' />
                            <p className='text-xs'>Sizing guide</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='border p-3 w-12 flex items-center justify-center text-sm'>
                            <p>S</p>
                        </div>
                        <div  className='border p-3 w-12 flex items-center justify-center text-sm'>
                            <p>M</p>
                        </div>
                        <div  className='border p-3 w-12 flex items-center justify-center text-sm'>
                            <p>L</p>
                        </div>
                        <div  className='border p-3 w-12 flex items-center justify-center text-sm'>
                            <p>XL</p>
                        </div>
                        <div  className='border p-3 w-12 flex items-center justify-center text-sm'>
                            <p>2XL</p>
                        </div>
                        <div  className='border p-3 w-12 flex items-center justify-center text-sm'>
                            <p>3XL</p>
                        </div>
                    </div>
                    <div className='my-7 flex flex-col gap-5'>
                        <div className='flex gap-3 h-12'>
                            <div className='flex p-2 border w-28 justify-between text-sm items-center'>
                                <Minus className='w-[20px]' />
                                <p>1</p>
                                <Plus className='w-[20px]' />
                            </div>
                           <Button className='w-full h-full bg-white text-black border rounded-none text-xs  font-bold'>ADD TO CART</Button>
                        </div>
                        <Button className='h-12 rounded-none text-xs  font-bold'>BUY IT NOW</Button>
                    </div>
                    <div className='flex text-sm gap-4 mb-7'>
                        <div className='flex items-center  gap-1'>
                            <Puzzle className='w-[24px]' />
                            <p className='border-b'>Materials</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Package className='w-[24px] ' />
                            <p className='border-b'>Shipping & Returns</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Waves className='w-[24px]' />
                            <p className='border-b'>Care Guide</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-6'>
                        <Facebook className='w-[16px]' />
                        <Twitter className='w-[16px]' />
                        <MessageCircleHeart className='w-[16px]' />
                        <Phone className='w-[16px]' />
                        <Copy className='w-[16px]' />
                    </div>
                    <div className='flex flex-col  my-15 p-5 pb-10  space-y-8 '> 
                        <div className='flex flex-col'>
                            <p className='uppercase text-2xl font-bold'>YOU MAY ALSO LIKE</p>
                            <p className='text-[11px]'>Combine your style with these products</p>
                        </div>
                        <div className='w-full overflow-x-auto scrollbar-hidden scroll-smooth'>
                            <div className='flex w-max overflow-x-scroll gap-2 '>
                                {items.map((item)=>(
                                    <div className='w-60 flex flex-col items-center gap-5'>
                                    <div className='product-container relative'>
                                        <img src={item.image} alt="" className='w-64 object-cover h-64' />
                                        <div className={`bg-[rgba(0,0,0,0.8)] text-white flex justify-center items-center text-[14px] h-10 absolute w-full transition duration-300 -translate-y-10' : 'translate-y-0 quick-view`}>
                                            <p>Quick view</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center">
                                        <p className='text-xs font-bold'>{item.name}</p>
                                        <p className='text-xs'>${item.price} USD</p>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 items-center my-12'>
                        <h1 className='text-3xl'>F.A.Q.</h1>
                        <p className='text-xs'>They appreciate cut and details, things that aren't so obvious.</p>
                        <div className="w-full max-w-md mx-auto my-4 border-b">
                            {items1.map((item)=>(
                                    <Disclosure as="div" className="accordion-item border-t py-3">
                                    {({ open }) => (
                                        <>
                                        <Disclosure.Button
                                            className="w-full text-left focus:outline-none focus:ring-0 transition-colors flex justify-between items-center rounded-md"
                                        >
                                            <span className="text-[13px]  py-1  uppercase">{item.title}</span>
                                        
                                            {!open ?
                                            <Plus className='font-medium w-[16px]' /> :
                                            <Minus className='font-medium w-[16px]' />
                                            }
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
                                            className="py-4 rounded-md mt-1 text-xs leading-5"
                                            >
                                                {item.content}
                                            </Disclosure.Panel>
                                        </Transition>
                                        </>
                                    )}
                                    </Disclosure>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
  )
}

import ClothCard from '@/components/clothCard'
import Layout from '@/components/layout'
import OrderNote from '@/components/orderNote'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash, X } from 'lucide-react'
import React, { useState } from 'react'
import { Disclosure, Textarea, Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react'
import ProductHoverImage from '@/components/productHover'
import CartSlide from '@/components/cartSlide'


interface SearchMenuProps {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Cart({isCartOpen,setIsCartOpen}:SearchMenuProps) {
    const products = [
        {
            id:1,
            name: "HF X BURNA SLEEVELESS TEE",
            price: 210.26,
            colors: 3,
            main_image:"/images/hf1.webp",
            left_third_image:"/images/hf11.webp",
            middle_third_image:"/images/hf12.webp",
            right_third_image:"/images/hf13.webp",
        },
        {
            id:2,
            name: "HF X BURNA SLEEVELESS TEE",
            price: 210.26,
            colors: 3,
            main_image:"/images/hf2.webp",
            left_third_image:"/images/hf21.webp",
            middle_third_image:"/images/hf22.webp",
            right_third_image:"/images/hf23.webp"
        },
        {
            id:3,
            name: "HF X BURNA SLEEVELESS TEE",
            price: 210.26,
            colors: 3,
            main_image:"/images/hf3.webp",
            left_third_image:"/images/hf31.webp",
            middle_third_image:"/images/hf32.webp",
            right_third_image:"/images/hf33.webp"
        },
        {
            id:4,
            name: "HF X BURNA SLEEVELESS TEE",
            price: 210.26,
            colors: 3,
            main_image:"/images/hf4.webp",
            left_third_image:"/images/hf41.webp",
            middle_third_image:"/images/hf42.webp",
            right_third_image:"/images/hf43.webp"
        }
    ]
    const items = [
        {
            id:1,
            name: "HF X BURNA SLEEVELESS TEE",
            price: 210.26,
            color: 'black',
            image:"/images/hf1.webp",
            quantity:1,
            size: 'xxl'
        },
        {
            id:2,
            name: "HF X BURNA SLEEVELESS TEE",
            price: 210.26,
            color: 'black',
            image:"/images/hf2.webp",
            quantity:1,
            size: 'xxl'
        },
        {
            id:3,
            name: "HF X BURNA SLEEVELESS TEE",
            price: 210.26,
            color: 'black',
            image:"/images/hf3.webp",
            quantity:1,
            size: 'xxl'
        },
        {
            id:4,
            name: "HF X BURNA SLEEVELESS TEE",
            price: 210.26,
            color: 'black',
            image:"/images/hf4.webp",
            quantity:1,
            size: 'xxl'
        }
    ]
  return (
      <Layout>
        <div className='mt-5 overflow-x-hidden w-screen '>
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
        .btn-container {
            position: relative;
            overflow: hidden;
          }
          .btn-container::before {
              content: '';
              position: absolute;
              top: -25%; /* Start below the button */
              left: -1%;
              width: 120%;
              height: 180%;
              background: black;
              transition: top 0.3s ease-in-out;
              z-index: -1;
              rotate:3deg;
  
            }
            .btn-container:hover::before {
              top: -205%; /* Slide up to cover the button */
            }
        `}</style>
            <div className='bg-white w-full h-full'>
                <div className=''>
                    <div className='flex flex-col gap-10 px-5 py-5 '>
                        <p className='text-xl'>Your cart</p>
                        <div className='flex justify-between text-sm border-b pb-2'>
                            <p>Product</p>
                            <p>Total</p>
                        </div>
                    </div>
                    <div className='space-y-7 mt-2'>
                        {items.map((item) => (
                            <div className='flex gap-5 items-center'>
                                <img src={item.image} alt="" className='w-24 h-28 object-cover' />
                                <div className='space-y-2 uppercase'>
                                    <h1 className='text-md font-bold'>{item.name}</h1>
                                    <p className='text-xs '>Select Color: {item.color}</p>
                                    <p className='text-xs'>Size: {item.size}</p>
                                    <div className='flex items-center gap-5'>
                                        <div className='border flex items-center gap-3 p-1'>
                                            <Minus className=' w-[16px]'  />
                                            <p className='text-md '>{item.quantity}</p>
                                            <Plus className=' w-[16px]' />
                                        </div>
                                        <Trash className='text-red-500 w-[16px]' />
                                    </div>
                                </div>
                                <p className='text-xs'>${item.price} USD</p>
                            </div>
                        ))}
                    </div>
                    <div className='bg-white w-full  mt-8 '>
                        <Disclosure as="div" className="accordion-item border-b py-5">
                            {({ open }) => (
                                <>
                                <Disclosure.Button
                                    className="w-full text-left focus:outline-none focus:ring-0 transition-colors flex justify-between items-center rounded-md px-4 "
                                >
                                <p className='text-sm '>Add notes</p>
                                
                                    {!open ?
                                    <Plus className='w-[20px]' /> :
                                    <Minus className='w-[20px]' />
                                    }
                                </Disclosure.Button>
                                <Transition
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-100 -translate-y-50"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 -translate-y-50"
                                    leaveTo="opacity-100 translate-y-0"
                                >
                                    <Disclosure.Panel
                                    className="py-4 rounded-md mt-1 px-4"
                                    >
                                        <form action="" className='space-y-4 pr-5'>
                                            <Textarea rows={5} className="border w-full" />
                                        </form>
                                    </Disclosure.Panel>
                                </Transition>
                                </>
                            )}
                        </Disclosure>
                        <div className='px-4 flex flex-col items-center gap-5 mt-5'>
                           <Link href='/checkout' className='w-full'> 
                            <span className='w-full btn-container'>
                                <Button className='w-full h-12 text-sm  border rounded-none'>CHECKOUT . $532.96 USD</Button>
                            </span>
                            </Link>
                            <p className='text-sm'>Taxes and shipping calculated at checkout</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center mt-20 p-5 pb-10  space-y-8 '> 
                        <div className='flex flex-col items-center'>
                            <p className='uppercase text-2xl'>You may also like</p>
                            <p className='text-sm'>Describe your featured collection here</p>
                        </div>
                        <div className='w-full overflow-x-auto scrollbar-hidden scroll-smooth'>
                            <div className='flex w-max overflow-x-scroll gap-2 '>
                                {products.map((product)=>(
                                     <Link href={`/products/${product.id}`}>
                                     <div className='w-56 flex flex-col items-center'>
                                       <ProductHoverImage  product={{
                                         main: product.main_image,
                                         leftThird: product.left_third_image,
                                         middleThird: product.middle_third_image,
                                         rightThird: product.right_third_image,
                                         }}
                                         alt={product.name}
                                         className="w-full"  
                                     />
                                         <div className="flex flex-col gap-2 items-center mt-5">
                                             <p className='text-xs font-bold'>{product.name}</p>
                                             <p className='text-xs'>${product.price} USD</p>
                                             <p className='text-xs'>Available in {product.colors} colors</p>
                                         </div>
                                     </div>
                                 </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center mt-13 p-5 pb-10  space-y-8 '> 
                        <div className='flex flex-col items-center'>
                            <p className='uppercase text-2xl'>Recently viewed products</p>
                            <p className='text-sm'>Describe your recently viewed products here</p>
                        </div>
                        <div className='w-full overflow-x-auto scrollbar-hidden scroll-smooth'>
                            <div className='flex w-max overflow-x-scroll gap-2 '>
                                {products.map((product)=>(
                                    <Link href={`/products/${product.id}`}>
                                    <div className='w-56 flex flex-col items-center'>
                                        <ProductHoverImage  product={{
                                            main: product.main_image,
                                            leftThird: product.left_third_image,
                                            middleThird: product.middle_third_image,
                                            rightThird: product.right_third_image,
                                            }}
                                            alt={product.name}
                                            className="w-full"  
                                        />
                                        <div className="flex flex-col gap-2 items-center mt-5">
                                            <p className='text-xs font-bold'>{product.name}</p>
                                            <p className='text-xs'>${product.price} USD</p>
                                            <p className='text-xs'>Available in {product.colors} colors</p>
                                        </div>
                                    </div>
                                </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                </div>
        </div>
        </div>
    </Layout>
  )
}

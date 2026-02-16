import Banners from '@/components/banners'
import FlashMessage from '@/components/flashmessage'
import Footer from '@/components/footer'
import Header from '@/components/header'
import MoreProducts from '@/components/more-products'
import ProductHoverImage from '@/components/productHover'
import CarouselSlider from '@/components/swiper'
import { Link } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

export default function index({products}) {
    // const products = [
    //     {
    //         id:1,
    //         name: "HF X BURNA SLEEVELESS TEE",
    //         price: 210.26,
    //         colors: 3,
    //         main_image:"/images/hf1.webp",
    //         left_third_image:"/images/hf11.webp",
    //         middle_third_image:"/images/hf12.webp",
    //         right_third_image:"/images/hf13.webp"
    //     },
    //     {
    //         id:2,
    //         name: "HF X BURNA SLEEVELESS TEE",
    //         price: 210.26,
    //         colors: 3,
    //         main_image:"/images/hf2.webp",
    //         left_third_image:"/images/hf21.webp",
    //         middle_third_image:"/images/hf22.webp",
    //         right_third_image:"/images/hf23.webp"
    //     },
    //     {
    //         id:3,
    //         name: "HF X BURNA SLEEVELESS TEE",
    //         price: 210.26,
    //         colors: 3,
    //         main_image:"/images/hf3.webp",
    //         left_third_image:"/images/hf31.webp",
    //         middle_third_image:"/images/hf32.webp",
    //         right_third_image:"/images/hf33.webp"
    //     },
    //     {
    //         id:4,
    //         name: "HF X BURNA SLEEVELESS TEE",
    //         price: 210.26,
    //         colors: 3,
    //         main_image:"/images/hf4.webp",
    //         left_third_image:"/images/hf41.webp",
    //         middle_third_image:"/images/hf42.webp",
    //         right_third_image:"/images/hf43.webp"
    //     }
    // ]
    


let colorsLength = 0;

const colorsData = products[0]?.colors; // Safe access

if (colorsData) {
    let colorsArray = [];
    
  
    colorsArray = JSON.parse(colorsData);
    colorsLength = colorsArray.length; // Now 4 (elements), not 33 (chars)
}

console.log(colorsLength); // Output: 4
  return (
    <>
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
       <div className='overflow-hidden' >
            <FlashMessage />
            <div className='flex flex-col gap-13'>
                <div className='relative'>
                    <div className='absolute top-0 left-0 w-full z-100'>
                        <Header />
                    </div>
                    <CarouselSlider />
                </div>
                <div className='px-5'>
                    <div className='flex flex-col gap-3 mb-5'>
                        <h1 className='text-[13px] font-semibold'>NEW IN</h1>
                        <div  className='flex flex-col gap-4'>
                            <p className='text-[13px] '>EXPLORE OUR NEW PRODUCTS</p> 
                            <Link href="/collections/new-in"><p className='text-[13px] border-b border-slate-800  w-19'>Shop New In</p></Link>
                        </div>
                    </div>
                    <div className='overflow-x-auto scrollbar-hidden scroll-smooth'>
                        <div className='flex gap-3 w-max'>
                            {products.map((product)=>(
                                <Link href={`/products/${product.id}`}>
                                    <div className='w-60 flex flex-col items-center'>
                                      <ProductHoverImage  product={{
                                        main: product.main_image,
                                        leftThird: product.left_third_image,
                                        middleThird: product.middle_third_image,
                                        rightThird: product.right_third_image,
                                        }}
                                        alt={product.name}
                                        className="w-full"  
                                    />
                                        <div className="flex flex-col gap-2 items-center">
                                            <p className='text-xs font-bold'>{product.name}</p>
                                            <p className='text-xs'>${product.base_price} USD</p>
                                            <p className='text-xs'>Available in {product.colors.length} colors</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <Banners />
                    <MoreProducts />
                </div>
                <Footer />
            </div>
            
        </div>
    </>
   
  )
}

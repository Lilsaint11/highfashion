import React from 'react'
import { Link } from '@inertiajs/react'
import ProductHoverImage from './productHover'

export default function MoreProducts() {
    const products = [
        {
            id:1,
            name: "HF X BURNA SLEEVELESS TEE",
            price: 210.26,
            colors: 3,
            main_image:"/images/hf1.webp",
            left_third_image:"/images/hf11.webp",
            middle_third_image:"/images/hf12.webp",
            right_third_image:"/images/hf13.webp"
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
  return (
    <div className='px-5 border-t border-slate-300 pt-15'>
                    <div className='flex flex-col gap-3 mb-5 items-center'>
                        <div  className='flex flex-col gap-4 items-center'>
                            <p className='text-[13px] font-bold'>EXPLORE MORE PRODUCTS</p> 
                            <Link href="/collections/new-in"><p className='text-[13px] border-b border-slate-400  w-26'>Shop All Products</p></Link>
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
                                         <p className='text-xs'>${product.price} USD</p>
                                         <p className='text-xs'>Available in {product.colors} colors</p>
                                     </div>
                                 </div>
                             </Link>
                            ))}
                        </div>
                    </div>
                </div>
  )
}

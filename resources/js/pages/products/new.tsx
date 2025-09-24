import FilterSlide from '@/components/filterSlide';
import Layout from '@/components/layout'
import ProductHoverImage from '@/components/productHover';
import { Link } from '@inertiajs/react';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function New() {
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
    const [filterOpen, setFilterOpen] = useState(false)
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
        <Layout>
            <div className='flex flex-col gap-10 my-10 p-3 '>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 cursor-pointer' onClick={()=>setFilterOpen(true)}>
                        <SlidersHorizontal className='w-[15px]' />
                        <p className='uppercase text-[13px]'>Filter and sort</p>
                    </div>
                    <p className='uppercase text-[13px]'>94 PRODUCTS</p>
                </div>
                <div className='grid grid-cols-2 gap-3 w-full z-20'>
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
        </Layout>
        <FilterSlide isFilterOpen={filterOpen} setIsFilterOpen={setFilterOpen} />
   </>
  )
}

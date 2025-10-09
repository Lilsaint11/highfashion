import FilterSlide from '@/components/filterSlide';
import Layout from '@/components/layout'
import ProductHoverImage from '@/components/productHover';
import { Link } from '@inertiajs/react';
import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function New({products}) {
   
    const [filterOpen, setFilterOpen] = useState(false)
    useEffect(()=>{
        console.log(products)
    },[])
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
                                    <p className='text-xs'>${product.base_price} USD</p>
                                    <p className='text-xs'>Available in {product.colors.length} colors</p>
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

import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ShopMenuProps {
    setIsMenOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsWomenOpen:React.Dispatch<React.SetStateAction<boolean>>;
    isShopOpen: boolean;
    setIsShopOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAccOpen:React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function ShopMenu({setIsMenOpen,setIsWomenOpen,setIsAccOpen,isShopOpen,setIsShopOpen}:ShopMenuProps) {
  return (
    <div className={`z-100 py-5 bg-black text-white w-screen h-screen absolute  left-0 translate-y-0 transition duration-300 flex flex-col gap-4 ${isShopOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className=' flex gap-3 px-3 items-center' onClick={()=>setIsShopOpen(false)}>
        <ArrowLeft className='w-[20px]' />
        <p className='text-sm'>SHOP</p>
    </div>
    
    
    <nav className="flex flex-col px-5 justify-center  text-sm font-noto-sans-jp space-y-4 mt-4">
        <Link href="/collections/new-in" className="hover:text-gray-300 transition-colors border-b pb-5">All Products</Link>
        <div className='flex item-center justify-between w-full border-b' onClick={()=>setIsMenOpen(true)}>
            <p className="hover:text-gray-300 transition-colors  pb-5" >Men</p>
            <ArrowRight className='w-[20px]' />
        </div>
        <div className='flex item-center justify-between w-full border-b' onClick={()=>setIsWomenOpen(true)}>
            <p className="hover:text-gray-300 transition-colors  pb-5" >Women</p>
            <ArrowRight className='w-[20px]' />
        </div>
        <div className='flex item-center justify-between w-full border-b' onClick={()=>setIsAccOpen(true)}>
            <p className="hover:text-gray-300 transition-colors  pb-5" >Accessories</p>
            <ArrowRight className='w-[20px]' />
        </div>
    </nav>
</div>
  )
}

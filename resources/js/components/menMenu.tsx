import { Link } from '@inertiajs/react';
import { Menu, Search, ShoppingBag, X,ArrowRight, ArrowLeft } from 'lucide-react';


interface MenMenuProps {
    isMenOpen: boolean;
    setIsMenOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function MenMenu({isMenOpen,setIsMenOpen}:MenMenuProps) {
  return (
    <div className={`z-100 py-5 bg-black text-white w-screen h-screen absolute left-0 translate-y-0 transition duration-300 flex flex-col gap-4 ${isMenOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className=' flex gap-3 px-3 items-center' onClick={()=>setIsMenOpen(false)}>
        <ArrowLeft className='w-[20px]' />
        <p className='text-sm'>MEN</p>
    </div>
    
    
    <nav className="flex flex-col px-5 justify-center  text-sm font-noto-sans-jp space-y-4 mt-4">
        <Link href="/collections/t-shirts" className="hover:text-gray-300 transition-colors border-b pb-5">T shirts</Link>
        <Link href="/collections/outer-wear" className="hover:text-gray-300 transition-colors border-b pb-5">Outer Wear</Link>
        <Link href="/collections/shirts" className="hover:text-gray-300 transition-colors border-b pb-5">Shirts</Link>
        <Link href="/collections/shorts" className="hover:text-gray-300 transition-colors border-b pb-5">Shorts</Link>
        <Link href="/collections/pants" className="hover:text-gray-300 transition-colors border-b pb-5">Pants</Link>
        <Link href="/collections/denim" className="hover:text-gray-300 transition-colors border-b pb-5">Denim</Link>
    </nav>
</div>
  )
}

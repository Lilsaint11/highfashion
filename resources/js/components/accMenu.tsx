import { Link } from '@inertiajs/react';
import { Menu, Search, ShoppingBag, X,ArrowRight, ArrowLeft } from 'lucide-react';

interface AccMenuProps {
    isAccOpen: boolean;
    setIsAccOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function AccMenu({isAccOpen,setIsAccOpen}:AccMenuProps) {
  return (
    <div className={`z-100 py-5 bg-black text-white w-screen h-screen absolute left-0 translate-y-0 transition duration-300 flex flex-col gap-4 ${isAccOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className=' flex gap-3 px-3 items-center' onClick={()=>setIsAccOpen(false)}>
        <ArrowLeft className='w-[20px]' />
        <p className='text-sm'>ACCESSORIES</p>
    </div>
    
    
    <nav className="flex flex-col px-5 justify-center  text-sm font-noto-sans-jp space-y-4 mt-4">
        <Link href="/collections/shoulder-bags" className="hover:text-gray-300 transition-colors border-b pb-5">Shoulder Bags</Link>
        <Link href="/collections/bags" className="hover:text-gray-300 transition-colors border-b pb-5">Bags</Link>
        <Link href="/collections/hats" className="hover:text-gray-300 transition-colors border-b pb-5">Hats</Link>
        <Link href="/collections/belt" className="hover:text-gray-300 transition-colors border-b pb-5">Belts</Link>
    </nav>
</div>
  )
}

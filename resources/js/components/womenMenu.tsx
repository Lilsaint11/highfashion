import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface WomenMenuProps {
    isWomenOpen: boolean;
    setIsWomenOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function WomenMenu({ isWomenOpen, setIsWomenOpen }: WomenMenuProps) {
  return (
    <div className={`z-100 py-5 bg-black text-white w-screen h-screen absolute  left-0 translate-y-0 transition duration-300 flex flex-col gap-4 ${isWomenOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className=' flex gap-3 px-3 items-center' onClick={()=>setIsWomenOpen(false)}>
        <ArrowLeft className='w-[20px]' />
        <p className='text-sm'>WOMEN</p>
    </div>
    
    
    <nav className="flex flex-col px-5 justify-center  text-sm font-noto-sans-jp space-y-4 mt-4">
        <Link href="/collections/new" className="hover:text-gray-300 transition-colors border-b pb-5">Gown</Link>
        <Link href="/collections/tops" className="hover:text-gray-300 transition-colors border-b pb-5">Tops</Link>
        <Link href="/collections/shorts" className="hover:text-gray-300 transition-colors border-b pb-5">Shorts</Link>
        <Link href="/collections/skirt" className="hover:text-gray-300 transition-colors border-b pb-5">Skirt</Link>
    </nav>
</div>
  )
}

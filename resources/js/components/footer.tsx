import { Link } from '@inertiajs/react';
import { Instagram,ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Accordion from './accordion';

export default function Footer() {
    const storeAddress = "Aaron's Lekki Mall, 12b Olubunmi Owa St, Lekki Phase I, Lekki 106104, Lagos"; 
    const encodedAddress = encodeURIComponent(storeAddress); 
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
  return (
    <div className='mt-10 bg-black px-4 py-10 text-white flex flex-col gap-5'>
        <style>{`
        .animated-link-container::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0px;
          height: 1.5px;
          background: white; /* slate-600 for grayish border */
          transition: width 0.3s ease-in-out, background 0.3s ease-in-out;
        }
        .animated-link-container:hover::before {
          width:100px
        }
      `}</style>
        <div className='flex flex-col gap-5'>
            <img src="/images/Logof.avif" alt="" className='w-32 ' />
            <p className='text-xs'>At High Fashion By Jol, we believe that fashion is an expression of individuality and artistry.</p>
            <Instagram className='w-[18px]' />
        </div>
        <div>
            <Accordion />
        </div>
        <div className='text-[12px] flex flex-col gap-5'>
            <p className='font-bold'>Operating hours: Monday – Saturday (10am -8pm) Sunday (12pm-8pm)</p>
            <p>SHOP 38/39, AARON'S LEKKI MALL, ADMIRALTY WAY, LAGOS, NIGERIA</p>
            <div className={`animated-link-container relative inline-block overflow-hidden `}>
                <a href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"><p className='border-b border-white w-24'>GET DIRECTIONS</p>
                </a>
            </div>
        </div>
        <div className='flex flex-col gap-5 text-[12px]'>
            <p className='font-bold'>GET 10% OFF YOUR NEXT ORDER</p>
            <div className='flex flex-col gap-5 text-[12px]'>
                <p>*BY SIGNING UP, YOU AGREE TO RECEIVE EMAILS ABOUT HIGHFASHION AND OUR <Link>OTHER TERMS.</Link></p>
                <form action="">
                    <div className="relative flex-1 border border-slate-600 p-3 flex justify-between">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(email !== '')}
                            className=" w-full bg-transparent p-1 font-noto-sans-jp text-sm text-white placeholder-transparent focus:outline-none focus:ring-0 focus:border-white transition-colors "
                        />
                        <label
                            htmlFor="email"
                            className={`absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-noto-sans-jp transition-all duration-300 ease-in-out peer-focus:top-0 peer-focus:text-xs peer-focus:text-white peer-focus:translate-y-0 bg-black  ${
                            isFocused || email ? 'top-0 text-xs text-white -translate-y-9' : ''
                            }`}
                        >
                            Email
                        </label>
                    </div>
                </form>
                <p className='mt-20 text-gray-400'>© 2025 High Fashion by J.O.L, All Rights Reserved</p>
            </div>
        </div>
    </div>
  )
}

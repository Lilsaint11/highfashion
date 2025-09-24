import { Link } from '@inertiajs/react';
import { Menu, Search, ShoppingBag, X,ArrowRight, ArrowLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import AccMenu from './accMenu';
import CartSlide from './cartSlide';

import MenMenu from './menMenu';
import Searchbar from './searchbar';
import ShopMenu from './shopMenu';
import WomenMenu from './womenMenu';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
    const [isMenOpen, setIsMenOpen] = useState<boolean>(false);
    const [isWomenOpen, setIsWomenOpen] = useState<boolean>(false);
    const [isAccOpen, setIsAccOpen] = useState<boolean>(false);

    // Toggle menu open/close
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsMenOpen(false)
        setIsShopOpen(false)
        setIsWomenOpen(false)
        setIsAccOpen(false)
    };

    // Lock/unlock body scroll when menu is open/closed
    useEffect(() => {
        if (isMenuOpen) {
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
        document.body.style.overflow = ''; // Restore scrolling
        }
        return () => {
        document.body.style.overflow = ''; // Cleanup on unmount
        };
    }, [isMenuOpen]);
  return (
    <div className=''>
      <style>{`
        .header-container {
          position: relative;
          overflow: hidden;
        }
        .header-container::before {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
          transition: top 0.2s ease-in-out;
          z-index: -1;
        }
        .header-container:hover::before {
          top: 0;
        }
        .burger {
            width: 22px;
            height: 16px;
            position: relative;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .burger span {
            display: block;
            width: 100%;
            height: 2px;
            background: white;
            transition: all 0.3s ease-in-out;
            transform-origin: center;
          }
          .burger.open span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
          }
          .burger.open span:nth-child(2) {
            opacity: 0;
          }
          .burger.open span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
          }
      `}</style>
      <div className="header-container text-white flex justify-between items-center py-6 px-4 border-b border-slate-400 font-noto-sans-jp ">
      <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="focus:outline-none focus:ring-0"
        >
          <div className={`burger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <Link href='/'><img src="/images/Header-Logo.svg" alt="Logo" className="h-8" /></Link>
        <div className="flex items-center gap-3">
          <Search className="w-[22px]" onClick={()=>setIsSearchOpen(true)} />
          <ShoppingBag className="w-[22px]" onClick={()=>setIsCartOpen(true)} />
        </div>
        <div
        className={`fixed inset-0 bg-black text-white z-30 transform transition-all duration-500 ease-in-out top-[121px] ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <nav className="flex flex-col px-5 justify-center  text-sm font-noto-sans-jp space-y-4 mt-4">
          <Link href="/" className="hover:text-gray-300 transition-colors border-b pb-5">Home</Link>
          <div className='flex w-full justify-between border-b cursor-pointer' onClick={()=>setIsShopOpen(true)}>
              <p className="hover:text-gray-300 transition-colors  pb-5">Shop</p>
              <ArrowRight className='w-[20px]' />
          </div>
          <Link href="/screens/about" className="hover:text-gray-300 transition-colors border-b pb-5">About</Link>
          <Link href="/screens/faq" className="hover:text-gray-300 transition-colors border-b pb-5">FAQ</Link>
          <Link href="/screens/contact" className="hover:text-gray-300 transition-colors border-b pb-5">Contact</Link>
        </nav>
      </div>
      </div>
     {isMenuOpen &&  
     <>
        <ShopMenu isShopOpen={isShopOpen} setIsShopOpen={setIsShopOpen} setIsMenOpen={setIsMenOpen} setIsWomenOpen={setIsWomenOpen} setIsAccOpen={setIsAccOpen}  />
        <MenMenu isMenOpen={isMenOpen} setIsMenOpen={setIsMenOpen}  />
        <WomenMenu isWomenOpen={isWomenOpen} setIsWomenOpen={setIsWomenOpen} />
        <AccMenu isAccOpen={isAccOpen} setIsAccOpen={setIsAccOpen} />
        </>
     }
   
     <CartSlide isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
     <Searchbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
    </div>
  );
}
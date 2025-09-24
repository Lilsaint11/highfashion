import { X } from 'lucide-react'
import React from 'react'

interface SearchMenuProps {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Searchbar({isSearchOpen,setIsSearchOpen}:SearchMenuProps) {
  return (
      <div className='fixed top-0 z-50'>
        <div className={` transition duration-200 w-screen h-screen z-30 absolute -top-10 left-0 bg-[rgba(0,0,0,0.8)]  ${isSearchOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={()=>setIsSearchOpen(false)}>
        </div>
        <div className={`bg-white w-screen h-screen z-40 absolute -top-0 left-0 translate-x-5 transition duration-300 ${isSearchOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='border-b flex gap-10 pl-8 pr-12 items-center'>
            <input type="text" className='w-full outline-none py-5' placeholder='Search for anything' />
            <X className='' onClick={()=>setIsSearchOpen(false)}/>
        </div>
      </div>
    </div>
  )
}

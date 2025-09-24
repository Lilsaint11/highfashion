import { Textarea } from '@headlessui/react'
import React from 'react'
import { Button } from './ui/button'

interface NoteProps {
    isNoteOpen: boolean;
    setIsNoteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function OrderNote({isNoteOpen,setIsNoteOpen }:NoteProps) {
  return (
    <>
        <div className={`transition duration-200 w-screen h-screen absolute -top-10 left-0 bg-[rgba(0,0,0,0.3)]  ${isNoteOpen ? 'translate-y-0' : 'translate-y-full'} `} onClick={()=>setIsNoteOpen(false)}>
            </div>
            <div className={`bg-white w-full h-72 p-10 space-y-4 absolute bottom-0 z-50 left-0 transition duration-200 ${isNoteOpen ? 'translate-y-0' : 'translate-y-full'}`}>
            <p className='uppercase text-xs'>Add order note</p>
            <form action="" className='space-y-4 pr-5'>
                <Textarea rows={5} className="border w-full" />
                <Button className='h-10 w-full text-xs'>SAVE</Button>
            </form>
        </div>
    </>
  )
}

import FlashMessage from '@/components/flashmessage'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@headlessui/react'
import React from 'react'

export default function Contact() {
  return (
     <Layout>
       <div className='px-5 pt-15 pb-3 flex flex-col gap-10'>
        <div className='flex flex-col items-center gap-5 '>
          <h1 className='text-3xl'>CONTACT US</h1>
          <p className='text-center text-xs'>Operating hours: Monday – Saturday (10am -10pm)<br/> Sunday (12pm-10pm)</p>
        </div>
        <form action="" className='flex flex-col gap-5 '>
          <Input type='text' placeholder='Name' className='text-xs h-12' />
          <Input type='email' placeholder='Email' className='text-xs h-12' />
          <Input type='number' placeholder='Phone number'className='text-xs h-12' />
          <Textarea rows={10} placeholder='Comment' className='w-full border p-3 text-xs' />
          <Button className='h-12'>SEND MESSAGE</Button>
        </form>
       </div>
     </Layout>
  )
}

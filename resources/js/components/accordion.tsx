import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { Plus, Minus } from 'lucide-react';
import { Link } from '@inertiajs/react';

const Accordion = () => {

  return (
    <div className="w-full max-w-md mx-auto my-8">
        <Disclosure as="div" className="accordion-item border-t border-gray-700 py-5">
          {({ open }) => (
            <>
              <Disclosure.Button
                className="w-full text-left focus:outline-none focus:ring-0 transition-colors flex justify-between items-center rounded-md"
              >
                <span className="text-xl font-medium py-1">QUICK LINKS</span>
             
                {!open ?
                <Plus /> :
                <Minus />
                }
              </Disclosure.Button>
              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-y-0"
                enterTo="opacity-100 scale-y-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 scale-y-100"
                leaveTo="opacity-0 scale-y-0"
              >
                <Disclosure.Panel
                  className="py-4 text-white rounded-md mt-1"
                >
                  <div className='flex flex-col gap-3 text-xs'>
                   <Link href={'/'}> <p>HOME</p></Link>
                   <Link href={'/screens/about'}> <p>ABOUT</p></Link>
                   <Link href={'/screens/contact'}> <p>CONTACT</p></Link>
                   <Link href={'/screens/faq'}> <p>FAQ</p></Link>
                </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="accordion-item border-t border-gray-700 py-5">
          {({ open }) => (
            <>
              <Disclosure.Button
                className="w-full text-left focus:outline-none focus:ring-0 transition-colors flex justify-between items-center rounded-md"
              >
                <span className="text-xl font-medium py-1">SHOP</span>
             
                {!open ?
                <Plus /> :
                <Minus />
                }
              </Disclosure.Button>
              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-y-0"
                enterTo="opacity-100 scale-y-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 scale-y-100"
                leaveTo="opacity-0 scale-y-0"
              >
                <Disclosure.Panel
                  className="py-4 text-white rounded-md mt-1"
                >
                  <Link href={'/collections/new-in'}><p className='text-xs'>SHOP ALL</p></Link>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
    </div>
  );
};

export default Accordion;
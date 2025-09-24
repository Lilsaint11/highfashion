import Layout from '@/components/layout'
import { Disclosure, Transition } from '@headlessui/react';
import { Plus, Minus } from 'lucide-react';
import { Link } from '@inertiajs/react';


export default function Faq() {
    const items1 = [
        { 
            title: 'What is HIGH FASHION by JOL known for?', 
            content: 'Highfashionbyjol is known for its luxurious and fashionable clothing and accessories. We strive to make sure that all of our products are of the highest quality and are designed with comfort and style in mind. Our products are designed with the modern customer in mind, providing them with a range of chic and timeless pieces.', 
            id: 1
         },

        { 
            title: 'Where can I buy HIGH FASHION by JOL products?',
            content: 'Highfashionbyjol products can be purchased on our website, our social media platforms, and the physical store.', 
            id: 2
        },
        { 
            title: 'Do you offer international shipping?', 
            content: 'Yes, we do offer international shipping for our products. Please refer to our website for a full list of countries we ship to and the associated shipping costs.', 
            id: 3
        },
        { 
            title: 'What is your return policy?', 
            content: 'Our return policy is simple and straightforward. For customers within Nigeria, you have 48 hours from the date of delivery to return the item in good condition for a refund or exchange. For international customers, you have a generous window of 7 working days for returns from the date of delivery.', 
            id: 4
        },
        { 
            title: 'How can I find the right size for my clothing?', 
            content: 'We have a comprehensive size guide on our website to help you find the right size for your clothing. Please refer to our size guide for more information.', 
            id: 5
        },
        {
            title: 'What payment methods do you accept?', 
            content: 'We accept various payment methods, including debit cards,bank transfer, cryptocurrency and secure online payment options. The available payment methods will be displayed during the checkout process.', 
            id: 6
        },
        { 
            title: 'Are there any sustainable practices or initiatives at Highfashionbyjol?', 
            content: 'We accept various payment methods, including debit cards,bank transfer, cryptocurrency and secure online payment options. The available payment methods will be displayed during the checkout process.', 
            id: 7
        },
        {
            title: 'How can I stay updated on new collections and promotions?', 
            content: 'The best way to stay updated on our new collections and promotions is to sign up for our newsletter. You can also follow us on our social media channels for the latest updates.', 
            id: 8
        },
        {
            title: 'Opening Hours', 
            content: 'Our store is open seven days a week to serve you. We are open from Monday to Saturday from 10am to 10pm, and on Sunday from 12noon to 10pm. We look forward to seeing you soon!', 
            id: 9
        },
      ];

      const items2 = [
        { 
            title: 'REFUND/EXCHANGE', 
            content: 'At Highfashionbyjol, we understand that sometimes customers may need to return an item. That’s why we offer a 10-day return policy. If you’ve purchased an item from us and it’s within 10 days of the purchase, you’re eligible for a refund or exchange. In order for us to process your return, the item must be in its original condition, unworn and with all tags attached. Additionally, you must provide proof of purchase. Once we receive your return, we will inspect it and notify you that we have received it. We will also notify you of the approval or rejection of your refund. If approved, the refund will be processed within 7 working days, and a credit will be applied to your credit card or original method of payment. Please note that you are responsible for paying your own shipping costs when returning the item. Shipping costs are non-refundable. We hope this helps clarify our return policy. If you have any questions or concerns, please don’t hesitate to contact us.', 
            id: 1
         },

        { 
            title: 'DELIVERY',
            content: 'We provide prompt and efficient delivery services for our valued customers:>Within Lagos, Nigeria: Enjoy same-day delivery for orders within Lagos, Nigeria. Place your order before 4PM to avail of this service.Outside Lagos: Expect your order to arrive within 3-4 working days for destinations outside Lagos but within Nigeria.International Shipping: For international orders outside Nigeria,it takes up to 7 working days for delivery.Please note that delivery times may vary due to unforeseen circumstances, customs processes, or extreme weather conditions. We will provide you with a tracking number to keep you informed of your shipment’s status. For any inquiries or assistance, our customer support team is always available to help.', 
            id: 2
        },
        { 
            title: 'PRIVACY POLICY', 
            content: 'We respect your privacy and are committed to protecting your personal information. Our privacy policy outlines how we collect, use, and safeguard your data. Rest assured that any information you provide will be handled with the utmost confidentiality and used solely for the purpose of enhancing your shopping experience.', 
            id: 3
        },
        { 
            title: 'Terms and Conditions', 
            content: 'Our terms and conditions govern the use of our website and the interactions between High Fashion by JOL and its customers. By accessing and using our website, you agree to comply with these terms, including intellectual property rights, product availability, and liability limitations.', 
            id: 4
        },
        { 
            title: 'Size Guide and Styling Tips', 
            content: 'To ensure the perfect fit, refer to our size guide for comprehensive measurements. Additionally, explore our styling tips and outfit ideas to effortlessly elevate your look.', 
            id: 5
        },
        {
            title: 'Authenticity Assurance', 
            content: 'Our products are 100% authentic and crafted with utmost care. Every piece bears the hallmark of High Fashion by JOL’s superior craftsmanship. Sustainability and Ethics: We are committed to sustainable practices and ethical sourcing. Our efforts encompass eco-friendly materials, responsible manufacturing, and supporting fair labor standards.', 
            id: 6
        },
        { 
            title: 'CUSTOMER CARE', 
            content: 'Our customer care team is here to assist you with any queries or assistance you may require. Contact us via phone, email and social media platforms, and we’ll be delighted to help.', 
            id: 7
        },
        {
            title: 'High Fashion Family Benefits', 
            content: 'Join our exclusive family for access to exclusive perks, early collection previews, special promotions, feauture on our family page on our social media platforms and invitations to exclusive events.', 
            id: 8
        },
      ];
  return (
     <Layout>
        <div className='flex flex-col gap-5 items-center my-12'>
            <h1 className='text-3xl'>FAQS</h1>
            <div className="w-full max-w-md mx-auto my-4 border-b">
                {items1.map((item)=>(
                        <Disclosure as="div" className="accordion-item border-t py-3">
                        {({ open }) => (
                            <>
                            <Disclosure.Button
                                className="w-full text-left focus:outline-none focus:ring-0 transition-colors flex justify-between items-center rounded-md"
                            >
                                <span className="text-[13px]  py-1  uppercase">{item.title}</span>
                            
                                {!open ?
                                <Plus className='font-medium w-[16px]' /> :
                                <Minus className='font-medium w-[16px]' />
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
                                className="py-4 rounded-md mt-1 text-xs leading-5"
                                >
                                    {item.content}
                                </Disclosure.Panel>
                            </Transition>
                            </>
                        )}
                        </Disclosure>
                ))}
            </div>
        </div>
        <div className='flex flex-col gap-5 items-center mt-12 mb-0'>
            <h1 className='text-3xl'>POLICIES</h1>
            <div className="w-full max-w-md mx-auto my-4 border-b">
                {items2.map((item)=>(
                        <Disclosure as="div" className="accordion-item border-t py-3">
                        {({ open }) => (
                            <>
                            <Disclosure.Button
                                className="w-full text-left focus:outline-none focus:ring-0 transition-colors flex justify-between items-center rounded-md"
                            >
                                <span className="text-[13px]  py-1  uppercase">{item.title}</span>
                            
                                {!open ?
                                <Plus className='font-medium w-[16px]' /> :
                                <Minus className='font-medium w-[16px]' />
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
                                className="py-4 rounded-md mt-1 text-xs leading-5"
                                >
                                    {item.content}
                                </Disclosure.Panel>
                            </Transition>
                            </>
                        )}
                        </Disclosure>
                ))}
            </div>
        </div>
     </Layout>
  )
}

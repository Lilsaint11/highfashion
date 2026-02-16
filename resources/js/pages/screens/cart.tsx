import ClothCard from '@/components/clothCard'
import Layout from '@/components/layout'
import OrderNote from '@/components/orderNote'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash, X } from 'lucide-react'
import React, { useState } from 'react'
import { Disclosure, Textarea, Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react'
import ProductHoverImage from '@/components/productHover'
import CartSlide from '@/components/cartSlide'
import { useForm, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';


interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    selected_color:string;
    selected_size:string;
    product: {
        id: number;
        name: string;
        price: number;
        // Add other product fields as needed, e.g., image_url: string; description: string;
    };
    // Add other cart item fields if needed, e.g., subtotal: number;
}

export default function Cart() {
    const { cart } = usePage<{ cart: { items: CartItem[]; count: number; total: number } }>().props;
    const pageProps = usePage().props;
    console.log('Logged-in User ID:', pageProps.auth?.user?.id);

    const total = cart?.total ?? 0;

    const products = [
        {
            id:1,
            name: "HF X BURNA SLEEVELESS TEE",
            price: 210.26,
            colors: 3,
            main_image:"/images/hf1.webp",
            left_third_image:"/images/hf11.webp",
            middle_third_image:"/images/hf12.webp",
            right_third_image:"/images/hf13.webp",
        },
        {
            id:2,
            name: "HF X BURNA SLEEVELESS TEE",
            price: 210.26,
            colors: 3,
            main_image:"/images/hf2.webp",
            left_third_image:"/images/hf21.webp",
            middle_third_image:"/images/hf22.webp",
            right_third_image:"/images/hf23.webp"
        },
        {
            id:3,
            name: "HF X BURNA SLEEVELESS TEE",
            price: 210.26,
            colors: 3,
            main_image:"/images/hf3.webp",
            left_third_image:"/images/hf31.webp",
            middle_third_image:"/images/hf32.webp",
            right_third_image:"/images/hf33.webp"
        },
        {
            id:4,
            name: "HF X BURNA SLEEVELESS TEE",
            price: 210.26,
            colors: 3,
            main_image:"/images/hf4.webp",
            left_third_image:"/images/hf41.webp",
            middle_third_image:"/images/hf42.webp",
            right_third_image:"/images/hf43.webp"
        }
    ]

  
    const updateForm = useForm({});
  
    const handleRemoveItem = (cartItemId: number) => {
        if (confirm('Are you sure you want to remove this item from your cart?')) {
            router.delete('/cart/remove', {
                data: {
                    cart_item_id: cartItemId  // ← This will be sent correctly
                },
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    console.log('Item removed successfully');
                    // Optional: instant update for mini-cart
                    router.reload({ only: ['cart'] });
                },
                onError: (errors) => {
                    console.error('Remove errors:', errors);
                    alert('Failed to remove item: ' + Object.values(errors).join(' '));
                },
            });
        }
        console.log(cartItemId)
    };

    const handleUpdateQuantity = (cartItemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
    
        router.post('/cart/update-quantity', {
            cart_item_id: cartItemId,
            quantity: newQuantity,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                console.log('Quantity updated');
                // Instant update for mini-cart and total
                router.reload({ only: ['cart'] });
            },
            onError: (errors) => {
                console.error(errors);
                alert('Failed to update quantity: ' + Object.values(errors).join(' '));
            },
        });
    };
    

  return (
      <Layout>
        <div className='mt-5 overflow-x-hidden w-screen '>
        <style>{`
        .product-container {
            position: relative;
            overflow: hidden;
        }
        
        .quick-view {
            transition: transform 0.3s ease-in-out;
        }
        .product-container:hover .quick-view {
            transform: translateY(-2.5rem);
        }
        .btn-container {
            position: relative;
            overflow: hidden;
          }
          .btn-container::before {
              content: '';
              position: absolute;
              top: -25%; /* Start below the button */
              left: -1%;
              width: 120%;
              height: 180%;
              background: black;
              transition: top 0.3s ease-in-out;
              z-index: -1;
              rotate:3deg;
  
            }
            .btn-container:hover::before {
              top: -205%; /* Slide up to cover the button */
            }
        `}</style>
            <div className='bg-white w-full h-full '>
                <div className=''>
                    <div className='flex flex-col gap-10 px-5 py-5 '>
                        <p className='text-xl'>Your cart</p>
                        <div className='flex justify-between text-sm border-b pb-2'>
                            <p>Product</p>
                            <p>Total</p>
                        </div>
                    </div>
                    
                    <div className="space-y-7 mt-2 px-5">
                        {cart.items?.length === 0 ? (
                            <div className="flex items-center justify-center py-10">
                                <p className="text-gray-500 text-lg">Your cart is empty.</p>
                            </div>
                        ) : (
                            cart.items?.map((item) => (
                                <div key={item.id} className="flex gap-5 items-start bg-white rounded-lg shadow-sm p-4">
                                    {/* Product Image */}
                                    <img
                                        src={item.product.image_url || '/images/placeholder.jpg'}  // Use correct field + fallback
                                        alt={item.product.name}
                                        className="w-24 h-32 object-cover rounded-md"
                                    />

                                    {/* Product Details */}
                                    <div className="flex-1 space-y-3 uppercase">
                                        <h1 className="text-lg font-bold">{item.product.name}</h1>

                                        {/* Color & Size */}
                                        {item.selected_color && (
                                            <p className="text-xs text-gray-600">Color: {item.selected_color}</p>
                                        )}
                                        {item.selected_size && (
                                            <p className="text-xs text-gray-600">Size: {item.selected_size}</p>
                                        )}

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-6">
                                            <div className="border flex items-center gap-4 px-3 py-1 rounded-md">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="disabled:text-gray-300"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>

                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => {
                                                        const val = Math.max(1, parseInt(e.target.value) || 1);
                                                        handleUpdateQuantity(item.id, val);
                                                    }}
                                                    min="1"
                                                    className="w-12 text-center outline-none"
                                                />

                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Remove Item */}
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="text-red-500 hover:text-red-700 transition"
                                            >
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right">
                                        <p className="text-lg font-semibold">
                                            ${(item.product.base_price * item.quantity).toFixed(2)} USD
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            ${item.product.base_price} × {item.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className='bg-white w-full  mt-8 '>
                        <Disclosure as="div" className="accordion-item border-b py-5">
                            {({ open }) => (
                                <>
                                <Disclosure.Button
                                    className="w-full text-left focus:outline-none focus:ring-0 transition-colors flex justify-between items-center rounded-md px-4 "
                                >
                                <p className='text-sm '>Add notes</p>
                                
                                    {!open ?
                                    <Plus className='w-[20px]' /> :
                                    <Minus className='w-[20px]' />
                                    }
                                </Disclosure.Button>
                                <Transition
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-100 -translate-y-50"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 -translate-y-50"
                                    leaveTo="opacity-100 translate-y-0"
                                >
                                    <Disclosure.Panel
                                    className="py-4 rounded-md mt-1 px-4"
                                    >
                                        <form action="" className='space-y-4 pr-5'>
                                            <Textarea rows={5} className="border w-full" />
                                        </form>
                                    </Disclosure.Panel>
                                </Transition>
                                </>
                            )}
                        </Disclosure>
                        <div className='px-4 flex flex-col items-center gap-5 mt-5'>
                           <Link href='/checkout' className='w-full'> 
                            <span className='w-full btn-container'>
                                <Button className='w-full h-12 text-sm  border rounded-none'>CHECKOUT . ${total.toFixed(2)} USD</Button>
                            </span>
                            </Link>
                            <p className='text-sm'>Taxes and shipping calculated at checkout</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center mt-20 p-5 pb-10  space-y-8 '> 
                        <div className='flex flex-col items-center'>
                            <p className='uppercase text-2xl'>You may also like</p>
                            <p className='text-sm'>Describe your featured collection here</p>
                        </div>
                        <div className='w-full overflow-x-auto scrollbar-hidden scroll-smooth'>
                            <div className='flex w-max overflow-x-scroll gap-2 '>
                                {products.map((product)=>(
                                     <Link href={`/products/${product.id}`}>
                                     <div className='w-56 flex flex-col items-center'>
                                       <ProductHoverImage  product={{
                                         main: product.main_image,
                                         leftThird: product.left_third_image,
                                         middleThird: product.middle_third_image,
                                         rightThird: product.right_third_image,
                                         }}
                                         alt={product.name}
                                         className="w-full"  
                                     />
                                         <div className="flex flex-col gap-2 items-center mt-5">
                                             <p className='text-xs font-bold'>{product.name}</p>
                                             <p className='text-xs'>${product.price} USD</p>
                                             <p className='text-xs'>Available in {product.colors} colors</p>
                                         </div>
                                     </div>
                                 </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center mt-13 p-5 pb-10  space-y-8 '> 
                        <div className='flex flex-col items-center'>
                            <p className='uppercase text-2xl'>Recently viewed products</p>
                            <p className='text-sm'>Describe your recently viewed products here</p>
                        </div>
                        <div className='w-full overflow-x-auto scrollbar-hidden scroll-smooth'>
                            <div className='flex w-max overflow-x-scroll gap-2 '>
                                {products.map((product)=>(
                                    <Link href={`/products/${product.id}`}>
                                    <div className='w-56 flex flex-col items-center'>
                                        <ProductHoverImage  product={{
                                            main: product.main_image,
                                            leftThird: product.left_third_image,
                                            middleThird: product.middle_third_image,
                                            rightThird: product.right_third_image,
                                            }}
                                            alt={product.name}
                                            className="w-full"  
                                        />
                                        <div className="flex flex-col gap-2 items-center mt-5">
                                            <p className='text-xs font-bold'>{product.name}</p>
                                            <p className='text-xs'>${product.price} USD</p>
                                            <p className='text-xs'>Available in {product.colors} colors</p>
                                        </div>
                                    </div>
                                </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                </div>
        </div>
        </div>
    </Layout>
  )
}

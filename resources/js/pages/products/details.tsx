import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Disclosure, Transition } from '@headlessui/react'
import { Link,router, useForm } from '@inertiajs/react'
import { Copy, Edit, Facebook, MessageCircleHeart, Minus, Package, Phone, Plus, Puzzle, Ruler, Trash, Twitter, Waves } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';


interface Product {
    id: number;
    name: string;
    price: number;
    colors: string[];
    sizes: string[];
    quantity: number;
    images: string[];
    // main_image: string;
    // left_third_image: string | null;
    // middle_third_image: string | null;
    // right_third_image: string | null;
}

interface ItemSize {
    name: string;
    available: boolean;
}

export default function Details({product}:{ product: Product }) {
    const [colorInput, setColorInput] = useState(product.colors.join(', '));
    const [sizeInput, setSizeInput] = useState(product.sizes.join(', '));
    const [imageInput, setImageInput] = useState(
        Array.isArray(product.images) ? product.images.join(', ') : '' 
    );
    const { data: editData, setData: setEditData, put, reset, errors: editErrors, processing: editProcessing } = useForm({
        name: product.name,
        base_price: product.price.toString(),
        colors: product.colors,
        sizes: product.sizes,
        quantity: product.quantity.toString(),
        images: product.images,
        // main_image: product.main_image.toString(),
        // left_third_image: product.left_third_image.toString(),
        // middle_third_image: product.middle_third_image.toString(),
        // right_third_image: product.right_third_image.toString(),
    });
    const items = [
        {
            name: 'Fleece Hoodie Pants - Orange',
            price:213.18,
            color: 'orange',
            size:  'xxxl',
            quantity: 1,
            image: '/images/hf21.webp'
        },
        {
            name: 'HF X 101 AVENUE HOODIE PANTS',
            price:213.18,
            color: 'orange',
            size:  'xxxl',
            quantity: 1,
            image: '/images/hf31.webp'
        },
        {
            name: 'Fleece Hoodie Pants - Orange',
            price:213.18,
            color: 'orange',
            size:  'xxxl',
            quantity: 1,
            image: '/images/hf21.webp'
        },
        {
            name: 'HF X 101 AVENUE HOODIE PANTS',
            price:213.18,
            color: 'orange',
            size:  'xxxl',
            quantity: 1,
            image: '/images/hf31.webp'
        }
    ]
    const items1 = [
        { 
            title: 'What payment methods can I use?', 
            content: 'We offer 35 different payment methods including major providers like Mastercard, Visa, PayPal, American Express and Diners as well as many different local payment methods including Klarna, iDEAL, AliPay, Sofort, giropay, and many more.', 
            id: 1
         },

        { 
            title: 'Can I purchase items with another currency?',
            content: 'Yes, you may select a currency based on your personal preference. When you select your country in the country selector on the upper right of the website or are taken directly to your country’s version of the website, you will see prices listed in the regional currency.', 
            id: 2
        },
        { 
            title: 'Can I make changes to my order after it’s been placed?', 
            content: 'We do everything we can to fulfill orders quickly and unfortunately cannot make updates after an order has been placed. These changes include removing or adding products and/or changing the delivery address. If a mistake has been made with your order information, it’s quickest to create a new order with the correct information and then let our Customer Service.', 
            id: 3
        },
        { 
            title: 'Do you offer e-gift cards for international customers?', 
            content: 'E-gift cards are only available to customers shipping within the U.S.', 
            id: 4
        },
        { 
            title: 'How Do I Set Up A Subscription Order?', 
            content: 'We will deliver products to you as soon as reasonably possible. Orders are usually dispatched between 1-3 days from the date of the order being placed. Please contact us our customer service team if your delivery has not been received within the dates described.', 
            id: 5
        },
        {
            title: 'How To Return My Items?', 
            content: 'We do not currently offer free returns to overseas customers. You will therefore need to cover all costs of returning any items to us yourself. We advise that you mark your package ‘returned goods’ to avoid further duties. Remember: We strongly recommend that you return any items via a registered trackable service and obtain and retain proof of posting as we do not accept responsibility for items that fail to arrive with us.', 
            id: 6
        },
      ];
    const [itemQuantity, setItemQuantity] = useState(1)
    const [itemSizes, setItemSizes] = useState<ItemSize[]>([
        {name:'s', available:false},
        {name:'m', available:false},
        {name:'l', available:false},
        {name:'xl', available:false},
        {name:'2xl', available:false},
        {name:'3xl', available:false}
    ])
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const addQuant =()=> {
        if(itemQuantity < product.quantity){
            setItemQuantity(itemQuantity+1)
        }
    }
    const minusQuant =()=> {
        if(itemQuantity > 1){
            setItemQuantity(itemQuantity-1)
        }
    }
    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        const imagesArray = imageInput.split(',').map((item) => item.trim()).filter(Boolean);
        setEditData('images', imagesArray);
    
        console.log('Form data before submit:', editData);
    
        put(`/products/${product.id}`, {
            onSuccess: () => {
                console.log('Product updated!');
            },
            onError: (errors) => {
                console.log('Update error:', errors);
            },
        });
        console.log('Form data after submit:', editData);
    };
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
            router.delete(`/products/${product.id}`, { 
                onSuccess: () => {
                    console.log('Product deleted!');
                },
                onError: (errors) => {
                    console.log('Delete error:', errors);
                },
            });
        }
    };
    

    useEffect(() => {
        const updatedSizes = [...itemSizes]; // Clone to avoid direct mutation
        updatedSizes.forEach((size) => {
            size.available = product.sizes.includes(size.name);
        });
        setItemSizes(updatedSizes);
        console.log(updatedSizes); 
        const firstAvailableSize = updatedSizes.find((size) => size.available);
        if (firstAvailableSize && !selectedSize) {
            setSelectedSize(firstAvailableSize.name);
        }
        console.log(product)
    }, [product.sizes]); 
    useEffect(() => {
        if (product.colors.length > 0 && !selectedColor) {
            setSelectedColor(product.colors[0]); // Default to first color
        }
        console.log(product)
    }, [product.colors, selectedColor]);

    const handleSizeClick = (sizeName: string) => {
        if (itemSizes.find((size) => size.name === sizeName)?.available) {
            setSelectedSize(sizeName);
        }
    };
    const handleColorClick = (colorName: string) => {
        setSelectedColor(selectedColor === colorName ? null : colorName); // Toggle if needed
    };
 
   

    // Sync edit inputs with form data
    useEffect(() => {
        setEditData('colors', colorInput.split(',').map((item) => item.trim()).filter(Boolean));
    }, [colorInput]);

    useEffect(() => {
        setEditData('sizes', sizeInput.split(',').map((item) => item.trim()).filter(Boolean));
    }, [sizeInput]);

    useEffect(() => {
        const imagesArray = imageInput.split(',').map((item) => item.trim()).filter(Boolean);
        console.log('Images input sync:', { imageInput, imagesArray }); 
        setEditData('images', imagesArray);
    }, [imageInput]);


    
  return (
    <div>
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
        `}</style>
        <Layout>
            <div className='flex items-center gap-2 text-xs p-3'>
               <Link href='/'> <p className='underline'>Home</p></Link>
                <p>/</p>
                <p>{product.name}</p>
            </div>
            <div>
                <img src={product.images[0]} alt="" className='w-full h-full' />
            </div>
            <div className='uppercase mt-10 flex flex-col gap-5 px-2'>
                <div className='flex w-full justify-between'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-[#a1a1a1] text-xs'>High Fashion by J.O.L</p>
                        <p className='text-xl uppercase'>{product.name}</p>
                        <p>₦{product.price}</p>
                    </div>
                    <div className='flex items-center '>
                        <Trash className='w-[18px] mr-5 text-red-500 cursor-pointer' onClick={handleDelete} />
                        <Dialog>
                            <DialogTrigger asChild>
                                    <Edit className="w-4 h-4 mr-2 cursor-pointer" />
                            </DialogTrigger>
                            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto p-6"> {/* Scrollable: height limit + overflow */}
                                <DialogHeader>
                                    <DialogTitle>Edit Product</DialogTitle>
                                    <DialogDescription>Update the product details below.</DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleEditSubmit} className="flex flex-col gap-4"> {/* Gap for spacing during scroll */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium uppercase text-[#a1a1a1]">
                                            Name
                                        </label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={editData.name}
                                            onChange={(e) => setEditData('name', e.target.value)}
                                            className="mt-1 uppercase"
                                            placeholder="e.g., HF X 101 AVENUE HOODIE TOP"
                                        />
                                        {editErrors.name && <p className="text-red-500 text-xs mt-1">{editErrors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="base_price" className="block text-sm font-medium uppercase text-[#a1a1a1]">
                                            Price (₦)
                                        </label>
                                        <Input
                                            id="base_price"
                                            type="number"
                                            step="0.01"
                                            value={editData.base_price}
                                            onChange={(e) => setEditData('base_price', e.target.value)}
                                            className="mt-1"
                                            placeholder="e.g., 480000.00"
                                        />
                                        {editErrors.base_price && <p className="text-red-500 text-xs mt-1">{editErrors.base_price}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="colors" className="block text-sm font-medium uppercase text-[#a1a1a1]">
                                            Colors (comma-separated)
                                        </label>
                                        <Input
                                            id="colors"
                                            type="text"
                                            value={colorInput}
                                            onChange={(e) => setColorInput(e.target.value)}
                                            className="mt-1 uppercase"
                                            placeholder="e.g., BLACK,GREY,WHITE"
                                        />
                                        {editErrors.colors && <p className="text-red-500 text-xs mt-1">{editErrors.colors}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="sizes" className="block text-sm font-medium uppercase text-[#a1a1a1]">
                                            Sizes (comma-separated)
                                        </label>
                                        <Input
                                            id="sizes"
                                            type="text"
                                            value={sizeInput}
                                            onChange={(e) => setSizeInput(e.target.value)}
                                            className="mt-1 uppercase"
                                            placeholder="e.g., S,M,L,XL,2XL,3XL"
                                        />
                                        {editErrors.sizes && <p className="text-red-500 text-xs mt-1">{editErrors.sizes}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="quantity" className="block text-sm font-medium uppercase text-[#a1a1a1]">
                                            Quantity
                                        </label>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            value={editData.quantity}
                                            onChange={(e) => setEditData('quantity', e.target.value)}
                                            className="mt-1"
                                            placeholder="e.g., 10"
                                        />
                                        {editErrors.quantity && <p className="text-red-500 text-xs mt-1">{editErrors.quantity}</p>}
                                    </div>

                                
                                    <div>
                <label htmlFor="images" className="block text-sm font-medium uppercase text-[#a1a1a1]">
                    Images (comma-separated paths, e.g., /images/hf41.webp,/images/hf42.webp)
                </label>
                <Input
                    id="images"
                    type="text"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)} // Updates imageInput state
                    className="mt-1"
                    placeholder="e.g., /images/hf41.webp,/images/hf42.webp" // Clearer placeholder
                />
                {editErrors.images && <p className="text-red-500 text-xs mt-1">{editErrors.images}</p>}
            </div>

                                    <DialogFooter>
                                        <Button type="button" onClick={() => reset()} variant="outline">
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={editProcessing}>
                                            Update Product
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div>
                    <p className='text-sm'><span className='font-bold'>Color:</span>{product.colors[0]}</p>
                    <div className="flex mt-3">
                        {product.colors.map((color, index) => (
                            <div
                                key={index}
                                className={`
                                    border p-2 w-12 h-12 flex items-center justify-center cursor-pointer
                                    ${selectedColor === color ? 'border-black' : 'border-gray-300'}
                                `}
                                onClick={() => handleColorClick(color)}
                            >
                                <div
                                    className={`
                                        rounded-full h-5 w-5 flex items-center justify-center
                                        ${color === 'black' ? 'bg-black' : 
                                        color === 'white' ? 'bg-white border text-white' : 
                                        color === 'grey' ? 'bg-[#eee] text-[#eee]' : 
                                        color === 'orange' ? 'bg-orange-500 text-orange-500' : 
                                        color === 'purple' ? 'bg-purple-500 text-purple-500' : 
                                        'bg-slate-500'}  
                                    `}
                                >
                                    .
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='flex justify-between'>
                        <p className='text-sm'>SIZE:{product.sizes[0]}</p>
                        <div className='flex items-center gap-2'>
                            <Ruler className='w-[18px]' />
                            <p className='text-xs'>Sizing guide</p>
                        </div>
                    </div>
                    <div className="flex">
                    {itemSizes.map((size, index) => (
                            <div
                                key={index}
                                className={`
                                    border p-3 w-12 flex items-center justify-center text-sm cursor-pointer
                                    ${!size.available ? 'text-[#d5d5d5] cursor-not-allowed' : 'bg-white cursor-pointer'}
                                    ${selectedSize === size.name ? 'border-black' : 'border-gray-300'}
                                `}
                                onClick={() => handleSizeClick(size.name)}
                            >
                                <p className="uppercase">{size.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className='my-7 flex flex-col gap-5'>
                        <div className='flex gap-3 h-12'>
                            <div className='flex p-2 border w-28 justify-between text-sm items-center'>
                                <Minus className='w-[20px] cursoor-pointer'onClick={minusQuant} />
                                <p>{itemQuantity}</p>
                                <Plus className='w-[20px] cursoor-pointer' onClick={addQuant} />
                            </div>
                           <Button className='w-full h-full bg-white text-black border rounded-none text-xs  font-bold hover:text-white'>ADD TO CART</Button>
                        </div>
                        <Button className='h-12 rounded-none text-xs  font-bold'>BUY IT NOW</Button>
                    </div>
                    <div className='flex text-sm gap-4 mb-7'>
                        <div className='flex items-center  gap-1'>
                            <Puzzle className='w-[24px]' />
                            <p className='border-b'>Materials</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Package className='w-[24px] ' />
                            <p className='border-b'>Shipping & Returns</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Waves className='w-[24px]' />
                            <p className='border-b'>Care Guide</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-6'>
                        <Facebook className='w-[16px]' />
                        <Twitter className='w-[16px]' />
                        <MessageCircleHeart className='w-[16px]' />
                        <Phone className='w-[16px]' />
                        <Copy className='w-[16px]' />
                    </div>
                    <div className='flex flex-col  my-15 p-5 pb-10  space-y-8 '> 
                        <div className='flex flex-col'>
                            <p className='uppercase text-2xl font-bold'>YOU MAY ALSO LIKE</p>
                            <p className='text-[11px]'>Combine your style with these products</p>
                        </div>
                        <div className='w-full overflow-x-auto scrollbar-hidden scroll-smooth'>
                            <div className='flex w-max overflow-x-scroll gap-2 '>
                                {items.map((item)=>(
                                    <div className='w-60 flex flex-col items-center gap-5'>
                                    <div className='product-container relative'>
                                        <img src={item.image} alt="" className='w-64 object-cover h-64' />
                                        <div className={`bg-[rgba(0,0,0,0.8)] text-white flex justify-center items-center text-[14px] h-10 absolute w-full transition duration-300 -translate-y-10' : 'translate-y-0 quick-view`}>
                                            <p>Quick view</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center">
                                        <p className='text-xs font-bold'>{item.name}</p>
                                        <p className='text-xs'>${item.price} USD</p>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 items-center my-12'>
                        <h1 className='text-3xl'>F.A.Q.</h1>
                        <p className='text-xs'>They appreciate cut and details, things that aren't so obvious.</p>
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
                </div>
            </div>
        </Layout>
    </div>
  )
}

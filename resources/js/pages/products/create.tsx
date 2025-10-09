import { useForm } from '@inertiajs/react';
import { Input } from '../../components/ui/input'; // Adjust path based on your setup
import { Button } from '../../components/ui/button'; // Add button if installed
import { useEffect, useState } from 'react';
import Layout from '@/components/layout';


interface ProductFormData {
    name: string;
    base_price: string;
    colors: string[];
    sizes: string[];
    quantity: string;
    images: string[];
}

export default function ProductCreate() {
    const { data, setData, post, errors, processing } = useForm<ProductFormData>({
        name: '',
        base_price: '',
        colors: [], // Store as array
        sizes: [],
        quantity: '',
        images: [],
    });

    const [colorInput, setColorInput] = useState('');
    const [sizeInput, setSizeInput] = useState('');
    const [imageInput, setImageInput] = useState('');

    // Sync input fields with form data
    useEffect(() => {
        setData('colors', colorInput.split(',').map((item) => item.trim()).filter(Boolean));
    }, [colorInput]);

    useEffect(() => {
        setData('sizes', sizeInput.split(',').map((item) => item.trim()).filter(Boolean));
    }, [sizeInput]);

    useEffect(() => {
        setData('images', imageInput.split(',').map((item) => item.trim()).filter(Boolean));
    }, [imageInput]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/products', {
            onSuccess: () => {
                console.log('Product created!');
            },
            onError: (errors) => {
                console.log('Validation errors:', errors);
            },
        });
    };

    return (
        <Layout>
            <div className="container mx-auto px-5 py-8">
                <h1 className="text-xl font-bold uppercase mb-8">Create Product</h1>
                <form onSubmit={handleSubmit} className="w-full mx-auto flex flex-col gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#a1a1a1]">
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1  h-12"
                            placeholder="e.g., HF X 101 Avenue Hoodie Top"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="base_price" className="block text-sm font-medium text-[#a1a1a1]">
                            Price (₦)
                        </label>
                        <Input
                            id="base_price"
                            type="number"
                            step="0.01"
                            value={data.base_price}
                            onChange={(e) => setData('base_price', e.target.value)}
                            className="mt-1 h-12"
                            placeholder="e.g., 480000.00"
                        />
                        {errors.base_price && <p className="text-red-500 text-xs mt-1">{errors.base_price}</p>}
                    </div>

                    <div>
                        <label htmlFor="colors" className="block text-sm font-medium  text-[#a1a1a1]">
                            Colors (comma-separated, e.g., Black,Grey)
                        </label>
                        <Input
                            id="colors"
                            type="text"
                            value={colorInput}
                            onChange={(e) => setColorInput(e.target.value)}
                            className="mt-1 h-12"
                            placeholder="e.g., Black,Grey,White"
                        />
                        {errors.colors && <p className="text-red-500 text-xs mt-1">{errors.colors}</p>}
                    </div>

                    <div>
                        <label htmlFor="sizes" className="block text-sm font-medium  text-[#a1a1a1]">
                            Sizes (comma-separated, e.g., S,M,L)
                        </label>
                        <Input
                            id="sizes"
                            type="text"
                            value={sizeInput}
                            onChange={(e) => setSizeInput(e.target.value)}
                            className="mt-1 h-12"
                            placeholder="e.g., S,M,L,XL,2XL,3XL"
                        />
                        {errors.sizes && <p className="text-red-500 text-xs mt-1">{errors.sizes}</p>}
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium  text-[#a1a1a1]">
                            Quantity
                        </label>
                        <Input
                            id="quantity"
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', e.target.value)}
                            className="mt-1 h-12"
                            placeholder="e.g., 10"
                        />
                        {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                    </div>

                    <div>
                        <label htmlFor="images" className="block text-sm font-medium  text-[#a1a1a1]">
                            Images
                        </label>
                        <Input
                            id="images"
                            type="text"
                            value={imageInput}
                            onChange={(e) => setImageInput(e.target.value)}
                            className="mt-1 h-12"
                            placeholder="e.g., /images/hf41.webp,/images/hf41-angle.webp"
                        />
                        {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
                    </div>

                
                    <Button type="submit" disabled={processing} className="bg-black h-12 cursor-pointer text-white uppercase">
                        Create Product
                    </Button>
                </form>
            </div>
        </Layout>
    );
}
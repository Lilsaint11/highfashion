import { useForm } from '@inertiajs/react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout';

export default function ProductCreate() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        base_price: '',
        colors: '' as any,
        sizes: '' as any,
        quantity: '',
        images: [] as File[],
    });

    const [colorInput, setColorInput] = useState('');
    const [sizeInput, setSizeInput] = useState('');
    const [previews, setPreviews] = useState<string[]>([]);

    const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setData('images', files as any);
        setPreviews(files.map(f => URL.createObjectURL(f)));
    };

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setData('colors', colorInput.split(',').map(s => s.trim()).filter(Boolean) as any);
    //     setData('sizes', sizeInput.split(',').map(s => s.trim()).filter(Boolean) as any);

    //     post('/products', {
    //         forceFormData: true, // required for file uploads
    //     });
    // };

    useEffect(() => {
        setData('colors', colorInput.split(',').map(s => s.trim()).filter(Boolean) as any);
    }, [colorInput]);
    
    useEffect(() => {
        setData('sizes', sizeInput.split(',').map(s => s.trim()).filter(Boolean) as any);
    }, [sizeInput]);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/products', {
            forceFormData: true,
        });
    };

    return (
        <Layout>
            <div className="container mx-auto px-5 py-8">
                <h1 className="text-xl font-bold uppercase mb-8">Create Product</h1>
                <form onSubmit={handleSubmit} className="w-full mx-auto flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#a1a1a1]">Name</label>
                        <Input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 h-12"
                            placeholder="e.g., HF X 101 Avenue Hoodie Top"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#a1a1a1]">Price (₦)</label>
                        <Input
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
                        <label className="block text-sm font-medium text-[#a1a1a1]">Colors (comma-separated)</label>
                        <Input
                            type="text"
                            value={colorInput}
                            onChange={(e) => setColorInput(e.target.value)}
                            className="mt-1 h-12"
                            placeholder="e.g., Black,Grey,White"
                        />
                        {errors.colors && <p className="text-red-500 text-xs mt-1">{errors.colors}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#a1a1a1]">Sizes (comma-separated)</label>
                        <Input
                            type="text"
                            value={sizeInput}
                            onChange={(e) => setSizeInput(e.target.value)}
                            className="mt-1 h-12"
                            placeholder="e.g., S,M,L,XL,2XL"
                        />
                        {errors.sizes && <p className="text-red-500 text-xs mt-1">{errors.sizes}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#a1a1a1]">Quantity</label>
                        <Input
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', e.target.value)}
                            className="mt-1 h-12"
                            placeholder="e.g., 10"
                        />
                        {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#a1a1a1]">Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImages}
                            className="mt-1 w-full border rounded-md p-2 text-sm"
                        />
                        {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}

                        {previews.length > 0 && (
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {previews.map((src, i) => (
                                    <img key={i} src={src} className="w-20 h-20 object-cover rounded border" />
                                ))}
                            </div>
                        )}
                    </div>

                    <Button type="submit" disabled={processing} className="bg-black h-12 cursor-pointer text-white uppercase">
                        {processing ? 'Uploading...' : 'Create Product'}
                    </Button>
                </form>
            </div>
        </Layout>
    );
}
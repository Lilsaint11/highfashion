import { Trash, Minus, Plus } from 'lucide-react'
import { router } from '@inertiajs/react';
interface CardProps {
    id: number;
    name: string;
    price: number;
    color: string;
    size:string;
    quantity:number;
    image:string;
    selected_color:string;
    selected_size:string;
  }

export default function ClothCard({id,name,price,color,size,quantity,image}:CardProps) {
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
    <div className='flex gap-5'>
        <img src={image} alt="" className='w-24 h-28 object-contain' />
        <div className='space-y-2 uppercase'>
            <h1 className='text-md font-bold'>{name}</h1>
            <p className='text-xs'>${price} USD</p>
            <p className='text-xs'>{color}, {size}</p>
            <div className='flex items-center gap-5'>
                <div className='border flex items-center gap-3 p-1'>
                  <button
                      onClick={() => handleUpdateQuantity(id, quantity - 1)}
                      disabled={quantity <= 1}
                      className="disabled:text-gray-300"
                  >
                      <Minus className="w-4 h-4" />
                  </button>

                  <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                          const val = Math.max(1, parseInt(e.target.value) || 1);
                          handleUpdateQuantity(id, val);
                      }}
                      min="1"
                      className="w-12 text-center outline-none"
                  />

                  <button
                      onClick={() => handleUpdateQuantity(id, quantity + 1)}
                  >
                      <Plus className="w-4 h-4" />
                  </button>
                </div>
                  <button
                      onClick={() => handleRemoveItem(id)}
                      className="text-red-500 hover:text-red-700 transition"
                  >
                      <Trash className="w-5 h-5" />
                  </button>
            </div>
        </div>
    </div>
  )
}

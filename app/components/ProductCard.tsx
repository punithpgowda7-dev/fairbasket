'use client';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const taxAmount = product.price * product.transparency.tax;
  const finalPrice = product.price + taxAmount + product.transparency.shipping + product.transparency.fee;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      finalPrice: finalPrice,
      category: product.category
    });
    alert(`${product.title} added to cart!`);
  };

  return (
    <Link href={`/product/${product._id}`} className="group block relative bg-white dark:bg-[#0a0a0a] rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
      
      {/* IMAGE */}
      <div className="aspect-[4/5] overflow-hidden relative bg-gray-100 dark:bg-gray-900">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply dark:mix-blend-normal" 
        />
        
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-lg active:scale-90 z-20"
        >
          <ShoppingBag size={20} />
        </button>
      </div>

      {/* DETAILS */}
      <div className="p-5">
        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">{product.category}</div>
        <h3 className="text-lg font-bold leading-tight mb-3 text-gray-900 dark:text-gray-200 line-clamp-1">{product.title}</h3>
        
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 line-through">Base: ₹{product.price.toLocaleString()}</span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-black dark:text-white">₹{finalPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded border border-green-200 dark:border-green-500/30">
              To Pay
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
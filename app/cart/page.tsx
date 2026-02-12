'use client';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user, setShowLoginModal, setIsForceLogin } = useAuth();
  const [status, setStatus] = useState('idle');

  const grandTotal = cart.reduce((acc, item) => acc + item.finalPrice, 0);

  const handleCheckout = async () => {
    if (!user) {
      setIsForceLogin(true);
      setShowLoginModal(true);
      return;
    }

    setStatus('processing');

    const invoiceItems = cart.map(item => ({
      title: item.title,
      price: item.finalPrice,
      category: item.category
    }));

    try {
      await fetch('/api/email', {
        method: 'POST',
        body: JSON.stringify({ 
          type: 'order', 
          email: user.email, 
          name: user.name || 'Valued Customer',
          address: user.address || 'Registered Address',
          items: invoiceItems
        }),
      });
    } catch (error) {
      console.error("Checkout Error", error);
    }

    setTimeout(() => {
      setStatus('success');
      clearCart();
    }, 2000);
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white flex flex-col items-center justify-center p-4">
        <Navbar />
        <div className="w-24 h-24 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-[0_0_30px_rgba(34,197,94,0.4)]">
          <ShoppingBag size={40} className="text-green-500 dark:text-green-400" />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700 dark:from-green-400 dark:to-emerald-600">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
          We have sent a detailed invoice with Order ID to <strong>{user?.email}</strong>.
        </p>
        <Link 
          href="/" 
          className="mt-8 px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:opacity-80 transition flex items-center gap-2"
        >
          Continue Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white transition-colors duration-300">
      <Navbar />
      
      <div className="pt-32 px-6 max-w-6xl mx-auto pb-20">
        <h1 className="text-4xl font-bold mb-8">Your Cart ({cart.length})</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#0a0a0a] rounded-3xl border border-black/5 dark:border-white/10 shadow-sm">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto flex items-center justify-center mb-6 opacity-50">
              <ShoppingBag size={32} />
            </div>
            <p className="text-gray-500 mb-6 text-lg">Your cart is currently empty.</p>
            <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-900/20">
              Browse Marketplace
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div 
                  key={`${item._id}-${index}`} 
                  className="flex gap-4 bg-white dark:bg-[#0a0a0a] p-4 rounded-2xl border border-black/5 dark:border-white/5 items-center hover:border-black/10 dark:hover:border-white/10 transition group shadow-sm"
                >
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shrink-0 border border-black/5 dark:border-white/5">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500 mix-blend-multiply dark:mix-blend-normal" alt={item.title} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg truncate pr-4 text-gray-900 dark:text-gray-200">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                        title="Remove Item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                      <div className="text-xs text-gray-500">Qty: 1</div>
                      <div className="text-blue-600 dark:text-blue-400 font-bold text-xl">₹{item.finalPrice.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-3xl border border-black/5 dark:border-white/10 sticky top-28 shadow-xl">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-200">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600 dark:text-green-500">Free</span>
                  </div>
                  <div className="h-px bg-black/10 dark:bg-white/10 my-2"></div>
                  <div className="flex justify-between text-black dark:text-white font-bold text-2xl">
                    <span>Total</span>
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 text-right">Includes all taxes & fees</p>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={status === 'processing'}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {status === 'processing' ? (
                    <>Processing...</>
                  ) : (
                    <>Checkout Now <ArrowRight size={18} /></>
                  )}
                </button>
                
                <p className="text-center text-xs text-gray-500 mt-4">
                  Secure Checkout powered by FairBasket
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
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
    if (!user) { setIsForceLogin(true); setShowLoginModal(true); return; }
    setStatus('processing');
    const invoiceItems = cart.map(item => ({ title: item.title, price: item.finalPrice, category: item.category }));
    await fetch('/api/email', { method: 'POST', body: JSON.stringify({ type: 'order', email: user.email, name: user.name, address: user.address, items: invoiceItems }) });
    setTimeout(() => { setStatus('success'); clearCart(); }, 2000);
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white flex flex-col items-center justify-center p-4">
        <Navbar />
        <div className="w-20 h-20 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center mb-6"><ShoppingBag size={32} className="text-green-500" /></div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 text-center mb-8">Invoice sent to {user?.email}</p>
        <Link href="/" className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-sm">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white transition-colors duration-300">
      <Navbar />
      {/* ADDED: padding-top matches navbar height, px-4 prevents edge touching on mobile */}
      <div className="pt-24 px-4 max-w-6xl mx-auto pb-20">
        <h1 className="text-3xl font-bold mb-6">Your Cart ({cart.length})</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#0a0a0a] rounded-3xl border border-black/5 dark:border-white/10">
            <p className="text-gray-500 mb-6">Your cart is empty.</p>
            <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm">Browse Shop</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div key={`${item._id}-${index}`} className="flex gap-4 bg-white dark:bg-[#0a0a0a] p-4 rounded-xl border border-black/5 dark:border-white/5 items-center">
                  {/* Image is responsive now */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm truncate pr-2 text-gray-900 dark:text-gray-200">{item.title}</h3>
                      <button onClick={() => removeFromCart(item._id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <div className="text-xs text-gray-500">{item.category}</div>
                      <div className="text-blue-600 dark:text-blue-400 font-bold text-lg">₹{item.finalPrice.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl border border-black/5 dark:border-white/10 sticky top-24 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Summary</h3>
                <div className="flex justify-between text-xl font-bold mb-6"><span>Total</span><span>₹{grandTotal.toLocaleString()}</span></div>
                <button onClick={handleCheckout} disabled={status === 'processing'} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex justify-center gap-2 text-sm hover:bg-blue-500 transition">
                  {status === 'processing' ? 'Processing...' : 'Checkout Now'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
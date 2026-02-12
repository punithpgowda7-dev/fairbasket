'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';

// Accept price and category now
export default function BuyButton({ product }: { product: any }) {
  const { user, setShowLoginModal, setIsForceLogin } = useAuth();
  const [status, setStatus] = useState('idle');
  const [pendingOrder, setPendingOrder] = useState(false);

  useEffect(() => {
    if (user && pendingOrder) {
      processOrder();
      setPendingOrder(false);
    }
  }, [user]);

  const handleBuyClick = () => {
    if (!user) {
      setPendingOrder(true);
      setIsForceLogin(true);
      setShowLoginModal(true);
    } else {
      processOrder();
    }
  };

  const processOrder = async () => {
    setStatus('buying');
    
    // Calculate final price locally for the invoice
    const tax = product.price * product.transparency.tax;
    const finalPrice = product.price + tax + product.transparency.shipping + product.transparency.fee;

    // Create a single-item array
    const singleItem = [{
      title: product.title,
      price: finalPrice,
      category: product.category
    }];
    
    await fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify({ 
        type: 'order', 
        email: user?.email, 
        name: user?.name,
        address: user?.address, 
        items: singleItem // Sending array
      }),
    });

    setTimeout(() => setStatus('success'), 2000);
  };

  if (status === 'success') {
    return (
      <div className="w-full mt-6 bg-green-900/30 border border-green-500 text-green-400 p-4 rounded-xl text-center font-bold animate-pulse">
        Invoice Sent to {user?.email}
      </div>
    );
  }

  return (
    <button 
      onClick={handleBuyClick}
      disabled={status === 'buying'}
      className="w-full mt-6 bg-white text-black font-bold text-lg py-4 rounded-xl hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.2)]"
    >
      {status === 'buying' ? 'Processing Invoice...' : 'Buy Now'}
    </button>
  );
}
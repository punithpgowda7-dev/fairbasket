'use client';
import { motion } from 'framer-motion';

export default function PricingEngine({ price, tax, shipping, fee }: any) {
  const total = price + (price * tax) + shipping + fee;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md mt-6">
      <h3 className="text-xl font-bold text-blue-400 mb-4">Transparent Pricing</h3>
      <div className="space-y-2 text-gray-300">
        <div className="flex justify-between"><span>Base Price</span><span>₹{price}</span></div>
        <div className="flex justify-between text-red-300"><span>Tax ({(tax*100).toFixed(0)}%)</span><span>+ ₹{(price*tax).toFixed(2)}</span></div>
        <div className="flex justify-between text-green-300"><span>Shipping</span><span>+ ₹{shipping}</span></div>
        <div className="flex justify-between text-yellow-300"><span>Platform Fee</span><span>+ ₹{fee}</span></div>
        <div className="h-px bg-white/20 my-2"></div>
        <div className="flex justify-between text-2xl font-bold text-white"><span>You Pay</span><span>₹{total.toFixed(2)}</span></div>
      </div>
    </motion.div>
  );
}
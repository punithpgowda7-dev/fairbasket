'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Zap, User, Mail, MapPin } from 'lucide-react';

export default function AuthModal() {
  const { showLoginModal, login, skipLogin, user, isForceLogin } = useAuth();
  const [stage, setStage] = useState<'launch' | 'warp' | 'explosion' | 'form'>('launch');
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });

  useEffect(() => {
    if (showLoginModal) {
      setStage('launch');
      setTimeout(() => setStage('warp'), 1200);
      setTimeout(() => setStage('explosion'), 2000);
      setTimeout(() => setStage('form'), 2200);
    }
  }, [showLoginModal]);

  if (user || !showLoginModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden px-4">
      <AnimatePresence mode='wait'>
        {stage === 'launch' && (
          <motion.div
            key="launch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black text-center"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8bcbf6dd04c')] opacity-40 bg-cover animate-pulse" />
            <motion.div
              initial={{ y: 100, scale: 0.5 }}
              animate={{ y: -50, scale: 1 }}
              transition={{ duration: 1.2, ease: "circIn" }}
              className="relative z-10"
            >
              <Rocket size={80} className="text-blue-500 fill-blue-500 -rotate-45" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, letterSpacing: '0px' }}
              animate={{ opacity: 1, letterSpacing: '5px' }}
              className="mt-8 text-blue-400 font-bold uppercase text-xl tracking-widest"
            >
              FairBasket Loading...
            </motion.h2>
          </motion.div>
        )}

        {stage === 'warp' && (
           <motion.div key="warp" className="absolute inset-0 bg-black flex items-center justify-center">
             <div className="text-blue-500 animate-pulse">Engaging Hyperdrive...</div>
           </motion.div>
        )}

        {stage === 'explosion' && (
          <motion.div key="explosion" className="absolute inset-0 bg-white" initial={{ opacity: 1 }} animate={{ opacity: 0 }} />
        )}

        {stage === 'form' && (
          <motion.div
            key="form"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-50 w-full max-w-md bg-[#111]/95 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-6 md:p-8 shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-blue-900/20 rounded-full mb-3 ring-1 ring-blue-500/50">
                <Zap size={28} className="text-blue-400 fill-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">FairBasket ID</h2>
              <p className="text-blue-200/60 text-xs">Login to continue</p>
            </div>

            <div className="space-y-3">
              <div className="relative group">
                <User className="absolute left-4 top-3.5 text-gray-500" size={16} />
                <input 
                  placeholder="Full Name" 
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 text-white text-sm focus:border-blue-500 outline-none"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-gray-500" size={16} />
                <input 
                  placeholder="Email Address" 
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 text-white text-sm focus:border-blue-500 outline-none"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="relative group">
                <MapPin className="absolute left-4 top-3.5 text-gray-500" size={16} />
                <input 
                  placeholder="Delivery Location" 
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 text-white text-sm focus:border-blue-500 outline-none"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button 
                onClick={() => formData.name && formData.email && login(formData.name, formData.email, formData.address)}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl uppercase text-sm tracking-wider hover:bg-blue-500 transition"
              >
                Enter Store
              </button>
              {!isForceLogin && (
                <button onClick={skipLogin} className="w-full text-center text-gray-500 text-xs py-2">Skip</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
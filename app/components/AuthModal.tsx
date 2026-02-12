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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden perspective-1000">
      
      <AnimatePresence mode='wait'>
        {stage === 'launch' && (
          <motion.div
            key="launch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506318137071-a8bcbf6dd04c?q=80&w=1920&auto=format&fit=crop')] opacity-40 bg-cover animate-pulse" />
            <motion.div
              initial={{ y: 200, scale: 0.5 }}
              animate={{ y: -50, scale: 1 }}
              transition={{ duration: 1.2, ease: "circIn" }}
              className="relative z-10"
            >
              <Rocket size={120} className="text-blue-500 fill-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.8)] -rotate-45" />
              <motion.div 
                animate={{ height: [50, 150, 50], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 0.1 }}
                className="absolute top-full left-1/2 -translate-x-1/2 w-8 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 blur-md rounded-full -rotate-45 origin-top ml-8 -mt-4"
              />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, letterSpacing: '0px' }}
              animate={{ opacity: 1, letterSpacing: '10px' }}
              className="mt-12 text-blue-400 font-bold uppercase text-2xl tracking-widest"
            >
              FairBasket Loading...
            </motion.h2>
          </motion.div>
        )}

        {stage === 'warp' && (
          <motion.div
            key="warp"
            className="absolute inset-0 flex items-center justify-center bg-black"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  x: (Math.random() - 0.5) * window.innerWidth * 2,
                  y: (Math.random() - 0.5) * window.innerHeight * 2,
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="absolute w-1 h-32 bg-blue-400 blur-sm rounded-full origin-center"
                style={{ rotate: `${Math.random() * 360}deg` }}
              />
            ))}
          </motion.div>
        )}

        {stage === 'explosion' && (
          <motion.div
            key="explosion"
            className="absolute inset-0 flex items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-blue-500 mix-blend-overlay" />
          </motion.div>
        )}

        {stage === 'form' && (
          <motion.div
            key="form"
            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative z-50 w-full max-w-md bg-[#0a0a0a]/90 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 shadow-[0_0_60px_rgba(59,130,246,0.3)]"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%` 
                }}
              />
            ))}

            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-blue-900/20 rounded-full mb-4 ring-1 ring-blue-500/50">
                <Zap size={32} className="text-blue-400 fill-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                {isForceLogin ? 'Secure Access' : 'FairBasket ID'}
              </h2>
              <p className="text-blue-200/60 text-sm">
                {isForceLogin ? 'Authentication required for transaction.' : 'Enter credentials to proceed.'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-blue-500 tracking-wider ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition" size={18} />
                  <input 
                    placeholder="Enter Name" 
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 text-white focus:border-blue-500 outline-none transition focus:bg-blue-900/10"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-blue-500 tracking-wider ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition" size={18} />
                  <input 
                    placeholder="Enter Email" 
                    type="email"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 text-white focus:border-blue-500 outline-none transition focus:bg-blue-900/10"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-blue-500 tracking-wider ml-1">Delivery Node</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-500 transition" size={18} />
                  <input 
                    placeholder="Address / Location" 
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 text-white focus:border-blue-500 outline-none transition focus:bg-blue-900/10"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <button 
                onClick={() => {
                  if(formData.name && formData.email && formData.address) {
                    login(formData.name, formData.email, formData.address);
                  } else {
                    alert("System Error: Missing Credentials");
                  }
                }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition shadow-[0_0_20px_rgba(37,99,235,0.4)] uppercase tracking-widest text-sm"
              >
                Login
              </button>

              {!isForceLogin && (
                <button onClick={skipLogin} className="w-full text-center text-gray-500 text-xs hover:text-white transition">
                  Skip for now
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
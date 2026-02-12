'use client';
import Link from 'next/link';
import { ShoppingCart, Search, User, LogOut, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useCart } from '@/app/context/CartContext';
import { useTheme } from '@/app/context/ThemeContext';

export default function Navbar() {
  const { user, logout, setShowLoginModal, setIsForceLogin } = useAuth();
  const { cart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLoginClick = () => {
    setIsForceLogin(false);
    setShowLoginModal(true);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 h-20 flex items-center transition-all duration-300">
      <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center text-black dark:text-white">
        
        {/* LOGO CHANGED HERE */}
        <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition flex items-center gap-1">
          FairBasket<span className="text-blue-500">.</span>
        </Link>
        
        <div className="flex gap-4 items-center">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition text-gray-600 dark:text-gray-300"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"><Search size={20} /></button>
          
          <Link href="/cart" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition relative">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                {cart.length}
              </span>
            )}
          </Link>
          
          <div className="h-6 w-px bg-black/10 dark:bg-white/10 mx-2"></div>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:ring-2 ring-black/20 dark:ring-white/20 transition-all font-bold text-sm text-white shadow-lg"
              >
                {user.name ? user.name.substring(0,2).toUpperCase() : 'U'}
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#111] border border-black/10 dark:border-white/20 rounded-xl p-4 shadow-2xl z-50">
                  <div className="mb-3 border-b border-gray-200 dark:border-white/10 pb-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Signed in as</p>
                    <h4 className="font-bold text-black dark:text-white truncate">{user.name}</h4>
                    <p className="text-xs text-blue-500 dark:text-blue-400 truncate">{user.email}</p>
                  </div>
                  
                  <button 
                    onClick={() => { logout(); setDropdownOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 py-2 rounded-lg text-xs font-bold hover:bg-red-100 dark:hover:bg-red-500/20 transition"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={handleLoginClick}
              className="text-sm font-bold bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full hover:opacity-80 transition shadow-lg"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Script from 'next/script';
import { X } from 'lucide-react';

export default function AuthModal() {
  const { showLoginModal, login, skipLogin, hasSkipped, user } = useAuth();
  const [emailInput, setEmailInput] = useState('');

  // Don't show if user is already logged in or modal is hidden
  if (!showLoginModal || user) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl bg-[#1a1a1a] rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-blue-600 p-4 text-center">
          <h2 className="text-xl font-bold text-white">
            {hasSkipped ? 'Login Required to Purchase' : 'Welcome to TranStore'}
          </h2>
          <p className="text-sm text-blue-100">Please complete the form below to continue.</p>
        </div>

        {/* VISME FORM CONTAINER */}
        <div className="flex-1 overflow-y-auto bg-white p-2">
           <div className="visme_d"
               data-title="Webinar Registration Form" 
               data-url="g7ddqxx0-untitled-project?fullPage=true"
               data-domain="forms"
               data-full-page="true"
               data-min-height="600px"
               data-form-id="133190">
          </div>
          <Script src="https://static-bundles.visme.co/forms/vismeforms-embed.js" strategy="lazyOnload" />
        </div>

        {/* FOOTER - THE REAL LOGIN LOGIC */}
        <div className="p-6 bg-[#111] border-t border-white/10 flex flex-col items-center gap-4">
          <p className="text-gray-400 text-sm">
            After filling the form above, confirm your email here to sync your account:
          </p>
          
          <div className="flex gap-2 w-full max-w-md">
            <input 
              type="email" 
              placeholder="Enter your email again..." 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none"
            />
            <button 
              onClick={() => {
                if(emailInput.includes('@')) login(emailInput);
                else alert("Please enter a valid email");
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold transition"
            >
              Confirm & Login
            </button>
          </div>

          {/* SKIP BUTTON (Only shows if they haven't tried to buy yet) */}
          {!hasSkipped && (
            <button 
              onClick={skipLogin}
              className="text-gray-500 hover:text-white text-sm underline mt-2"
            >
              Skip for now (Browse Only)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  user: { email: string } | null;
  login: (email: string) => void;
  skipLogin: () => void;
  hasSkipped: boolean;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [hasSkipped, setHasSkipped] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // On first load, check if we should show the modal
  useEffect(() => {
    const storedUser = localStorage.getItem('transtore_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user, show modal immediately
      setShowLoginModal(true);
    }
  }, []);

  const login = async (email: string) => {
    const userData = { email };
    setUser(userData);
    localStorage.setItem('transtore_user', JSON.stringify(userData));
    setShowLoginModal(false);
    
    // SEND WELCOME EMAIL
    await fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify({ type: 'welcome', email }),
    });
  };

  const skipLogin = () => {
    setHasSkipped(true);
    setShowLoginModal(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, skipLogin, hasSkipped, showLoginModal, setShowLoginModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
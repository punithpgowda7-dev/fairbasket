'use client';
import { createContext, useContext, useState, useEffect } from 'react';

type User = {
  name: string;
  email: string;
  address: string;
};

type AuthContextType = {
  user: User | null;
  login: (name: string, email: string, address: string) => void;
  logout: () => void;
  skipLogin: () => void;
  hasSkipped: boolean;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  isForceLogin: boolean;
  setIsForceLogin: (force: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hasSkipped, setHasSkipped] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isForceLogin, setIsForceLogin] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('transtore_user');
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      // First load: Show modal, allow skip
      setShowLoginModal(true);
      setIsForceLogin(false);
    }
  }, []);

  const login = async (name: string, email: string, address: string) => {
    const newUser = { name, email, address };
    setUser(newUser);
    localStorage.setItem('transtore_user', JSON.stringify(newUser));
    setShowLoginModal(false);

    // Send Welcome Email
    await fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify({ type: 'welcome', email, name }),
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('transtore_user');
    setHasSkipped(false);
    setShowLoginModal(true);
  };

  const skipLogin = () => {
    setHasSkipped(true);
    setShowLoginModal(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, skipLogin, hasSkipped, 
      showLoginModal, setShowLoginModal, isForceLogin, setIsForceLogin 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)!;
}
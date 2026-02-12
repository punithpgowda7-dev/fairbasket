import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import AuthModal from './components/AuthModal';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'FairBasket | Honest Pricing',
  description: 'The transparent pricing marketplace.',
};

// FIX: This forces mobile to fit screen perfectly (No Zooming)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-gray-50 text-black dark:bg-[#050505] dark:text-white transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <AuthModal />
              {children}
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
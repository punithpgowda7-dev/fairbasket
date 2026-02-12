import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import AuthModal from './components/AuthModal';
import type { Metadata, Viewport } from 'next';

// 1. Metadata for SEO and Tab Titles
export const metadata: Metadata = {
  title: 'FairBasket | Honest Pricing',
  description: 'The transparent pricing marketplace with no hidden fees.',
};

// 2. THE FIX: Strict Viewport Rule to prevent mobile zooming
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased bg-gray-50 text-black dark:bg-[#050505] dark:text-white transition-colors duration-300 w-full overflow-x-hidden">
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
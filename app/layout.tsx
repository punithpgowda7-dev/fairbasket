import './globals.css';
import Navbar from './components/Navbar'; // <--- Importing your fixed Navbar
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import AuthModal from './components/AuthModal';
import type { Metadata, Viewport } from 'next';

// 1. Metadata for SEO
export const metadata: Metadata = {
  title: 'FairBasket | Honest Pricing',
  description: 'The transparent pricing marketplace with no hidden fees.',
};

// 2. Viewport settings (Mobile zoom fix)
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
              
              {/* 1. The Global Navbar (Includes SearchBar) */}
              <Navbar />
              
              {/* 2. Login/Signup Modal */}
              <AuthModal />
              
              {/* 3. Main Page Content */}
              <main className="min-h-screen">
                {children}
              </main>

            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
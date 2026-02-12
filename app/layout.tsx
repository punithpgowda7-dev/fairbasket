import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import AuthModal from './components/AuthModal';

export const metadata = {
  title: 'FairBasket | Honest Pricing',
  description: 'The transparent pricing marketplace.',
};

// FORCE VIEWPORT: This stops the mobile browser from zooming in/out
export const viewport = {
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
      <body className="antialiased bg-gray-50 text-black dark:bg-[#050505] dark:text-white transition-colors duration-300 overflow-x-hidden w-full">
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
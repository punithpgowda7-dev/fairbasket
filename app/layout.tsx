import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import AuthModal from './components/AuthModal';

export const metadata = {
  title: 'FairBasket | Honest Pricing',
  description: 'The transparent pricing marketplace.',
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
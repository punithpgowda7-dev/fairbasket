import { dbConnect } from '@/lib/mongodb';
import { Product } from '@/lib/models';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  await dbConnect();
  const rawProducts = await Product.find({});
  const products = JSON.parse(JSON.stringify(rawProducts));

  return (
    <main className="min-h-screen bg-gray-50 text-black dark:bg-[#050505] dark:text-white transition-colors duration-300">
      <Navbar />
      
      <div className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-500 dark:from-white dark:to-white/60">
            FairBasket.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience <span className="text-blue-500 dark:text-blue-400 font-semibold">True Pricing</span>. 
            The price you see is the price you pay. No hidden fees.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex justify-between items-end mb-8 border-b border-black/10 dark:border-white/10 pb-4">
          <h2 className="text-2xl font-bold">Featured Collection</h2>
          <div className="text-sm text-gray-500">{products.length} Items</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p: any) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
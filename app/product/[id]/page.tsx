import { dbConnect } from '@/lib/mongodb';
import { Product } from '@/lib/models';
import Navbar from '@/app/components/Navbar';
import ProductViewer3D from '@/app/components/ProductViewer3D';
import PricingEngine from '@/app/components/PricingEngine';
import BuyButton from '@/app/components/BuyButton';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Await params for Next.js 15+ compatibility
  const { id } = await params;
  
  await dbConnect();
  const rawProduct = await Product.findById(id);

  if (!rawProduct) {
    return <div className="text-white text-center pt-40">Product Not Found</div>;
  }

  // FIX: Convert database object to simple JSON to stop the crash
  const product = JSON.parse(JSON.stringify(rawProduct));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white transition-colors duration-300">
      <Navbar />
      
      <div className="pt-28 pb-12 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column */}
        <div className="sticky top-28">
           <ProductViewer3D modelUrl={product.modelUrl} imageUrl={product.image} />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <span className="bg-blue-600/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-600/20">
                 {product.category}
               </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{product.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{product.description}</p>
          </div>
          
          <PricingEngine 
            price={product.price}
            tax={product.transparency.tax}
            shipping={product.transparency.shipping}
            fee={product.transparency.fee}
          />

          {/* Now passing the SANITIZED product */}
          <BuyButton product={product} />
          
          <p className="text-center text-gray-500 text-xs mt-2">
            Secure checkout powered by TranStore Engine
          </p>
        </div>
      </div>
    </div>
  );
}
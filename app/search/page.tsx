'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
// IMPORT THE SHARED DATA
import { products } from '../data/products'; 

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // Filter the shared product list
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen pt-24">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Results for "<span className="text-blue-600">{query}</span>"
      </h1>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No products found matching that name.</p>
          <Link href="/" className="text-blue-500 hover:underline mt-4 block">
            Return to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="block border p-4 rounded-xl hover:shadow-xl transition bg-white dark:bg-gray-900 dark:border-gray-800 group">
              <div className="overflow-hidden rounded-lg mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-300" 
                />
              </div>
              <h2 className="font-bold text-lg mb-2 dark:text-white">{product.name}</h2>
              <p className="text-blue-600 font-bold text-xl">${product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-white">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
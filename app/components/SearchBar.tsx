'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full text-gray-600">
      <input
        type="search"
        name="search"
        placeholder="Search products..."
        className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full border border-gray-300 focus:border-blue-500 transition-colors"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        🔍
      </button>
    </form>
  );
}
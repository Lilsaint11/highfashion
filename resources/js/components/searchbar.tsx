import { X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react'

interface SearchMenuProps {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Searchbar({ isSearchOpen, setIsSearchOpen }: SearchMenuProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
      setLoading(false);
    }, 300); // debounce - waits 300ms after user stops typing

    return () => clearTimeout(timeout);
  }, [query]);

  const handleClose = () => {
    setIsSearchOpen(false);
    setQuery('');
    setResults([]);
  };

  return (
    <div className='fixed top-0 z-50'>
      <div
        className={`transition duration-200 w-screen h-screen z-30 absolute -top-10 left-0 bg-[rgba(0,0,0,0.8)] ${isSearchOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={handleClose}
      />
      <div className={`bg-white w-screen h-screen z-40 absolute top-0 left-0 transition duration-300 ${isSearchOpen ? 'translate-x-5' : 'translate-x-full'}`}>
        <div className='border-b flex gap-10 pl-8 pr-12 items-center'>
          <input
            type="text"
            className='w-full outline-none py-5'
            placeholder='Search for anything'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus={isSearchOpen}
          />
          <X className='cursor-pointer' onClick={handleClose} />
        </div>

        <div className='px-8 py-4'>
          {loading && (
            <p className='text-sm text-gray-400'>Searching...</p>
          )}

          {!loading && query && results.length === 0 && (
            <p className='text-sm text-gray-400'>No products found for "{query}"</p>
          )}

          {results.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              onClick={handleClose}
              className='flex items-center gap-4 py-3 border-b hover:bg-gray-50 transition'
            >
              <img
                src={product.main_image}
                alt={product.name}
                className='w-12 h-12 object-cover rounded'
              />
              <div>
                <p className='text-sm font-medium'>{product.name}</p>
                <p className='text-xs text-gray-400'>${product.base_price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
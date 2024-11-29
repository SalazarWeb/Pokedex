'use client';

import { Search } from 'lucide-react';
import { SearchProps } from '@/lib/types';

export default function SearchBar({ onSearch }: SearchProps) {
  return (
    <div className="search-container relative w-full max-w-xl mx-auto mb-8">
      <div className="search-wrapper relative">
        <Search className="search-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search Pokémon by name..."
          onChange={(e) => onSearch(e.target.value)}
          className="search-input w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
        />
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { fetchPokemonDetails, fetchPokemons } from '@/lib/api';
import { Pokemon } from '@/lib/types';
import SearchBar from '@/components/SearchBar';
import PokemonCard from '@/components/PokemonCard';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const POKEMON_PER_PAGE = 12;
  const LOAD_MORE_COUNT = 6;

  useEffect(() => {
    loadInitialPokemons();
  }, []);

  const loadInitialPokemons = async () => {
    try {
      const results = await fetchPokemons(0, POKEMON_PER_PAGE);
      const detailedPokemons = await Promise.all(
        results.map((pokemon: { name: string }) => 
          fetchPokemonDetails(pokemon.name)
        )
      );
      setPokemons(detailedPokemons);
      setOffset(POKEMON_PER_PAGE);
    } catch (error) {
      console.error('Error loading pokemons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    try {
      const results = await fetchPokemons(offset, LOAD_MORE_COUNT);
      const newPokemons = await Promise.all(
        results.map((pokemon: { name: string }) => 
          fetchPokemonDetails(pokemon.name)
        )
      );
      setPokemons(prev => [...prev, ...newPokemons]);
      setOffset(prev => prev + LOAD_MORE_COUNT);
    } catch (error) {
      console.error('Error loading more pokemons:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    
    try {
      if (query.length === 0) {
        await loadInitialPokemons();
        return;
      }

      const results = await fetchPokemons(0, 151);
      const filtered = results.filter((pokemon: { name: string }) => 
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      const detailedPokemons = await Promise.all(
        filtered.slice(0, POKEMON_PER_PAGE).map((pokemon: { name: string }) => 
          fetchPokemonDetails(pokemon.name)
        )
      );
      setPokemons(detailedPokemons);
      setOffset(POKEMON_PER_PAGE);
    } catch (error) {
      console.error('Error searching pokemons:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-500 to-purple-600 px-4 py-8 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center text-white mb-8">
          Pokédex
        </h1>
        
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {pokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>

            {pokemons.length >= POKEMON_PER_PAGE && !searchQuery && (
              <div className="flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="load-more-button bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading...
                    </div>
                  ) : (
                    'Load More Pokémon'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
'use client';

import { Pokemon } from '@/lib/types';
import { motion } from 'framer-motion';

const typeColors: { [key: string]: string } = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pokemon-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="p-4 sm:p-6">
        <div className="pokemon-image-container relative">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-full h-40 sm:h-48 object-contain mb-4"
          />
        </div>
        
        <div className="pokemon-info text-center mb-4">
          <h2 className="pokemon-name text-xl sm:text-2xl font-bold capitalize mb-2">{pokemon.name}</h2>
          <p className="pokemon-id text-gray-500 dark:text-gray-400">#{pokemon.id.toString().padStart(3, '0')}</p>
        </div>

        <div className="pokemon-types flex flex-wrap gap-2 justify-center mb-4">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className={`${typeColors[type.name]} px-3 py-1 rounded-full text-white text-sm capitalize`}
            >
              {type.name}
            </span>
          ))}
        </div>

        <div className="pokemon-stats grid grid-cols-2 gap-3">
          {pokemon.stats.map(({ base_stat, stat }) => (
            <div key={stat.name} className="text-center">
              <p className="stat-name text-sm text-gray-500 dark:text-gray-400 capitalize">
                {stat.name.replace('-', ' ')}
              </p>
              <p className="stat-value font-bold">{base_stat}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
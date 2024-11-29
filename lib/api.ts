export async function fetchPokemons(offset: number = 0, limit: number = 151) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  return data.results;
}

export async function fetchPokemonDetails(nameOrId: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`);
  const data = await response.json();
  return data;
}

export async function searchPokemons(query: string) {
  const allPokemons = await fetchPokemons(0, 151);
  return allPokemons.filter((pokemon: { name: string }) => 
    pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
    pokemon.url.split('/')[6] === query
  );
}
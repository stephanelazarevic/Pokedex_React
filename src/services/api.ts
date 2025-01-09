const BASE_URL = 'https://nestjs-pokedex-api.vercel.app';

export const fetchPokemons = async (page: number, limit: number, filters: { name?: string, typeId?: number }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(filters.name && { name: filters.name }),
    ...(filters.typeId && { typeId: filters.typeId.toString() }),
  });
  const response = await fetch(`${BASE_URL}/pokemons?${params}`);
  const data = await response.json();
  return data;
};

export const fetchPokemonDetails = async (pokedexId: number) => {
  const response = await fetch(`${BASE_URL}/pokemons/${pokedexId}`);
  const data = await response.json();
  return data;
};

export const fetchTypes = async () => {
  const response = await fetch(`${BASE_URL}/types`);
  const data = await response.json();
  return data;
};

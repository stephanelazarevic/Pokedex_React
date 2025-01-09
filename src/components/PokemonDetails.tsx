import React, { useState, useEffect } from 'react';
import { fetchPokemonDetails } from '../services/api';

type PokemonDetailsProps = {
  pokedexId: number;
  onClose: () => void;
};

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokedexId, onClose }) => {
  const [pokemon, setPokemon] = useState<any>(null);  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null); 

    fetchPokemonDetails(pokedexId)
      .then((data) => {
        setPokemon(data);
      })
      .catch((err) => {
        setError('Erreur lors du chargement des détails du Pokémon');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pokedexId]);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!pokemon) return <p>Aucun détail trouvé pour ce Pokémon.</p>;

  return (
    <div className="p-6 bg-white rounded-md shadow-lg">
      <button onClick={onClose} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        Fermer
      </button>
      <h1 className="text-3xl font-bold mb-4">{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} className="w-64 h-64 object-cover mx-auto" />
      <h2 className="text-2xl mt-6">Stats</h2>
      <ul className="list-disc pl-4">
        {pokemon.stats.map((stat: { name: string; value: string }) => (
          <li key={stat.name}>{stat.name}: {stat.value}</li>
        ))}
      </ul>
      <h2 className="text-2xl mt-6">Évolutions</h2>
      <div className="flex gap-4">
        {pokemon.evolutions?.map((evo: { id: number; name: string; image: string }) => (
          <div key={evo.id}>
            <img src={evo.image} alt={evo.name} className="w-32 h-32 object-cover" />
            <p className="text-center">{evo.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonDetails;

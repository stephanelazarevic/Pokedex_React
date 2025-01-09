'use client';
import React, { useState } from 'react';
import PokemonList from '../components/PokemonList';  

const Home: React.FC = () => {
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);

  const handlePokemonSelect = (id: number) => {
    setSelectedPokemonId(id);
  };

  const handleCloseDetails = () => {
    setSelectedPokemonId(null);
  };

  return (
    <div className="p-4">
      {/* Affichage de la liste des Pokémons */}
      {!selectedPokemonId ? (
        <PokemonList onSelectPokemon={handlePokemonSelect} />
      ) : (
        
        <div>
          <button onClick={handleCloseDetails}>Retour</button>
          <h1>Affichage des détails du Pokémon {selectedPokemonId}</h1>
        </div>
      )}
    </div>
  );
};

export default Home;

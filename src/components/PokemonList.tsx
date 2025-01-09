import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard'; 
import Filter from './PokemonFilter';  
import InfiniteScroll from './InfiniteScroll';  
import { fetchPokemons, fetchTypes } from '../services/api';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const PokemonList = ({ onSelectPokemon }: { onSelectPokemon: (id: number) => void }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);  
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [searchName, setSearchName] = useState('');
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTypes().then(setTypes);  
    fetchPokemons(1, 50, { name: 'test' })
  }, []);

  console.log(pokemons); 

  const [isFetching, setIsFetching] = useState(false);

  const fetchMorePokemons = () => {
    if (isFetching) return;
    setIsFetching(true);
    
    setIsLoading(true);
    fetchPokemons(page, limit, { name: searchName, typeId: selectedType ?? undefined }).then((data) => {
    setPokemons((prev) => [...prev, ...data]); 
      setPage((prev) => prev + 1);
      setIsLoading(false);
    });
  };

  return (
    <div className="p-4">
      {/* Filtres */}
      <Filter
        name={searchName}
        onNameChange={setSearchName}
        types={types}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />
      {/* Affichage de la liste de Pokémons */}
      {pokemons.map((pokemon) => {
        return (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
            onClick={() => onSelectPokemon(pokemon.id)}  
          />
        );
      })}

      {/* Infinite Scroll */}
      <InfiniteScroll onLoadMore={fetchMorePokemons} isLoading={isLoading} />
    </div>
  );
};

export default PokemonList;

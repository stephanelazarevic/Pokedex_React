import React from 'react';

type PokemonCardProps = {
  id: number;
  name: string;
  image: string;
  types: string[];
  onClick: () => void;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, types, onClick }) => {
  return (
    <div 
      className="p-4 border rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
      onClick={onClick}
    >
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-xl font-bold mt-2">#{id} {name}</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {types.map((type) => (
          <span 
            key={type} 
            className="px-2 py-1 text-sm font-medium bg-gray-200 rounded-full"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;

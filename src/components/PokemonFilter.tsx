import React from 'react';

type FilterProps = {
  name: string;
  onNameChange: (name: string) => void;
  types: { id: number; name: string }[];
  selectedType: number | null;
  onTypeChange: (typeId: number | null) => void;
};

const Filter: React.FC<FilterProps> = ({ name, onNameChange, types, selectedType, onTypeChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className="p-2 border rounded-md w-full md:w-1/3"
      />
      <select
        value={selectedType || ''}
        onChange={(e) => onTypeChange(Number(e.target.value) || null)}
        className="p-2 border rounded-md w-full md:w-1/3"
      >
        <option value="">Tous les types</option>
        {types.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;

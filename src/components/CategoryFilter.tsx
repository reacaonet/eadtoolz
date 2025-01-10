import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex space-x-2 p-1">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
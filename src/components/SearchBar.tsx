
import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { SearchInput } from './SearchInput';
import { CategoryDropdown } from './CategoryDropdown';
import { AddCategoryButton } from './AddCategoryButton';

interface SearchBarProps {
  onSearch: (term: string) => void;
  onFilterChange: (category: string) => void;
  onAddCategory?: (category: string) => void;
  categories: string[];
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onFilterChange, 
  onAddCategory,
  categories,
  className 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onFilterChange(category);
  };

  const handleAddCategory = (category: string) => {
    if (onAddCategory) {
      onAddCategory(category);
      // Seleccionamos automáticamente la categoría recién creada
      setSelectedCategory(category);
      onFilterChange(category);
    }
  };

  return (
    <div className={cn("relative flex items-center gap-2", className)}>
      <SearchInput 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
        onClearSearch={clearSearch} 
      />
      
      <CategoryDropdown 
        selectedCategory={selectedCategory}
        categories={categories}
        onCategorySelect={handleCategorySelect}
        isOpen={isFilterOpen}
        setIsOpen={setIsFilterOpen}
      />

      {onAddCategory && (
        <AddCategoryButton onAddCategory={handleAddCategory} />
      )}
    </div>
  );
};

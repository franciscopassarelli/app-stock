import React, { useRef, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryDropdownProps {
  selectedCategory: string;
  categories: string[];
  onCategorySelect: (category: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  categories,
  onCategorySelect,
  isOpen,
  setIsOpen
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  const handleCategorySelect = (category: string) => {
    const newCategory = category === selectedCategory ? '' : category;
    onCategorySelect(newCategory);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-10 px-3 py-2 inline-flex items-center justify-center rounded-md border border-input text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          selectedCategory 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "bg-background hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <Filter className="h-4 w-4 mr-2" />
        {selectedCategory || 'Categorías'}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-56 rounded-md shadow-lg bg-popover text-popover-foreground border border-input z-50 animate-fade-in">
          <div className="py-1 space-y-1">
            <button
              className={cn(
                "block w-full text-left px-4 py-2 text-sm hover:bg-accent",
                !selectedCategory && "bg-accent/50"
              )}
              onClick={() => handleCategorySelect('')}
            >
              Todas las Categorías
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={cn(
                  "block w-full text-left px-4 py-2 text-sm hover:bg-accent", 
                  selectedCategory === category && "bg-accent/50"
                )}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
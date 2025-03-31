
import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ProductList } from './ProductList';

interface ProductsDisplayProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  onDelete: (id: string) => void;
}

export const ProductsDisplay: React.FC<ProductsDisplayProps> = ({ 
  products, 
  viewMode, 
  onDelete 
}) => {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <ProductCard 
              product={product} 
              onDelete={onDelete} 
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <ProductList 
      products={products} 
      onDelete={onDelete}
    />
  );
};

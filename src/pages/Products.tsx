import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from '../components/Layout';
import { SearchBar } from '../components/SearchBar';
import { useProducts } from '../context/ProductContext';
import { ProductsHeader } from '@/components/ProductsHeader';
import { EmptyProductsState } from '@/components/EmptyProductsState';
import { ProductsDisplay } from '@/components/ProductsDisplay';
import { DeleteProductDialog } from '@/components/DeleteProductDialog';

const Products = () => {
  const { products, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categories, setCategories] = useState<string[]>([]);

  // Actualizar las categorías cuando los productos cambien
  useEffect(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))].sort();
    setCategories(uniqueCategories);
  }, [products]);

  // Filtrar productos usando useMemo para evitar recalcular cada vez
  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(term) || 
          product.code.toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }

    return result;
  }, [products, searchTerm, selectedCategory]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAddCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories(prevCategories => {
        const updatedCategories = [...prevCategories, category];
        return updatedCategories.sort();
      });
      setSelectedCategory(category);
    }
  };

  const confirmDelete = (id: string) => {
    setProductIdToDelete(id);
  };

  const executeDelete = () => {
    if (productIdToDelete) {
      deleteProduct(productIdToDelete);
      setProductIdToDelete(null);
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <ProductsHeader 
          viewMode={viewMode} 
          toggleViewMode={toggleViewMode} 
        />

        <SearchBar 
          onSearch={handleSearch} 
          onFilterChange={handleCategoryChange}
          onAddCategory={handleAddCategory}
          categories={categories}
          className="max-w-3xl"
        />

        {filteredProducts.length === 0 ? (
          <EmptyProductsState hasProducts={products.length > 0} />
        ) : (
          <ProductsDisplay 
            products={filteredProducts}
            viewMode={viewMode}
            onDelete={confirmDelete}
          />
        )}
      </div>

      <DeleteProductDialog 
        isOpen={!!productIdToDelete}
        onOpenChange={(open) => !open && setProductIdToDelete(null)}
        onConfirm={executeDelete}
      />
    </Layout>
  );
};

export default Products;

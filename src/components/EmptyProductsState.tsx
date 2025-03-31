
import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus } from 'lucide-react';

interface EmptyProductsStateProps {
  hasProducts: boolean;
}

export const EmptyProductsState: React.FC<EmptyProductsStateProps> = ({ hasProducts }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted/50 rounded-full p-3 mb-4">
        <Package className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-1">No se encontraron productos</h3>
      <p className="text-muted-foreground max-w-md">
        {hasProducts
          ? "No hay productos que coincidan con tu búsqueda. Intenta ajustar los criterios de búsqueda o filtro."
          : "Aún no has agregado productos. Comienza añadiendo un producto a tu inventario."}
      </p>
      {!hasProducts && (
        <Link
          to="/agregar-producto"
          className="mt-4 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 button-hover"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Producto
        </Link>
      )}
    </div>
  );
};

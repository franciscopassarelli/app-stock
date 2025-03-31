
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, List, Grid } from 'lucide-react';

interface ProductsHeaderProps {
  viewMode: 'grid' | 'list';
  toggleViewMode: () => void;
}

export const ProductsHeader: React.FC<ProductsHeaderProps> = ({ 
  viewMode, 
  toggleViewMode 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Productos</h1>
        <p className="text-muted-foreground mt-1">Administra tu inventario</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={toggleViewMode} className="flex items-center px-3 py-2">
          {viewMode === 'grid' 
            ? <><List className="h-4 w-4 mr-2" /> Vista Lista</>
            : <><Grid className="h-4 w-4 mr-2" /> Vista Cuadrícula</>
          }
        </Button>
        <Link 
          to="/add-product" 
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 button-hover"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Producto
        </Link>
      </div>
    </div>
  );
};


import React from 'react';
import { Trash2, Edit, Eye, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { formatPrice } from '../lib/utils';

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  return (
    <div className="bg-card rounded-md border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-3 font-medium">Imagen</th>
              <th className="text-left p-3 font-medium">Nombre</th>
              <th className="text-left p-3 font-medium">Código</th>
              <th className="text-left p-3 font-medium">Categoría</th>
              <th className="text-left p-3 font-medium">Precio</th>
              <th className="text-left p-3 font-medium">Stock</th>
              <th className="text-right p-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+disponible';
                      }}
                    />
                  </div>
                </td>
                <td className="p-3 font-medium">
                  {product.name}
                  {product.quantity <= product.lowStockThreshold && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-amber-50 px-1.5 py-0.5 text-xs text-amber-500">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Bajo stock
                    </span>
                  )}
                </td>
                <td className="p-3 text-muted-foreground">
                  {product.code}
                </td>
                <td className="p-3">
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                    {product.category}
                  </span>
                </td>
                <td className="p-3 font-medium">
                  {formatPrice(product.price)}
                </td>
                <td className="p-3">
                  <span className={`font-medium ${product.quantity <= product.lowStockThreshold ? 'text-amber-500' : ''}`}>
                    {product.quantity}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/products/${product.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver</span>
                      </Button>
                    </Link>
                    <Link to={`/edit-product/${product.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(product.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

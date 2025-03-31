
import React from 'react';
import { Product } from '../types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const isLowStock = product.quantity <= product.lowStockThreshold;
  
  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+disponible';
          }}
        />
        {isLowStock && (
          <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-amber-50 text-amber-600 text-xs font-medium flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            Bajo stock
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-lg text-foreground line-clamp-1">{product.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Código: {product.code}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              <span className="text-muted-foreground">Stock:</span>{' '}
              <span className={isLowStock ? 'text-amber-600' : ''}>
                {product.quantity}
              </span>
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {product.category}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="text-lg font-semibold">{formatPrice(product.price)}</div>
        <div className="flex space-x-1">
          <Link to={`/products/${product.id}`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
              <span className="sr-only">Ver</span>
            </Button>
          </Link>
          <Link to={`/edit-product/${product.id}`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Editar</span>
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Eliminar</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

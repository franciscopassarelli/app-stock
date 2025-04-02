
import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { AlertCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const LowStockNotification: React.FC = () => {
  const { lowStockProducts } = useProducts();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed || lowStockProducts.length === 0) {
    return null;
  }

  return (
    <div className={cn(
      "mb-6 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 animate-slide-in",
      "shadow-sm px-4 py-3 flex items-start justify-between"
    )}>
      <div className="flex gap-2 items-center">
        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
        <div>
          <h3 className="font-medium">Alerta de stock bajo</h3>
          <p className="text-sm text-amber-700 mt-1">
            {lowStockProducts.length === 1
              ? `1 producto se está agotando.`
              : `${lowStockProducts.length} Los productos se están agotando en stock.`}
            {' '}
            <Link to="/" className="font-medium underline underline-offset-2 hover:text-amber-900">
            Ver detalles
            </Link>
          </p>
        </div>
      </div>
      <button 
        onClick={() => setIsDismissed(true)}
        className="text-amber-500 hover:text-amber-700"
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Despedir</span>
      </button>
    </div>
  );
};

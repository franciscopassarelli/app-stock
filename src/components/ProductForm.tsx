import React, { useState } from 'react';
import { ProductFormData } from '../types';
import { cn } from '../lib/utils';

interface ProductFormProps {
  initialData?: Partial<ProductFormData> & { id?: string };
  onSubmit: (data: ProductFormData) => void;
  isLoading: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
    price: initialData?.price || 0,
    code: initialData?.code || '',
    quantity: initialData?.quantity || 0,
    imageUrl: initialData?.imageUrl || '',
    category: initialData?.category || '',
    lowStockThreshold: initialData?.lowStockThreshold || 5,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;

    if (name === 'price' || name === 'quantity' || name === 'lowStockThreshold') {
      parsedValue = value === '' ? 0 : parseFloat(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    if (errors[name as keyof ProductFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Product code is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than zero';
    }

    if (formData.quantity < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!formData.imageUrl.match(/^https?:\/\/.+\..+/)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (formData.lowStockThreshold < 0) {
      newErrors.lowStockThreshold = 'Threshold cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const categories = [
    'Gaseosas',
    'Cosmeticos',
    'Limpieza',
    'Alcohol',
    'Snacks',
    'Bebidas', 
    'Cigarrillos',
    'Golosinas',
    'galletitas',
    'Electronicos',
    'Ropa',
    'Remedios',
    'Accesorios',
    'Muebles',
    'Herramientas',
    'Juguetes',
    'Alimentos',
    'Papeleria',
    'Electrodomesticos',
    'Otros',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
          Nombre del producto
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={cn(
              "w-full px-3 py-2 rounded-md border border-input bg-background text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              errors.name && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="nombre del producto"
            disabled={isLoading}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="code" className="text-sm font-medium">
          Código de producto
          </label>
          <input
            id="code"
            name="code"
            type="text"
            value={formData.code}
            onChange={handleChange}
            className={cn(
              "w-full px-3 py-2 rounded-md border border-input bg-background text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              errors.code && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="código del producto"
            disabled={isLoading}
          />
          {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="text-sm font-medium">
          Precio ($)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className={cn(
              "w-full px-3 py-2 rounded-md border border-input bg-background text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              errors.price && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="0.00"
            disabled={isLoading}
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="quantity" className="text-sm font-medium">
            Cantidad
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            className={cn(
              "w-full px-3 py-2 rounded-md border border-input bg-background text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              errors.quantity && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="0"
            disabled={isLoading}
          />
          {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
          Categoría
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={cn(
              "w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              errors.category && "border-red-500 focus-visible:ring-red-500"
            )}
            disabled={isLoading}
          >
            <option value="" disabled>
              Seleccione una categoría
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="lowStockThreshold" className="text-sm font-medium">
          Umbral de stock bajo
          </label>
          <input
            id="lowStockThreshold"
            name="lowStockThreshold"
            type="number"
            value={formData.lowStockThreshold}
            onChange={handleChange}
            className={cn(
              "w-full px-3 py-2 rounded-md border border-input bg-background text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              errors.lowStockThreshold && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="5"
            disabled={isLoading}
          />
          {errors.lowStockThreshold && (
            <p className="text-red-500 text-xs mt-1">{errors.lowStockThreshold}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
          Se le notificará cuando el stock caiga por debajo de este número.
          </p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="imageUrl" className="text-sm font-medium">
          URL de la imagen
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            value={formData.imageUrl}
            onChange={handleChange}
            className={cn(
              "w-full px-3 py-2 rounded-md border border-input bg-background text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              errors.imageUrl && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="https://example.com/image.jpg"
            disabled={isLoading}
          />
          {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}
        </div>

        {formData.imageUrl && (
          <div className="md:col-span-2">
            <p className="text-sm font-medium mb-2">Vista previa de la imagen</p>
            <div className="h-48 bg-muted rounded-md overflow-hidden">
              <img
                src={formData.imageUrl}
                alt="Product preview"
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Not+Found';
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground button-hover"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 button-hover flex items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>{initialData?.id ? 'Actualizar producto' : 'Agregar producto'}</>
          )}
        </button>
      </div>
    </form>
  );
};

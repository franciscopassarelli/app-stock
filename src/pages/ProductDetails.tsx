
import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { useProducts } from '../context/ProductContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Edit, Trash2, ChevronLeft, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const [product, setProduct] = useState(getProduct(id || ''));
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const foundProduct = getProduct(id || '');
    if (!foundProduct) {
      toast.error('Product not found');
      navigate('/products');
      return;
    }
    setProduct(foundProduct);
  }, [id, getProduct, navigate]);

  if (!product) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-muted rounded mb-4"></div>
            <div className="h-4 w-48 bg-muted rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  const handleDelete = () => {
    deleteProduct(product.id);
    navigate('/products');
  };

  const isLowStock = product.quantity <= product.lowStockThreshold;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Link 
            to="/products" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a productos
          </Link>
        </div>

        <div className="glass-card rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative bg-gray-100 flex items-center justify-center min-h-[300px]">
              <img
                src={product.imageUrl}
                alt={product.name}
                className={cn(
                  "w-full h-full object-contain transition-all duration-300",
                  isImageLoaded ? "img-loaded" : "img-loading"
                )}
                onLoad={() => setIsImageLoaded(true)}
              />
              {isLowStock && (
                <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Existencias bajas
                </div>
              )}
            </div>
            
            <div className="p-6 md:w-1/2">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
                  <p className="text-muted-foreground">Código: {product.code}</p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/edit-product/${product.id}`}
                    className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 button-hover"
                  >
                    <Edit className="h-5 w-5" />
                    <span className="sr-only">Editar</span>
                  </Link>
                  <button
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="p-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 button-hover"
                  >
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Eliminar</span>
                  </button>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Precio</span>
                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Categoría</span>
                  <span className="px-2 py-1 bg-secondary rounded-full text-sm">{product.category}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Cantidad existente</span>
                  <div className="flex items-center">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      isLowStock
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                    )}>
                      {product.quantity} unidades
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Umbral de stock bajo</span>
                  <span>{product.lowStockThreshold} unidades</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Estado del stock</span>
                  <div className="w-full max-w-[200px]">
                    <div className="flex justify-between text-xs mb-1">
                      <span>0</span>
                      <span>{product.lowStockThreshold}</span>
                      <span>{product.lowStockThreshold * 2}+</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full",
                          product.quantity <= product.lowStockThreshold / 2
                            ? "bg-red-500"
                            : product.quantity <= product.lowStockThreshold
                            ? "bg-amber-500"
                            : "bg-green-500"
                        )}
                        style={{
                          width: `${Math.min(
                            100,
                            (product.quantity / (product.lowStockThreshold * 2)) * 100
                          )}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Última actualización</span>
                  <span>{new Date(product.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Link
            to="/products"
            className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground button-hover"
          >
            Volver a la lista
          </Link>
          <Link
            to={`/edit-product/${product.id}`}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 button-hover inline-flex items-center"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar producto
          </Link>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estas seguro</AlertDialogTitle>
            <AlertDialogDescription>
            Esta acción no se puede deshacer. Eliminará el producto permanentemente. "{product.name}" de su inventario.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default ProductDetails;

import React, { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { ProductForm } from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductFormData } from '../types';
import { toast } from 'sonner';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct, updateProduct, loading } = useProducts();
  const navigate = useNavigate();

  const product = getProduct(id || '');

  useEffect(() => {
    if (!product && !loading) {
      toast.error('Product not found');
      navigate('/products');
    }
  }, [product, loading, navigate]);

  const handleSubmit = (data: ProductFormData) => {
    if (id) {
      updateProduct(id, data);
      navigate('/products');
    }
  };

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

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Editar producto</h1>
          <p className="text-muted-foreground mt-1">
          Actualizar la información del producto
          </p>
        </div>

        <div className="glass-card rounded-lg p-6">
          <ProductForm 
            initialData={product} 
            onSubmit={handleSubmit} 
            isLoading={loading} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
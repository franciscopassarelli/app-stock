
import React from 'react';
import { Layout } from '../components/Layout';
import { ProductForm } from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { ProductFormData } from '../types';
import { toast } from 'sonner';

const AddProduct = () => {
  const { addProduct, loading } = useProducts();
  const navigate = useNavigate();

  const handleSubmit = (data: ProductFormData) => {
    console.log("📤 Enviando producto a Firestore:", data);
    addProduct(data);
    toast.success(`${data.name} añadido correctamente`);
    navigate('/productos');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Agregar Nuevo Producto</h1>
          <p className="text-muted-foreground mt-1">
            Agrega un nuevo producto a tu inventario
          </p>
        </div>

        <div className="glass-card rounded-lg p-6">
          <ProductForm onSubmit={handleSubmit} isLoading={loading} />
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;

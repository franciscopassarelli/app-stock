import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductFormData, ProductContextType } from '../types';
import { toast } from 'sonner';
import { db } from '../firebase'; // Asegúrate de importar tu configuración de Firebase
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// Crear contexto
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Componente proveedor
const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener productos desde Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'productos')); // Consultar la colección productos
        const productsList: Product[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<Product, 'id'>;
productsList.push({
  id: doc.id,
  ...data,
});

        });
        setProducts(productsList);
      } catch (err) {
        setError('No se pudieron obtener los productos');
        toast.error('No se pudieron obtener los productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calcular productos con stock bajo
  const lowStockProducts = products.filter(
    (product) => product.quantity <= product.lowStockThreshold
  );

  // Agregar nuevo producto
  const addProduct = async (productData: ProductFormData) => {
    try {
      setLoading(true);
      const newProduct = {
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      // 🔹 Agregar producto a Firestore y obtener la referencia del documento
      const docRef = await addDoc(collection(db, 'productos'), newProduct);
      const id = docRef.id; // ✅ ID asignado por Firestore
  
      console.log("✅ Producto agregado - ID Firestore:", id); // 🔹 Verifica el ID en consola
  
      // 🔹 Guardar en el estado con el ID correcto
      setProducts((prevProducts) => [...prevProducts, { ...newProduct, id }]);
  
      toast.success(`${productData.name} agregado exitosamente`);
    } catch (err) {
      setError('No se pudo agregar el producto');
      toast.error('No se pudo agregar el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  

  // Actualizar producto
  const updateProduct = async (id: string, productData: ProductFormData) => {
    console.log("🔄 Intentando actualizar producto con ID:", id); // 🔹 Verifica si el ID es correcto
    try {
      setLoading(true);
      const productRef = doc(db, 'productos', id);
      await updateDoc(productRef, {
        ...productData,
        updatedAt: new Date(),
      });
  
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...productData, updatedAt: new Date() } : product
        )
      );
      toast.success(`${productData.name} actualizado exitosamente`);
    } catch (err) {
      setError('No se pudo actualizar el producto');
      toast.error('No se pudo actualizar el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Eliminar producto
const deleteProduct = async (id: string) => {
  try {
    setLoading(true);
    const productRef = doc(db, 'productos', id); // Referencia al documento dentro de la colección productos
    await deleteDoc(productRef); // Elimina el documento de Firestore
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id)); // Elimina del estado local
    toast.success('Producto eliminado correctamente');
  } catch (err) {
    setError('No se pudo eliminar el producto');
    toast.error('No se pudo eliminar el producto');
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  // Obtener un producto
  const getProduct = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const value = {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    lowStockProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

// Hook personalizado para usar el contexto
const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts debe usarse dentro de un ProductProvider');
  }
  return context;
};

// 🔽 Agregá esto fuera de la función, al final del archivo:
export { ProductProvider, useProducts };
